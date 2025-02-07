import { INITIAL_TASKS } from "@/data";
import BoardSectionList from "@/components/BoardSectionList";

export default function Home() {
  return (
    <div className="p-5">
      <main className="flex flex-col gap-5">
        <div className="flex w-full max-w-[1000px] gap-5 justify-between m-auto">
          <input type="text" className="grow-[2]" />
          <button className="btn grow">Load</button>
          <button className="btn">Add new</button>
        </div>

        {INITIAL_TASKS && <BoardSectionList initTasks={INITIAL_TASKS} />}
      </main>
    </div>
  );
}
