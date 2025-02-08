import BoardsList from "@/components/BoardsList";
import { ROUTES } from "@/constants";
import { BOARDS } from "@/data";
import Link from "next/link";
import React from "react";

const BardsPage = () => {
  return (
    <main className="flex flex-col gap-5 p-5">
      <Link href={ROUTES.home}>go home</Link>
      <p className="uppercase font-bold text-center">Boards</p>
      <BoardsList boards={BOARDS} />
    </main>
  );
};

export default BardsPage;
