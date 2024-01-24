import {useEffect, useRef, useState} from "react";

const TimerClock = ({gameStarted, roundTimer}) => {
    const [timer, setTimer] = useState(gameStarted && roundTimer ? roundTimer : 0);

    useEffect(() => {
        let time = setTimeout(() => {
            if(timer > 0) {
                setTimer(prev => prev - 1);
            }
        }, 1000);

        return () => clearTimeout(time);
    }, [timer])

    return(
        <div className={'timer'}>
            {timer}
        </div>
    )
}

export default TimerClock
