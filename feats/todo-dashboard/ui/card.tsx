import IconQuestionMark from "@/components/icons/questionmark";
import { cn } from "@/utils/tw";

const TodoCard = ({
  todo,
  handleClick,
}: {
  todo: Todo;
  handleClick?: (todo: Todo) => void;
}) => {
  const onClick = () => {
    handleClick?.(todo);
  };

  return (
    <button
      key={todo.id}
      className={cn(
        "flex w-full flex-col rounded border border-l-2 border-gray-200 bg-light px-2 py-2 text-left shadow-sm",
        todo.status === "done"
          ? "border-l-green-500"
          : todo.status === "doing"
            ? "border-l-amber-500"
            : "border-l-slate-400",
      )}
      onClick={onClick}
    >
      <div className={"flex items-center justify-between rounded-l-sm"}>
        <h3 className="text-sm text-gray-800">{todo.title}</h3>
      </div>
      <div className="flex items-center gap-1">
        {todo.why ? (
          <IconQuestionMark className="inline-block h-4 w-4 text-gray-400" />
        ) : null}
        <p className="truncate text-xs text-gray-600">
          {todo.why ? todo.why : "No reasons."}
        </p>
      </div>
      {/* Progressbar */}
      <div className="group relative mt-2 h-2 w-full rounded bg-gray-100">
        <span
          className={cn(
            "absolute left-0 top-2 hidden transform rounded bg-black px-1 py-0.5 text-xs text-white group-hover:block",
            todo.progress
              ? `translate-x-[${Number(todo.progress)}%]`
              : "translate-x-0",
          )}
        >
          {todo.progress ? `${todo.progress}%` : "0%"}
        </span>
        <div
          className={cn(
            "h-full rounded transition-all duration-300 ease-in-out",
            todo.progress === 100 ? "bg-green-500" : "bg-blue-400",
          )}
          style={{ width: `${todo.progress ?? 0}%` }}
        ></div>
      </div>
    </button>
  );
};

export default TodoCard;
