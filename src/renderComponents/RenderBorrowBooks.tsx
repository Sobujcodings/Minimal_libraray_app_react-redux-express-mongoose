import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type propsTypes = {
  success: boolean;
  message: string;
  data: [];
};
type borrowBook = {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};

export default function RenderBorrowBooks({
  Borrowbooks,
}: {
  Borrowbooks: propsTypes;
}) {
  return (
    <div className="mx-5 my-5">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-gray-100 border">
            <TableHead className="border text-center">S.N</TableHead>
            <TableHead className="border text-center">Title</TableHead>
            <TableHead className="border text-center">ISBN</TableHead>
            <TableHead className="border text-center">
              Total Quantity Borrowed
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Borrowbooks?.data.map((borrowBook: borrowBook, index) => (
            <TableRow key={borrowBook._id} className="text-center">
              <TableCell className="font-medium border text-center">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium border text-center">
                {borrowBook.book.title}
              </TableCell>
              <TableCell className="border text-center">
                {borrowBook.book.isbn}
              </TableCell>
              <TableCell className="border text-center">
                {borrowBook.totalQuantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
