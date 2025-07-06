import { useGetBorrowedBooksQuery } from "@/Redux/api/baseApi";
import RenderBorrowBooks from "@/renderComponents/RenderBorrowBooks";

export default function BorrowTable() {
  const { data: BorrowBooksData } = useGetBorrowedBooksQuery(undefined);

  return (
    <div>
      <div>
        <RenderBorrowBooks
          Borrowbooks={BorrowBooksData}
        ></RenderBorrowBooks>
      </div>
    </div>
  );
}
