import styles from "./Item.module.scss";

import { ItemActions } from "../ItemActions";
import { Item as TItem } from "../../types";

interface ItemProps {
  info: TItem;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
}

export const Item = ({
  info,
  onMoveUp,
  onMoveDown,
  onMoveLeft,
  onMoveRight,
}: ItemProps) => {
  return (
    <div className={styles.item}>
      <div>{info.title}</div>
      <ItemActions
        onMoveDown={onMoveDown}
        onMoveUp={onMoveUp}
        onMoveLeft={onMoveLeft}
        onMoveRight={onMoveRight}
      />
    </div>
  );
};
