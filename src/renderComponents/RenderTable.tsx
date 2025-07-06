import { useEffect, useState } from "react";
import { useDeleteBookMutation } from "@/Redux/api/baseApi";
import RenderDialog from "./RenderDialog";
import type { UseFormReturn } from "react-hook-form";
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
import { toast } from "sonner";

type book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: number;
  description: string;
  copies: number;
  available: true;
  createdAt: string;
  updatedAt: string;
};

type RenderTableTypes = {
  books: book[];
  className: string;
  form: UseFormReturn<any>;
};

export default function RenderTable({
  books,
  className,
  form,
}: RenderTableTypes) {
  // delete functinality
  const [showDialog, setShowDialog] = useState(false);
  const [selectedID, setSelectedID] = useState("");
  // updated data
  const [formData] = useState(null);
  const navigate = useNavigate();
  const [deletedBook] = useDeleteBookMutation();

  // delete
  const handleDeleteBook = (id: string) => {
    setShowDialog(!showDialog);
    setSelectedID(id);
  };

  // confirm delete function
  const handleDelete = async (id: string) => {
    // console.log("confirm clicked");
    try {
      await deletedBook(id).unwrap();
      toast("✅ Book Deleted successfully", {
        action: {
          label: "Close",
          onClick: () => console.log("close clicked"),
        },
      });
    } catch (error) {
      const err = error as Error;
      toast("❌ Failed to Delete book", {
        description: err?.message || "Something went wrong",
      });
    }
  }

  // for edit 
  useEffect(() => {
    if (formData) {
      form.reset(formData);
    } else {
      form.reset();
    }
  }, [formData]);

  return (
    <div className={className}>
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
          {books?.map((book: book, index: number) => (
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
                    disabled={!book.copies}
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

      {/* delete dialog */}
      <RenderDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        handleDelete={handleDelete}
        id={selectedID}
      />
    </div>
  );
}
