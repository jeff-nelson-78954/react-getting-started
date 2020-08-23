import { useState, useEffect } from 'react';
import Utils from './utils';

const useGameState = () => {
    const [stars, setStars] = useState(Utils.random(1, 9));
    const [canidateNumbers, setCanidateNumbers] = useState([]);
    const [availableNumbers, setAvailableNumbers] = useState(Utils.range(1, 9));
    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timerId = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        }
    });

    const setGameState = (newCanidateNumbers) => {
        if (Utils.sum(newCanidateNumbers) !== stars) {
            setCanidateNumbers(newCanidateNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter(a => !newCanidateNumbers.includes(a));
            setStars(Utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNumbers(newAvailableNumbers);
            setCanidateNumbers([]);
        }
    };
    
    return { stars, availableNumbers, canidateNumbers, secondsLeft, setGameState };
}

export default useGameState;