import { useState } from "react";
import { List } from "./components/List";
import { generateItems, moveItemInList } from "./utils";
import { Item } from "./types";

const items = generateItems(4);
const initialOrder = items.map((item) => item.id);

interface TList {
  id: string;
  order: Item['id'][];
}

const App = () => {
  const [list, setList] = useState<TList>({
    id: "list-1",
    order: initialOrder,
  });

  const handleMoveItem = (fromIndex: number, targetIndex: number) =>
    setList((prev) => ({
      id: prev.id,
      order: moveItemInList({
        list: prev.order,
        fromIndex,
        targetIndex,
      }),
    }));

  const getSortedItemsForList = () =>
    list.order.map((itemId) =>
      items.find((item) => item.id === itemId)
    ) as Item[];

  return <List items={getSortedItemsForList()} onMoveItem={handleMoveItem} />;
};

export default App;
