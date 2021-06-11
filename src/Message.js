import './style/index.css';
import './style/message.css'
function Message(props) {
    const date = new Date(props.timestamp);
    //const time = date.toLocaleTimeString("en-US");
    
    let minutes = ParseDigit(date.getMinutes())
    let hours = ParseDigit(date.getHours());

    return (
        <div className="message">
            <p><b>{hours}:{minutes} - {props.author}: </b>{props.text}</p>
        </div>
    );
}

function ParseDigit(digit) {
    if(digit < 10) {
        return '0' + digit;
    }

    return digit;
}

export default Message;