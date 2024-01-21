import {useEffect, useState} from "react";

const ChatBox = (props) => {
    const [focused, setFocused] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && answer?.length !== 0) {
                props.handleSubmit(answer);
                setAnswer("");
                setWordCount(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [answer]);

    const handleChange = (value) => {
        setAnswer(value);
        setWordCount(value.length);
    }

    return(
        <div className={'chat-box'}>
            <div>
                {props.chatThread && props.chatThread.length !== 0 && props.chatThread.map((chat, index) => (
                    <p style={{color: chat.color}} key={index} className={'chat-text'}>
                        {chat.userName}: {chat.text}
                    </p>
                ))}
            </div>
            <div className={`chat-input ${focused ? 'focused' : ''}`}>
                <input value={answer} onChange={e => handleChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} id={'chat-input'} className={'input-with-end-item'} placeholder={'Type Guess/Chat Here'}/>
                <span style={{marginRight: '12px'}}>{wordCount ? wordCount : ''}</span>
            </div>
        </div>
    )
}

export default ChatBox
