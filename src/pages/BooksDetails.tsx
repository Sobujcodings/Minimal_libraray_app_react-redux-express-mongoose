import { useGetSingleBooksQuery } from "@/Redux/api/baseApi";
import { useParams } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BooksDetails() {
  const bookID = useParams();

  const { data } = useGetSingleBooksQuery(bookID.id);

  return (
    <div className="mx-10 mt-10">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 border">
            <TableHead className="w-[100px] border text-center">
              Title
            </TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="border text-center">Author</TableHead>
            <TableHead className="border text-center">Genre</TableHead>
            <TableHead className="border text-center">Availability</TableHead>
            <TableHead className="border text-center">ISBN</TableHead>
            <TableHead className="border text-center">Copies</TableHead>
            <TableHead className="border text-center">Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={data?._id} className="text-center h-[150px]">
            <TableCell className="font-medium border text-center">
              {data?.title}
            </TableCell>
            <TableCell className="border text-center">
              {data?.description}
            </TableCell>
            <TableCell className="border text-center">{data?.author}</TableCell>
            <TableCell className="border text-center">{data?.genre}</TableCell>
            <TableCell className="border text-center">
              {data?.copies === 0
                ? "Unavailable"
                : data?.available
                ? "Available"
                : "Unavailable"}
            </TableCell>
            <TableCell className="border text-center">{data?.isbn}</TableCell>
            <TableCell className="border text-center">{data?.copies}</TableCell>
            <TableCell className="border text-center">
              {data?.createdAt}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
