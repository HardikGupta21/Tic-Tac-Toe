import React, { useState } from "react";
function Game() {
    const [turn, setTurn] = useState('X');
    const [cells, setCells] = useState(Array(9).fill(""));
    const [Winner, setWinner] = useState();

    const handleClick = (num) => {
        if (cells[num] !== '') {
            alert("already filled");
            return;
        }
        let squares = [...cells];
        if (turn === 'X') {
            squares[num] = 'X';
            setTurn('O');
        }
        else {
            squares[num] = 'O';
            setTurn('X');
        }
        CheckWinner(squares);
        setCells(squares);
    }

    function Box({ num }) {
        return (
            <td onClick={() => { handleClick(num) }}>{cells[num]}</td>
        )
    }

    const CheckWinner = (squares) => {
        let combi = {
            LefttoRight: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],

            ToptoDown: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],

            Diagonal: [
                [0, 4, 8],
                [2, 4, 6],
            ]
        }

        for (let combo in combi) {
            combi[combo].forEach((pattern) => {
                if (
                    squares[pattern[0]] === '' ||
                    squares[pattern[1]] === '' ||
                    squares[pattern[2]] === ''
                ) {

                }
                else if (
                    squares[pattern[0]] === squares[pattern[1]] &&
                    squares[pattern[1]] === squares[pattern[2]]
                ) {
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    }
    
    const handleRestart = () =>{
        setWinner(null);
        setCells(Array(9).fill(""));
    }

    return (
        <div className="container">
            <table>
                Player : {turn}
                <tbody>
                    <tr>
                        <Box num={0} />
                        <Box num={1} />
                        <Box num={2} />
                    </tr>
                    <tr>
                        <Box num={3} />
                        <Box num={4} />
                        <Box num={5} />
                    </tr>
                    <tr>
                        <Box num={6} />
                        <Box num={7} />
                        <Box num={8} />
                    </tr>
                </tbody>
            </table>
            {Winner && (
                <>
                    <p>{Winner} is the Winner</p>
                    <button onClick={()=>handleRestart()}>Play Again</button>
                </>
            )}
        </div>
    );
}
export default Game;