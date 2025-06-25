"use server";

import { getTodoKey } from "@/utils/helpers";
import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

type CreateTodoType = Pick<Todo, "category">;

export async function saveTodo(todo: CreateTodoType, formdata: FormData) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const newTodo: Todo = {
    ...todo,
    id: crypto.randomUUID(),
    user_id: userId?.toString(),
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
  const priority = formdata.get("priority");

  const currentProgress = isNaN(Number(progress))
    ? (todo.progress ?? 0)
    : Number(progress);

  const updatedTodo = {
    ...todo,
    priority: isNaN(Number(priority)) ? todo.priority : Number(priority),
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

export async function deleteTodo(todo: Todo) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  await kv.hdel(getTodoKey(todo.id, todo.user_id), ...Object.keys(todo));
  await kv.zrem(`todos_by_priority:${todo.user_id}`, todo.id);

  revalidatePath("/");
}
