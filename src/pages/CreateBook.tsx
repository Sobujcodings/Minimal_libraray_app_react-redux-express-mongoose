import React, { useEffect, useState } from "react";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  useCreateBooksMutation,
  useUpdateBookMutation,
} from "@/Redux/api/baseApi";
import { Button } from "@/components/ui/button";
import { useLocation, useParams } from "react-router-dom";

export default function CreateBook() {
  const [formData, setformData] = useState(null);
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: "",
    },
  });
  const editId = useParams();

  const location = useLocation();
  const editedBookData = location.state?.book;
  console.log(editedBookData);

  useEffect(() => {
    if (editedBookData) {
      setformData(editedBookData);
      form.reset(editedBookData);
    }
  }, [editedBookData]);

  const [
    createBooks,
    { data: createdBookData, isError: createdError, isLoading: createdLoading },
  ] = useCreateBooksMutation();

  const [
    updatedBooks,
    { data: updatedBookData, isError: updatedError, isLoading: updatedLoading },
  ] = useUpdateBookMutation();

  // post & update book
  const onSubmit = async (data) => {
    if (formData) {
      try {
        const response = await updatedBooks({
          id: editId.id,
          updatedBookData: data,
        }).unwrap();
        form.reset();
        alert(response?.message);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await createBooks(data).unwrap();
        alert(response?.message);
      } catch (error) {
        console.log(error);
      }
      form.reset();
    }
  };

  return (
    <div>
      <div className="mx-[35%] border rounded-lg mt-8 mb-6 p-5">
        <h6 className="text-1xl mb-3 font-semibold">Create New Book</h6>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              rules={{ required: "Title is required" }}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: "Author is required" }}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: "Genre is required" }}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <Input placeholder="Genre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: "ISBN is required" }}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="ISBN" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: "Description is required" }}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              rules={{ required: "Copies is required" }}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input placeholder="Copies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-1" type="submit">
              Submit
            </Button>
            {/* {defaultValues ? "Update" : "Submit"} */}
          </form>
        </Form>
      </div>
    </div>
  );
}
