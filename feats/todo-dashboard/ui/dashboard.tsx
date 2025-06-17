"use client";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { cn } from "@/utils/tw";
import clsx from "clsx";
import TodoCard from "./card";

type Category = {
  id: string;
  label: string;
  desc: string;
};

const categories: Category[] = [
  {
    id: "skill",
    label: "Skills",
    desc: "Things you want to learn or improve.",
  },
  {
    id: "project",
    label: "Projects",
    desc: "Things you put effort into.",
  },
  {
    id: "idea",
    label: "Ideas",
    desc: "Things you want to explore.",
  },
] as const;

const MAX_ITEMS = 5;

const TodoDashboard = ({ todos }: { todos: Todo[] }) => {
  const openTodoForm = useTodoStore((state) => state.openModal);

  const handleOpenForm = (totalItems: number, category: Category) => {
    if (totalItems >= MAX_ITEMS) {
      alert(`Too many things! Put new things in inbox.`);
      return;
    }
    openTodoForm({
      view: "create",
      category: category.id,
    });
  };

  const handleTodoClick = (todo: Todo) => {
    openTodoForm({
      view: "edit",
      todo,
    });
  };

  return (
    <div className="grid w-full grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const items = todos.filter((item) => item.category === category.id);

        const totalItems = items.length;

        return (
          <div
            key={category.id}
            className={cn(
              "h-full w-full border-r px-4",
              index === categories.length - 1
                ? "border-transparent"
                : "border-slate-200",
            )}
          >
            <div className="mb-4">
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold capitalize text-gray-700">
                  {category.label}
                </h2>
                <button
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full border bg-black text-2xl text-white focus:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300",
                  )}
                  onClick={() => handleOpenForm(totalItems, category)}
                >
                  +
                </button>
              </div>
              <p>
                <span className="text-xs text-gray-400">{category.desc}</span>
              </p>
            </div>
            <ul className="flex flex-col space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <TodoCard todo={item} handleClick={handleTodoClick} />
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TodoDashboard;
