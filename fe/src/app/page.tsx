import { INITIAL_TASKS } from "@/data";
import BoardSectionList from "@/components/BoardSectionList";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Link href={ROUTES.boards}>go to board list</Link>
      <div className="flex w-full max-w-[1000px] gap-5 justify-between m-auto">
        <input
          type="text"
          className="grow-[2]"
          placeholder="Enter a board ID here..."
        />
        <button className="btn grow">Load</button>
      </div>

      {INITIAL_TASKS && <BoardSectionList initTasks={INITIAL_TASKS} />}
    </main>
  );
}
