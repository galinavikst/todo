import BoardsList from "@/components/BoardsList";
import { ROUTES } from "@/constants";
import Link from "next/link";
import React from "react";

const BoardsPage = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Link href={ROUTES.home}>go home</Link>
      <p className="uppercase font-bold text-center">Boards</p>
      <BoardsList />
    </main>
  );
};

export default BoardsPage;
