import Button from "./Button"
import "./Message.scss"

const Message = ({ variant = "user", children, onDelete }) => {
    return (
        <article className={"message " + variant}>
            <p>
                {children}
            </p>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
        </article>
    )
}

export default Message