import { Item } from "../types";
import minifaker, { uuid } from "minifaker";
import "minifaker/locales/en";

const DEFAULT_AMOUNT = 10;

export const generateItems = (amountOfItems: number) =>
  Array.from({ length: amountOfItems ?? DEFAULT_AMOUNT }).map((_, i) => ({
    id: uuid.v4(),
    title: `${minifaker.firstName()} ${minifaker.lastName()}`,
  })) as Item[];
