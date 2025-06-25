"use client";
import { saveTodo } from "@/app/actions";
import { Kbd } from "@/components/atoms/kbd";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function CreateTodoForm() {
  let formRef = useRef<HTMLFormElement>(null);
  const isOpen = useTodoStore((s) => s.isOpen);
  const category = useTodoStore((s) => s.category);
  const view = useTodoStore((s) => s.view);
  const closeModal = useTodoStore((s) => s.closeModal);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = async (formdata: FormData) => {
    try {
      await toast.promise(
        saveTodo({ category: category ?? "item" }, formdata),
        {
          pending: "Adding item...",
          success: "Item added successfully!",
          error: "Failed to add item.",
        },
      );
      formRef.current?.reset();
      closeModal();
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  if (!isOpen || view !== "create") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 grid place-items-center bg-black/80"
      onClick={onBackdropClick}
    >
      <button
        onClick={closeModal}
        className="absolute right-2 top-0 z-50 flex items-center gap-2"
      >
        <span className="sr-only">Close</span>
        <Kbd
          keyname="Escape"
          callback={() => {
            if (isOpen) {
              closeModal();
            }
          }}
          className="border-white bg-transparent text-white"
        >
          Esc
        </Kbd>
        <span className="text-4xl text-white">&times;</span>
      </button>
      <div className="relative w-full max-w-3xl p-8">
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex flex-col gap-6 rounded-xl bg-white px-6 py-4 shadow-sm ring-1 ring-gray-100"
        >
          <h2 className="mb-2 text-lg capitalize text-gray-500">
            {category ? "Adding New " + category : "Adding New Item"}
          </h2>
          <input
            name="title"
            type="text"
            required
            autoFocus
            maxLength={50}
            placeholder="I want to..."
            autoComplete="off"
            aria-label="What do you want to do?"
            className="w-full border-b bg-transparent pb-2 font-medium placeholder-gray-400 focus:outline-none"
          />

          <input
            name="why"
            type="text"
            required
            maxLength={200}
            placeholder="Why does this matter?"
            autoComplete="off"
            aria-label="Write reason for doing this?"
            className="w-full border-b bg-transparent pb-2 font-medium placeholder-gray-400 focus:outline-none"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/40"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
