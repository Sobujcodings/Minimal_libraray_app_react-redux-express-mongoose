import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function RenderTableBody({ books, handleDeleteBook }) {
  const navigate = useNavigate();
  return (
    <Table className="">
      <TableHeader>
        <TableRow className="bg-gray-100 border">
          <TableHead className="border text-center">S.N</TableHead>
          <TableHead className="w-[100px] border text-center">Title</TableHead>
          <TableHead className="border text-center">Author</TableHead>
          <TableHead className="border text-center">Genre</TableHead>
          <TableHead className="border text-center">Availability</TableHead>
          <TableHead className="border text-center">Copies</TableHead>
          <TableHead className="w-[100px] text-center border">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.data.map((book, index) => (
          <TableRow key={book._id} className="text-center">
            <TableCell className="font-medium border text-center">
              {index + 1}
            </TableCell>
            <TableCell className="font-medium border text-center">
              {book.title}
            </TableCell>
            <TableCell className="border text-center">{book.author}</TableCell>
            <TableCell className="border text-center">{book.genre}</TableCell>
            <TableCell className="border text-center">
              {book.copies === 0
                ? "Unavailable"
                : book.available
                ? "Available"
                : "Unavailable"}
            </TableCell>
            <TableCell className="border text-center">{book.copies}</TableCell>
            <TableCell className="border">
              <div className="flex flex-col gap-y-2 text-center p-2">
                <Button>
                  <Link to={`/books/${book._id}`}>View Details</Link>
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/edit-book/${book._id}`, { state: { book } })
                  }
                >
                  EDIT
                </Button>
                <Button onClick={() => handleDeleteBook(book._id)}>
                  DELETE
                </Button>
                <Button
                  disabled={book.copies ? 0 : true}
                  onClick={() =>
                    navigate(`/borrow/${book._id}`, { state: { book } })
                  }
                >
                  BORROW
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
