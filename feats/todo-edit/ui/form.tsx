"use client";
import { deleteTodo, updateTodo } from "@/app/actions";
import { Kbd } from "@/components/atoms/kbd";
import { ProgressBarInput } from "@/components/atoms/progress-input";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { useAuth } from "@/utils/auth-context";
import { cn } from "@/utils/tw";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function EditTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [priorityValue, setPriorityValue] = useState(1);
  const [progressValue, setProgressValue] = useState(0);
  const { mode, userId } = useAuth();

  const isOpen = useTodoStore((s) => s.isOpen);
  const todo = useTodoStore((s) => s.todo);
  const view = useTodoStore((s) => s.view);
  const closeModal = useTodoStore((s) => s.closeModal);

  useEffect(() => {
    if (todo) {
      setPriorityValue(todo.priority ?? 1);
      setProgressValue(todo.progress ?? 0);
    }
  }, [todo]);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = async (formdata: FormData) => {
    if (!todo) return;
    if (mode === "local") {
      // TODO: Implement local storage logic
      toast.error("Local mode is not supported yet.");
      return;
    }

    try {
      await toast.promise(updateTodo(todo, formdata), {
        pending: "Updating...",
        success: "Updated successfully!",
        error: "Failed to update.",
      });
      formRef.current?.reset();
      closeModal();
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const handleDelete = async () => {
    if (!todo) return;

    try {
      await toast.promise(deleteTodo(todo), {
        pending: "Deleting...",
        success: "Deleted successfully!",
        error: "Failed to delete.",
      });
      closeModal();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  if (!isOpen || view !== "edit" || !todo) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 grid place-items-center bg-black/70 backdrop-blur-sm"
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
          className="flex flex-col gap-6 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6"
          ref={formRef}
          action={handleSubmit}
        >
          <input
            name="title"
            type="text"
            required
            placeholder="I want to ..."
            defaultValue={todo.title}
            className="w-full border-none bg-transparent text-xl font-semibold placeholder-gray-400 focus:outline-none"
            maxLength={50}
            autoComplete="off"
          />

          <div className="relative rounded-md border border-gray-300 p-2">
            <label
              htmlFor="why"
              className="absolute -top-3 bg-white px-2 text-sm text-gray-400"
            >
              Why am I doing this?
            </label>
            <textarea
              id="why"
              name="why"
              required
              placeholder="I'm doing this because..."
              defaultValue={todo.why}
              className="w-full resize-none border-none bg-transparent text-base placeholder-gray-400 focus:outline-none"
              rows={3}
              maxLength={200}
              autoComplete="off"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                Priority: <span className="font-semibold">{priorityValue}</span>
              </p>
              <div className="relative flex rounded-full bg-gray-100">
                <div className="absolute left-0 flex h-full w-full items-center justify-between">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={cn(`h-2 w-2 rounded-full bg-gray-300`)}
                    />
                  ))}
                </div>
                <input
                  type="range"
                  name="priority"
                  min={1}
                  max={5}
                  value={priorityValue}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setPriorityValue(value);
                  }}
                  className="relative w-32 bg-transparent accent-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                Progress:{" "}
                <span className="font-semibold">{progressValue}%</span>
              </p>
              <ProgressBarInput
                name="progress"
                value={progressValue}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setProgressValue(value);
                }}
                className="w-48"
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg border border-red-500 bg-light px-6 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-black/40"
            >
              Give Up!
            </button>

            <button
              type="submit"
              className="rounded-lg border border-black bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black/40"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
