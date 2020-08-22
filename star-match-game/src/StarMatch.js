import React from 'react';
import Utils from './utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';
import useGameState from './useGameState';

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
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
                <div className="body">
                    <div className="left">
                    {gameStatus !== 'active' ? (
                        <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
                    ) : (
                        <StarsDisplay count = { stars } />
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
    );
};

export default StarMatch;