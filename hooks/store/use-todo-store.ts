import { create } from "zustand";

type TodoStore = {
  isOpen: boolean;
  view: null | "create" | "edit";
  category: null | Todo["category"];
  todo: null | Todo;
  openModal: (props: {
    view: TodoStore["view"];
    todo?: Todo;
    category?: Todo["category"];
  }) => void;
  closeModal: () => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  isOpen: false,
  view: null,
  category: null,
  todo: null,
  openModal: ({ view, todo, category }) =>
    set({ isOpen: true, view, todo, category }),
  closeModal: () =>
    set({ isOpen: false, view: null, todo: null, category: null }),
}));
