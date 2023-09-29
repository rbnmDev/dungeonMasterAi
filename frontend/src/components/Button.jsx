import "./Button.scss";

const Button = ({children, onClick,variant="default"}) => {
    return (
            <button className= {"btn "+variant} onClick={onClick}>
            {children}
            </button>
        );

};

export default Button;