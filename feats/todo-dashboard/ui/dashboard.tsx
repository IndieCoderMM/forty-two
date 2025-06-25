"use client";
import { Kbd } from "@/components/atoms/kbd";
import IconPlus from "@/components/icons/plus";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { cn } from "@/utils/tw";
import clsx from "clsx";
import { toast } from "react-toastify";
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
    desc: "Things I want to learn or improve.",
  },
  {
    id: "project",
    label: "Projects",
    desc: "Things I put effort into.",
  },
  {
    id: "inbox",
    label: "Inbox",
    desc: "Things I want to explore.",
  },
] as const;

const MAX_ITEMS = 5;

const TodoDashboard = ({ todos }: { todos: Todo[] }) => {
  const openTodoForm = useTodoStore((state) => state.openModal);

  const handleOpenForm = (totalItems: number, category: Category) => {
    if (totalItems >= MAX_ITEMS && category.id !== "inbox") {
      toast.error(`Too many things! Put new things in inbox.`);
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
    <div className="relative grid h-full w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <span className="absolute left-0 top-0 origin-top-left -translate-x-full border-b border-l px-2 text-sm font-light text-gray-300">
        Dashboard
      </span>
      {categories.map((category, index) => {
        const items = todos.filter((item) => item.category === category.id);

        items.sort((a, b) => {
          if (a.priority !== b.priority) {
            return b.priority - a.priority; // Sort by priority
          }
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          ); // Sort by creation date
        });

        const totalItems = items.length;

        return (
          <div
            key={category.id}
            className={cn(
              "bg-grid h-full w-full border-r px-4 py-2",
              index === categories.length - 1
                ? "border-transparent"
                : "border-r",
            )}
          >
            <div className="mb-4">
              <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold capitalize text-gray-700">
                  {category.label}
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    className={clsx(
                      "flex items-center justify-center gap-1 rounded-md border bg-light p-1 shadow-sm hover:bg-gray-100",
                    )}
                    onClick={() => handleOpenForm(totalItems, category)}
                    aria-label={`Add new ${category.label}`}
                  >
                    <Kbd
                      keyname={category.id[0]}
                      callback={() => {
                        handleOpenForm(totalItems, category);
                      }}
                    >
                      {category.id[0]}
                    </Kbd>
                    <IconPlus className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p>
                <span className="text-xs text-gray-400">{category.desc}</span>
              </p>
            </div>
            <ul className="flex h-full max-h-[60vh] flex-col space-y-2 overflow-y-auto">
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
