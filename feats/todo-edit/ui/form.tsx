"use client";
import { updateTodo } from "@/app/actions";
import { ProgressBarInput } from "@/components/atoms/progress-input";
import { useTodoStore } from "@/hooks/store/use-todo-store";
import { useEffect, useRef, useState } from "react";

export default function EditTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [priorityValue, setPriorityValue] = useState(1);
  const [progressValue, setProgressValue] = useState(0);

  const isOpen = useTodoStore((s) => s.isOpen);
  const todo = useTodoStore((s) => s.todo);
  const category = useTodoStore((s) => s.category);
  const view = useTodoStore((s) => s.view);
  const closeModal = useTodoStore((s) => s.closeModal);

  useEffect(() => {
    if (todo) {
      setPriorityValue(todo.priority ?? 1);
      setProgressValue(todo.progress ?? 0);
    }
  }, [todo]);

  if (!isOpen || view !== "edit" || !todo) {
    return null;
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-200">
        <button
          onClick={closeModal}
          className="absolute right-4 top-2 text-3xl text-gray-400 hover:text-black"
        >
          &times;
        </button>

        <form
          className="flex flex-col gap-6"
          ref={formRef}
          action={async (formdata) => {
            updateTodo(todo, formdata);
            formRef.current?.reset();
            closeModal();
          }}
        >
          {/* Editable title */}
          <input
            name="title"
            type="text"
            required
            placeholder="What are you working on?"
            defaultValue={todo.title}
            className="w-full border-none bg-transparent text-2xl font-semibold placeholder-gray-400 focus:outline-none"
            maxLength={50}
            autoComplete="off"
          />

          {/* Why / Purpose */}
          <div className="relative rounded-md border border-gray-300 p-2">
            <label
              htmlFor="why"
              className="absolute -top-3 bg-white px-2 text-sm text-gray-400"
            >
              Why you want to do this?
            </label>
            <textarea
              id="why"
              name="why"
              required
              placeholder="Write down your intentions..."
              defaultValue={todo.why}
              className="w-full resize-none border-none bg-transparent text-base placeholder-gray-400 focus:outline-none"
              rows={3}
              maxLength={200}
              autoComplete="off"
            />
          </div>

          {/* Meta section */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-2">
                Priority: <span className="font-semibold">{priorityValue}</span>
              </p>
              <ProgressBarInput
                name="priority"
                value={priorityValue}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setPriorityValue(value);
                }}
                className="w-32"
                min={0}
                max={5}
              />
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
                className="w-32"
                min={0}
                max={100}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
