import { CreateTodoForm } from "@/feats/todo-create/ui";
import { TodoDashboard } from "@/feats/todo-dashboard/ui";
import EditTodoForm from "@/feats/todo-edit/ui/form";
import { getTodoKey } from "@/utils/helpers";
import { kv } from "@vercel/kv";

export const metadata = {
  title: "Life OS",
  description: "A dashboard for your life",
};

async function getTodos(userId: string) {
  if (!userId) {
    console.error("No user ID provided, returning empty todos.");
    return [];
  }

  try {
    const todoIds = await kv.zrange(`todos_by_priority:${userId}`, 0, 100, {
      rev: true,
    });

    if (!todoIds.length) {
      return [];
    }

    const multi = kv.multi();
    todoIds.forEach((id) => {
      multi.hgetall(getTodoKey(id as string, userId));
    });

    const todos: Todo[] = await multi.exec();

    return todos.filter(Boolean).map((todo) => {
      return {
        ...todo,
        why: todo.why,
        category: todo.category,
        priority: Number(todo.priority),
        progress: todo.progress ? Number(todo.progress) : 0,
        created_at: todo.created_at,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Dashboard() {
  // TODO: Add auth
  const userId = "default";
  const todos = await getTodos(userId ?? "");

  return (
    <div className="flex h-screen flex-col py-4">
      <div className="flex w-full flex-1 flex-col items-center px-4 sm:px-10">
        <div className="flex min-h-[300px] w-full">
          <TodoDashboard todos={todos} />
          <CreateTodoForm />
          <EditTodoForm />
        </div>
      </div>
    </div>
  );
}
