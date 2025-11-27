import TaskNewFormSheet from "./_components/task-new-form-sheet";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="flex flex-row justify-between items-center">
      <h1 className="text-lg font-bold">Code Tasks</h1>
      <TaskNewFormSheet trigger={<Button variant="outline">Criar</Button>} />
      </header>
    </div>
  );
}
