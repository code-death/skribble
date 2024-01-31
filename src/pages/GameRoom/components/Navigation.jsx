import TimerClock from "./TimerClock.jsx";
import RoundInfo from "./RoundInfo.jsx";
import WordGuess from "./WordGuess.jsx";
import {SettingFilled} from "@ant-design/icons";

const Navigation = ({roundInfo, gameStarted, roundTimer, activeUser}) => {
    return (
        <div className={'game-navbar'}>
            <div style={{display: 'flex', alignItems: 'center', gap: '24px', width: '24%'}}>
                <TimerClock
                    gameStarted={gameStarted}
                    roundTimer={roundTimer}
                />
                <RoundInfo
                    currentRound={roundInfo.currentRound}
                    totalRounds={roundInfo.totalRounds}
                />
            </div>
            <div style={{width: '24%', textAlign: 'center'}}>
                <WordGuess
                    gameStarted={gameStarted}
                />
            </div>
            <div style={{width: '24%', textAlign: 'end', cursor: 'pointer'}}>
                {activeUser.isHost ? <SettingFilled className={'settings-icon'} /> : null}
            </div>
        </div>
    )
}

export default Navigation
