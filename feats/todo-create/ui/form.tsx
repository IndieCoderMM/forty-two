"use client";
import { saveTodo } from "@/app/actions";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { cn } from "@/utils/tw";
import { useRef } from "react";

export default function CreateTodoForm() {
  let formRef = useRef<HTMLFormElement>(null);
  const isOpen = useTodoStore((s) => s.isOpen);
  const category = useTodoStore((s) => s.category);
  const view = useTodoStore((s) => s.view);
  const closeModal = useTodoStore((s) => s.closeModal);

  if (!isOpen || view !== "create") {
    return null;
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-black/80">
      <div className="relative w-full max-w-3xl rounded-md bg-white p-8">
        <h2 className="py-2 text-2xl">
          {category ? "Add New " + category : "Add New Item"}
        </h2>
        <button
          onClick={closeModal}
          className="absolute right-2 top-0 z-50 text-4xl text-black"
        >
          &times;
        </button>

        <form
          className="relative flex flex-col gap-4"
          ref={formRef}
          action={async (formdata) => {
            await saveTodo({ category: category ?? "item" }, formdata);
            formRef.current?.reset();
            closeModal();
          }}
        >
          <input
            aria-label="Write title"
            className="block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={50}
            placeholder={"I want to ..."}
            required
            type="text"
            name="title"
            autoComplete="off"
          />
          <input
            aria-label="Write reason"
            autoComplete="off"
            className="block w-full rounded-md border border-gray-200 py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
            maxLength={200}
            type="text"
            placeholder={"Why do you want to do this?"}
            required
            name="why"
          />
          <button
            className={cn(
              "flex h-10 w-24 items-center justify-center self-end rounded-md border bg-black px-4 text-lg text-white focus:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300",
            )}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
