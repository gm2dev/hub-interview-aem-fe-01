import styles from "./List.module.scss";
import { Item as ItemComponent } from "../Item";
import { Item } from "../../types";

interface ListProps {
  items: Item[];
  onMoveItem: (fromIndex: number, toIndex: number) => void;
}

export const List = ({ items, onMoveItem }: ListProps) => {
  const handleMoveUp = (index: number) => onMoveItem(index, index - 1);
  const handleMoveDown = (index: number) => onMoveItem(index, index + 1);

  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <ItemComponent
          key={item.id}
          info={item}
          onMoveUp={() => handleMoveUp(i)}
          onMoveDown={() => handleMoveDown(i)}
        />
      ))}
    </div>
  );
};
