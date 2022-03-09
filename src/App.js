import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ColumnInput from './components/RowModal';
import GameBoard from './components/GameBoard';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStartGame, setIsStartGame] = useState(0);
  const [row, setRow] = useState(2);
  const [column, setColumn] = useState(2);

  const handleToggleModal = () => {
    setIsOpen(true);
  }

  const initalizeGame = () => {
    setRow(2);
    setColumn(2);
  }

  const handleStartGame = (status, row, column) => {
    setIsOpen(false);
    if (!status) return;
    setIsStartGame(new Date().getTime());
    setRow(row);
    setColumn(column);
  }

  return (
    <main className='container mt-3'>
      <Button
        color="primary"
        onClick={() => handleToggleModal()}
        outline
      >
        Start Game
      </Button>
      <ColumnInput
        isOpen={isOpen}
        onStartGame={handleStartGame}
      />
      {
        isStartGame ? <GameBoard
          row={row}
          column={column}
          isStartGame={isStartGame}
        ></GameBoard> : <></>
      }
    </main>
  );
}

export default App;
