import React, { useEffect, useState } from "react";
import {
  useBorrowBookMutation,
  useCreateBooksMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} from "@/Redux/api/baseApi";

import RenderDialog from "./RenderDialog";
import RenderForm from "./RenderForm";
import RenderTableBody from "./RenderTableBody";
import RenderBorrowForm from "./RenderBorrowForm";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
type RenderTableProps = React.HTMLAttributes<HTMLDivElement>;

export default function RenderTable({
  books,
  OpenForm,
  setOpenForm,
  className,
  form,
  handleAddBooks,
}: RenderTableProps) {
  // delete functinality
  const [showDialog, setShowDialog] = useState(false);
  const [selectedID, setSelectedID] = useState(false);
  // updated data
  const [formData, setformData] = useState(null);
  const [showBorrowBook, setshowBorrowBook] = useState(false);
  const [selectedBorrowBook, setSelectedBorrowBook] = useState();

  const navigate = useNavigate();

  // usedelete book hook to send data to  that baseApi to delete it
  const [deletedBook, { data: deletedbookData, isError, isLoading }] =
    useDeleteBookMutation();

  // borrow create hook
  const [BorrowBook, { data: borrowedBookData }] = useBorrowBookMutation();

  // delete
  const handleDeleteBook = (id) => {
    console.log("id found while clicking on the delete", id);
    setShowDialog(!showDialog);
    setSelectedID(id);
  };

  // for update if edit is clicked form will be replaced by edited data ottherwise reset
  useEffect(() => {
    if (formData) {
      form.reset(formData);
    } else {
      form.reset();
    }
  }, [formData]);

  const handleUpdata = (book) => {
    console.log("updated book", book);
    setformData(book);
    setOpenForm(true);
  };

  // borrow book
  const handleBorrow = (book) => {
    console.log("book", book);
    if (book.copies === 0) {
      alert("Book is Unavailable");
      return;
    }
    setSelectedBorrowBook(book);
    setshowBorrowBook(!showBorrowBook);
  };

  // handle korte hobe jate input faka diye submit na hoy warning dekhabo to fill the form !!important
  const onSubmitBorrow = async (data) => {
    if (data.quantity > selectedBorrowBook.copies) {
      alert(
        `Quantity cannot exceed available copies, you have ${selectedBorrowBook.copies} copy only`
      );
      return;
    }
    const BorrowBookRequest = {
      book: selectedBorrowBook._id,
      quantity: Number(data.quantity),
      dueDate: new Date(data.dueDate).toISOString(),
    };

    try {
      const response = await BorrowBook(BorrowBookRequest).unwrap();
      console.log("Success message:", response.message);
      setshowBorrowBook(false);
      navigate("/borrow-summary");
      // toast.success(response.message || "Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      // toast.error(error?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className={className}>
      <RenderTableBody
        books={books}
        handleUpdata={handleUpdata}
        handleDeleteBook={handleDeleteBook}
        handleBorrow={handleBorrow}
      />

      <RenderDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        deletedBook={deletedBook}
        id={selectedID}
      />
      {/* 
      <RenderForm
        OpenForm={OpenForm}
        setOpenForm={setOpenForm}
        // onSubmit={onSubmit}
        defaultValues={formData}
        form={form}
      /> */}

      {/* <RenderBorrowForm
        showBorrowBook={showBorrowBook}
        setshowBorrowBook={setshowBorrowBook}
        onSubmitBorrow={onSubmitBorrow}
      /> */}
    </div>
  );
}
