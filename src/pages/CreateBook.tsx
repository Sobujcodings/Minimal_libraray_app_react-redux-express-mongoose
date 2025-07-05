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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreateBook() {
  const [formData, setformData] = useState(null);
  const defaultValue = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
  };
  const form = useForm({
    defaultValues: defaultValue,
  });
  const editId = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const editedBookData = location.state?.book;
  // console.log(editedBookData);

  useEffect(() => {
    if (editedBookData) {
      setformData(editedBookData);
      form.reset(editedBookData);
    } else {
      form.reset(defaultValue);
    }
  }, [editedBookData, location.pathname]);

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
        form.reset(data);
        toast("✅ Book Updated successfully", {
          description: response?.message,
          action: {
            label: "Close",
            onClick: () => console.log("close clicked"),
          },
        });
        navigate("/books");
      } catch (error) {
        console.log(error);
        toast("❌ Failed to update book", {
          description: error?.data?.message || "Something went wrong",
        });
      }
    } else {
      try {
        const response = await createBooks(data).unwrap();
        toast("✅ Book created successfully", {
          description: response?.message,
          action: {
            label: "Close",
            onClick: () => console.log("close clicked"),
          },
        });
        form.reset();
      } catch (error) {
        console.log(error);
        toast("❌ Failed to create book", {
          description: error?.data?.message || "Something went wrong",
        });
      }
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
                    <Input
                      type="text"
                      placeholder="title"
                      {...field}
                      onKeyDown={(e) => {
                        if (/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
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
                    <Input
                      type="text"
                      placeholder="Author"
                      {...field}
                      onKeyDown={(e) => {
                        if (/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="w-full p-2 border rounded text-left"
                        >
                          {field.value || "Select Genre"}
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-full">
                        {[
                          "FICTION",
                          "NON_FICTION",
                          "SCIENCE",
                          "HISTORY",
                          "BIOGRAPHY",
                          "FANTASY",
                        ].map((genre) => (
                          <DropdownMenuItem
                            key={genre}
                            onSelect={() => field.onChange(genre)}
                          >
                            {genre}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* <Input
                      type="text"
                      placeholder="Genre"
                      {...field}
                      onKeyDown={(e) => {
                        if (/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                    />
                    }} */}
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
                    <Input type="number" placeholder="ISBN" {...field} />
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
                    <Input
                      type="text"
                      placeholder="Description"
                      {...field}
                      onKeyDown={(e) => {
                        if (/\d/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
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
                    <Input type="number" placeholder="Copies" {...field} />
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
