import { INITIAL_TASKS } from "@/data";
import BoardSectionList from "@/components/BoardSectionList";
import Link from "next/link";
import { ROUTES } from "@/constants";
import BoardLoader from "@/components/BoardLoader";

export default function Home() {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Link href={ROUTES.boards}>go to board list</Link>
      <BoardLoader />

      {INITIAL_TASKS && <BoardSectionList initTasks={INITIAL_TASKS} />}
    </main>
  );
}
