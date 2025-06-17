"use server";

import { getTodoKey } from "@/utils/helpers";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

type CreateTodoType = Pick<Todo, "category">;

export async function saveTodo(todo: CreateTodoType, formdata: FormData) {
  // TODO: Get userId from session
  const user_id = "default";

  const newTodo: Todo = {
    ...todo,
    id: crypto.randomUUID(),
    user_id,
    title: (formdata.get("title") as string) || "",
    why: (formdata.get("why") as string) || "",
    priority: 1,
    progress: 0,
    status: "todo" as const,
    created_at: new Date().toISOString(),
  };

  await kv.hset(getTodoKey(newTodo.id, newTodo.user_id), newTodo);
  await kv.zadd(`todos_by_priority:${newTodo.user_id}`, {
    score: newTodo.priority,
    member: newTodo.id,
  });

  revalidatePath("/");
}

export async function updateTodo(todo: Todo, formdata: FormData) {
  const title = formdata.get("title");
  const why = formdata.get("why");
  const progress = formdata.get("progress") as string;

  const currentProgress = isNaN(Number(progress))
    ? (todo.progress ?? 0)
    : Number(progress);

  const updatedTodo = {
    ...todo,
    title,
    why,
    progress,
    status:
      currentProgress === 100 ? "done" : currentProgress > 0 ? "doing" : "todo",
  };
  await kv.hset(getTodoKey(todo.id, todo.user_id), updatedTodo);
  await kv.zadd(`todos_by_priority:${todo.user_id}`, {
    score: updatedTodo.priority,
    member: updatedTodo.id,
  });

  revalidatePath("/");
}
