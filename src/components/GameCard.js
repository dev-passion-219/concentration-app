import React, { useEffect } from "react";

const GameCard = (props) => {
    const { cardValue, prevCard, forceShow, onClickCard } = props;
    const cardStyle = {
        background: cardValue.find ? 'transparent' : forceShow ? 'transparent' : prevCard.includes(cardValue) ? 'transparent' : 'lightblue',
    }

    const handleClick = () => {
        if (prevCard.length === 2) return;
        if (prevCard.includes(cardValue)) return;
        if (cardValue.find) return;
        onClickCard(cardValue)
    }
    return (
        <div className="game-card" style={cardStyle} onClick={() => handleClick()}>
            {cardValue.find ? '' : forceShow ? cardValue.value : prevCard.includes(cardValue) ? cardValue.value : ''}
        </div>
    );
};

export default GameCard;
