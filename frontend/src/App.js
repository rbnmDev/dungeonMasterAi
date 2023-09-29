import './App.css';
import { useEffect, useState,useRef } from 'react';
import Message from './components/Message';
import Button from './components/Button';

function App() {
  const getMessagesFromLocalStorage = () => {
    let messageList = localStorage.getItem('messageList');
    if (messageList === null) {
      return [];
    }
    return JSON.parse(messageList);
  }
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState(getMessagesFromLocalStorage()); // [{content: 'Hola', role: 'user'}, {content: 'Hola', role: 'assistant'}]
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const saveMessagesToLocalStorage = () => {
    localStorage.setItem('messageList', JSON.stringify(messageList));
  }

  useEffect(() => {
    saveMessagesToLocalStorage();
    
  }, [messageList]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [response]);
  
  const getMessage = async () => {
    setLoading(true);
    let newMessageList = [...messageList];
    if (message.length !== 0) {
      newMessageList.push({ content: message, role: 'user' });
    }
    let response = await fetch(`http://localhost:3003/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessageList)
    });
    let data = await response.text();
    newMessageList.push({ content: data, role: 'assistant' });
    setMessageList(newMessageList);
    setResponse(data);
    setLoading(false);
    setMessage('');
    
  }
  const deleteMessage = (index) => {
    let newMessageList = [...messageList];
    newMessageList.splice(index, 1);
    setMessageList(newMessageList);
  }
  return (
    <div className="App">
      <section className="messages">
      {messageList.map((message, index) => {
        return (
          <Message
            key={index}
            variant={message.role}
            onDelete={() => { deleteMessage(index) }}
          >
            {message.content}
          </Message>
        );
      })}
      </section>
      <section ref={scrollRef} >
      </section>
      <section className="newMessage">

      {loading && <p className="cargando">Cargando...</p>}
        <textarea type="text" value={message} rows="5" cols="80" onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={getMessage} variant="red bg-dark border-round">
          Enviar
        </Button>
      </section>
    </div>
  );
}

export default App;
