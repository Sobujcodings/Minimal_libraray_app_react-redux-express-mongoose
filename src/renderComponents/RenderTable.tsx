import React, { useEffect, useState } from "react";
import { useDeleteBookMutation } from "@/Redux/api/baseApi";

import RenderDialog from "./RenderDialog";
import RenderTableBody from "./RenderTableBody";
type RenderTableProps = React.HTMLAttributes<HTMLDivElement>;

export default function RenderTable({
  books,
  setOpenForm,
  className,
  form,
}: RenderTableProps) {
  // delete functinality
  const [showDialog, setShowDialog] = useState(false);
  const [selectedID, setSelectedID] = useState(false);
  // updated data
  const [formData, setformData] = useState(null);

  // const navigate = useNavigate();

  // usedelete book hook to send data to  that baseApi to delete it
  const [deletedBook, { data: deletedbookData, isError, isLoading }] =
    useDeleteBookMutation();

  // borrow create hook
  // const [BorrowBook, { data: borrowedBookData }] = useBorrowBookMutation();

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

  // const handleUpdata = (book) => {
  //   console.log("updated book", book);
  //   setformData(book);
  //   setOpenForm(true);
  // };

  // // borrow book
  // const handleBorrow = (book) => {
  //   console.log("book", book);
  //   if (book.copies === 0) {
  //     alert("Book is Unavailable");
  //     return;
  //   }
  //   setSelectedBorrowBook(book);
  //   setshowBorrowBook(!showBorrowBook);
  // };

  return (
    <div className={className}>
      <RenderTableBody
        books={books}
        // handleUpdata={handleUpdata}
        handleDeleteBook={handleDeleteBook}
      />

      <RenderDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        deletedBook={deletedBook}
        id={selectedID}
      />
    </div>
  );
}
