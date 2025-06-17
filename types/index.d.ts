declare type Todo = {
  id: string;
  title: string;
  why: string;
  category: string;
  priority: number;
  status: "todo" | "doing" | "done";
  progress?: number;
  user_id: string;
  completed_at?: string;
  created_at: string;
};
