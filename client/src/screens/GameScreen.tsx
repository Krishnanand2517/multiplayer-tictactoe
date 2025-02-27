import { useLocation } from "react-router-dom";

const GameScreen = () => {
  const { state } = useLocation();
  const playerOneName = state?.playerOne.name;
  const playerOneSymbol = state?.playerOne.symbol;
  const playerTwoName = state?.playerTwo.name;
  const playerTwoSymbol = state?.playerTwo.symbol;

  return (
    <div>
      <h3>
        {playerOneName} : {playerOneSymbol}
      </h3>
      <h3>
        {playerTwoName} : {playerTwoSymbol}
      </h3>
    </div>
  );
};

export default GameScreen;
