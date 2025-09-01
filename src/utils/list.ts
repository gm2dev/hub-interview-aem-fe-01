interface moveItemInListProps {
  list: any[];
  targetIndex: number;
  fromIndex: number;
}
export const moveItemInList = ({
  list,
  targetIndex,
  fromIndex,
}: moveItemInListProps) => {
  if (targetIndex < 0) return list;
  const previousListOrder = list.filter((_, i) => i !== fromIndex);
  const itemToAdd = list[fromIndex];

  return [
    ...previousListOrder.slice(0, targetIndex),
    itemToAdd,
    ...previousListOrder.slice(targetIndex),
  ];
};
