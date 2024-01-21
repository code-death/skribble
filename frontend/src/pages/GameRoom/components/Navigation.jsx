import TimerClock from "./TimerClock.jsx";
import RoundInfo from "./RoundInfo.jsx";
import WordGuess from "./WordGuess.jsx";

const Navigation = ({roundInfo, gameStarted, roundTimer}) => {
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
            <div style={{width: '24%', textAlign: 'end'}}>
                Settings
            </div>
        </div>
    )
}

export default Navigation
