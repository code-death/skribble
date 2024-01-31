import {useSelector} from "react-redux";
import React from 'react'

const WordGuess = ({}) => {
    const gameStarted = useSelector(state => state.gameStarted);
    const wordOfTheRound = useSelector(state => state.wordOfTheRound);
    const activeUser = useSelector(state => state.user);

    const getDashForTheWord = (word) => {
        const wordsWithDashes = word.split(" ").map((wordPart, index) => (
            <span style={{display: 'flex', gap: "8px"}} key={index}>
                {wordPart.split("").map((letter, letterIndex) => (
                    <span key={letterIndex}>
                        {letter === " " ? " " : "_"}
                    </span>
                ))}
    </span>
        ));

        return <div style={{display: 'flex', gap: '32px', marginTop: "16px"}}>{wordsWithDashes}</div>;
    };

    return (
        <div className={'word-guess'}>
                {
                    gameStarted ? (
                        wordOfTheRound && wordOfTheRound !== "" ? (
                            activeUser.isDrawer ? wordOfTheRound : getDashForTheWord(wordOfTheRound)
                        ) : "Waiting"
                    ) : 'Waiting'
                }
        </div>
    )
}

export default WordGuess;
