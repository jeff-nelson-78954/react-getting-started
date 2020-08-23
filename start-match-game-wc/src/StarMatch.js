import React from 'react';
import Utils from './utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';
import useGameState from './useGameState';
import Style from 'style-it';

const StarMatch = (props) => {
    const { stars, availableNumbers, canidateNumbers, secondsLeft, setGameState } = useGameState();
    const canidatesAreWrong = Utils.sum(canidateNumbers) > stars;
    const numberStatus = (number) => {
        if(!availableNumbers.includes(number)) {
            return 'used';
        }
        if (canidateNumbers.includes(number)) {
            return canidatesAreWrong ? 'wrong' : 'candidate';
        }

        return 'available';
    }
    const onNumberClick = (number, currentStatus) => {
        if (gameStatus !== 'active' || currentStatus === 'used') {
            return;
        }
        const newCanidateNumbers = currentStatus === 'available' ? 
                                    canidateNumbers.concat(number) : canidateNumbers.filter(cn => cn !== number);

        setGameState(newCanidateNumbers);        
    }
    const gameStatus = availableNumbers.length === 0 ? 
        'won' : secondsLeft === 0 ? 'lost' : 'active';
    
    return (
        <div>
            <Style>
            {`
                html, body {
                    font-family: 'Baloo Tamma 2', cursive;
                }

                .game {
                    max-width: 500px;
                    margin: 0 auto;
                }

                .body {
                    display: flex;
                }

                .help {
                    color: #666;
                    margin: 10px;
                    text-align: center;
                }

                .left {
                    text-align: center;
                    width: 50%;
                    border: thin solid #ddd;
                }

                .right {
                    text-align: center;
                    padding: 10px;
                    width: 50%;
                    border: thin solid #ddd;
                }

                .star {
                    display: inline-block;
                    margin: 0 15px;
                }

                .star:after {                    
                    content: "\\2605";
                    font-size: 45px;
                }

                .number {
                    background-color: #eee;
                    border: thin solid #ddd;
                    width: 45px;
                    height: 45px;
                    margin: 10px;
                    font-size: 25px;
                }

                .number:focus, .number:active {
                    outline: none;
                    border: thin solid #ddd;
                }

                .timer {
                    color: #666;
                    margin-top: 3px;
                    margin-left: 3px;
                }

                .game-done .message {
                    font-size: 250%;
                    font-weight: bold;
                    margin: 15px;
                }
            `}
            </Style>
            <div className="game">
                <div className="help">
                    Pick 1 or more numbers that sum to the number of stars
                </div>
                <div className="body">
                    <div className="left">
                        {gameStatus !== 'active' ? (
                            <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                        ) : (
                                <StarsDisplay count={stars} />
                            )}
                    </div>
                    <div className="right">
                        {Utils.range(1, 9).map(number =>
                            <PlayNumber
                                key={number}
                                number={number}
                                status={numberStatus(number)}
                                onClick={onNumberClick}
                            />
                        )}
                    </div>
                </div>
                <div className="timer">Time Remaining: {secondsLeft}</div>
            </div>
        </div>       
    );
};

export default StarMatch;