import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/Redux/api/baseApi";
import RenderDialog from "./RenderDialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type RenderTableProps = React.HTMLAttributes<HTMLDivElement>;

export default function RenderTable({ className, ...props }: RenderTableProps) {
  // console.log("props", props);

  // usedelete book hook to send data to  that baseApi to delete it
  const [deletedBook, { data: deletedbookData, isError, isLoading }] =
    useDeleteBookMutation();
  // console.log("data", deletedBook, deletedbookData);

  // delete functinality
  const [showDialog, setShowDialog] = useState(false);
  const [selectedID, setSelectedID] = useState(false);

  const handleDeleteBook = (id) => {
    console.log("id found while clicking on the delete", id);
    setShowDialog(!showDialog);
    setSelectedID(id);
  };


  const handleSubmit = (data)=>{
    console.log("data",data);
  }

  return (
    <div className={className} {...props}>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="border text-center">S.N</TableHead>
            <TableHead className="w-[100px] border text-center">
              Title
            </TableHead>
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
          {props.books.data.map((book, index) => (
            <TableRow key={book._id} className="text-center">
              <TableCell className="font-medium border text-center">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium border text-center">
                {book.title}
              </TableCell>
              <TableCell className="border text-center">
                {book.author}
              </TableCell>
              <TableCell className="border text-center">{book.genre}</TableCell>
              <TableCell className="border text-center">
                {book.available.toString()}
              </TableCell>
              <TableCell className="border text-center">
                {book.copies}
              </TableCell>
              <TableCell className="border">
                <div className="flex flex-col gap-y-2 text-center p-2">
                  <Button>EDIT</Button>
                  <Button onClick={() => handleDeleteBook(book._id)}>
                    DELETE
                  </Button>
                  <Button>BORROW</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      {/* Dialog box */}
      <RenderDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        deletedBook={deletedBook}
        id={selectedID}
      />


      {/* Add a book form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
