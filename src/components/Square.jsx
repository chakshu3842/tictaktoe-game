// eslint-disable-next-line react/prop-types
const Square = ({ value, onClick, isWinningSquare }) => {
  const colorClassName = value === 'X' ? 'text-green' : 'text-orange';
  const winningClassName = isWinningSquare ? 'winning' : '';

  return (
    <button
      type="button"
      className={`square ${colorClassName} ${winningClassName}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
