const WordGuess = ({gameStarted}) => {
    return(
        <div className={'word-guess'}>
            {
                !gameStarted ? 'Waiting' : null
            }
        </div>
    )
}

export default WordGuess;
