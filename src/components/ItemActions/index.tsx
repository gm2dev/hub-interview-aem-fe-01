interface ItemActionsProps {
  onMoveDown?: () => void;
  onMoveUp?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

export const ItemActions = ({
  onMoveDown,
  onMoveUp,
  onMoveLeft,
  onMoveRight,
}: ItemActionsProps) => {
  return (
    <div>
      {onMoveUp && <button onClick={onMoveUp}>Up</button>}
      {onMoveDown && <button onClick={onMoveDown}>Down</button>}
      {onMoveLeft && <button onClick={onMoveLeft}>Left</button>}
      {onMoveRight && <button onClick={onMoveRight}>Right</button>}
    </div>
  );
};
