import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "reactstrap";
import GameCard from "./GameCard";
import GameCompleted from "./GameCompleted";

const GameBoard = (props) => {
    const { row, column, isStartGame } = props;
    const [memNumbers, setMemNumbers] = useState([]);
    const [tempCard, setTempCard] = useState([]);
    const [forceShow, setForceShow] = useState(false);
    const [hintCount, setHintCount] = useState(3);
    const [clickCount, setClickCount] = useState([0, 0]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [gameTimer, setGameTimer] = useState();
    const [elapsed, setElapsed] = useState('00:00:00');

    const boardStyle = {
        maxWidth: `${row * 80}px`,
    };

    useEffect(() => {
        setInitialSetup();
    }, [isStartGame]);

    useEffect(() => {
        if (tempCard?.length !== 2) return;

        setTimeout(() => {
            if (tempCard[0].value === tempCard[1].value) {

                setClickCount([clickCount[0] + 2, clickCount[1]]);

                let currentCards = memNumbers;
                currentCards.map(ele => {
                    if (ele.id === tempCard[1].id || ele.id === tempCard[0].id) {
                        ele.find = true;
                    }
                });
                setMemNumbers(currentCards);

                checkCompleted();
            } else setClickCount([clickCount[0], clickCount[1] + 2])
            setTempCard([]);
        }, 1000);
    }, [tempCard]);

    const setInitialSetup = () => {
        clearTimer();
        setHintCount(3);
        setClickCount([0, 0]);
        setIsCompleted(false);
        setElapsed('00:00:00');
        generateRandomNumbers();
        runTimer();
    }

    const runTimer = () => {
        const timer = setInterval(() => {
            setElapsed(msToTime(new Date().getTime() - isStartGame));
        }, 1000);
        setGameTimer(timer);
    }

    const clearTimer = () => {
        if (gameTimer) {
            clearInterval(gameTimer);
            setGameTimer(null);
        }
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const generateRandomNumbers = () => {
        const element = [];
        const totalElements =
            (row * column) % 2 === 0 ? row * column : row * column - 1;
        for (let i = 0; i < totalElements / 2; i++) {
            element.push({
                value: getRandomInt(100),
            });
        }

        let doubleElement = [...element, ...element];
        for (let i = 0; i < doubleElement.length; i++) {
            doubleElement[i] = {
                id: i,
                value: doubleElement[i].value,
                order: getRandomInt(100),
                find: false
            };
        }
        doubleElement.sort((a, b) => a.order - b.order);
        setMemNumbers(doubleElement);
    };

    const msToTime = (duration) => {
        let milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    const checkCompleted = () => {
        const findNumbers = memNumbers.filter(num => num.find);
        if (memNumbers.length === findNumbers.length) {
            setIsCompleted(true);
            setShowCompleted(true);
            clearTimer();
        }
    }

    const handleClickCard = (card) => {
        if (tempCard.length) {
            setTempCard((prev) => [...prev, card]);
        } else {
            setTempCard([card]);
        }
    }

    const handleForceShow = () => {
        if (hintCount === 0) return;
        setForceShow(true);
        setHintCount(hintCount - 1);
        setTimeout(() => {
            setForceShow(false);
        }, 1000);
    }

    return (
        <div>
            <div>
                <Button
                    color="primary"
                    outline
                    id="hint_btn"
                    onClick={() => handleForceShow()}
                    disabled={hintCount === 0 || !!isCompleted}
                >
                    ?
                </Button>
                <Tooltip
                    flip
                    target="hint_btn"
                >
                    Hint
                </Tooltip>
            </div>
            <h4 className="text-center">{elapsed}</h4>
            <div className="game-board" style={boardStyle}>
                {memNumbers.length ? (
                    memNumbers.map((ele, index) => {
                        return (
                            <GameCard
                                key={index}
                                cardValue={ele}
                                prevCard={tempCard}
                                forceShow={forceShow}
                                onClickCard={handleClickCard}
                            />
                        );
                    })
                ) : (
                    <></>
                )}
            </div>
            <GameCompleted
                isOpen={showCompleted}
                clicked={clickCount}
                toggleModal={setShowCompleted}
            />
        </div>
    );
};

export default GameBoard;
