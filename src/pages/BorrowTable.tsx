import { useGetBorrowedBooksQuery } from "@/Redux/api/baseApi";
import RenderBorrowBooks from "@/renderComponents/RenderBorrowBooks";
import React from "react";

export default function BorrowTable() {
  const { data: BorrowBooksData } = useGetBorrowedBooksQuery(undefined);

  return (
    <div>
      <div>
        <RenderBorrowBooks
          Borrowbooks={BorrowBooksData}
          className="mx-5"
        ></RenderBorrowBooks>
      </div>
    </div>
  );
}
