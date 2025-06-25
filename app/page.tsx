import SignInCard from "@/components/layout/sign-in-card";
import { CreateTodoForm } from "@/feats/todo-create/ui";
import { TodoDashboard } from "@/feats/todo-dashboard/ui";
import EditTodoForm from "@/feats/todo-edit/ui/form";
import CommandPalette from "@/feats/widgets/command-palette";
import { getTodoKey } from "@/utils/helpers";
import { auth } from "@clerk/nextjs/server";
import { kv } from "@vercel/kv";

export const metadata = {
  title: "42 OS | Your Life Dashboard",
  description: "Manage your life with full control and intention",
};

async function getTodos() {
  const { userId } = await auth();

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
  const todos = await getTodos();

  return (
    <div className="relative mx-auto w-full max-w-[1100px] flex-1 border-x">
      <Decoration />
      <TodoDashboard todos={todos} />
      <CreateTodoForm />
      <EditTodoForm />
      <SignInCard />
      <CommandPalette />
    </div>
  );
}

function Decoration() {
  return (
    <>
      <span className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded border bg-white shadow-inner" />
      <span className="absolute right-0 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded border bg-white shadow-inner" />
      <span className="absolute bottom-0 left-0 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded border bg-white shadow-inner" />
      <span className="absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded border bg-white shadow-inner" />
    </>
  );
}
