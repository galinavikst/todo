import BoardsList from "@/components/BoardsList";
import { ROUTES } from "@/constants";
// import { BOARDS } from "@/data";
import { useGetBoardsQuery } from "@/redux/slices/apiSlice";
import Link from "next/link";
import React from "react";

const BoardsPage = () => {
  // const getData = async () => {
  //   try {
  //     const res = await fetch("http://localhost:4000/board");
  //     const data = await res.json();
  //     console.log(data);

  //     return data;
  //   } catch (error) {
  //     console.log("error fetch boardsPage", error);
  //   }
  // };

  // const data = await getData();
  //console.log(data);

  return (
    <main className="flex flex-col gap-5 p-5">
      <Link href={ROUTES.home}>go home</Link>
      <p className="uppercase font-bold text-center">Boards</p>
      <BoardsList />
    </main>
  );
};

export default BoardsPage;
