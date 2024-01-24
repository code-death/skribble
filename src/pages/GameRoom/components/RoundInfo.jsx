const RoundInfo = ({currentRound, totalRounds}) => {
    return(
        <div className={'round-info'}>
            {`Round ${currentRound} of ${totalRounds}`}
        </div>
    )
}

export default RoundInfo;
