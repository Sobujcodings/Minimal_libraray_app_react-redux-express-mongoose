import { useEffect, useState } from "react";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreateBook() {
  const [formData, setformData] = useState(null);
  type createData = {
    title: string;
    author: string;
    genre: string;
    isbn: number | undefined;
    description: string;
    copies: number | undefined;
  };
  const defaultValue: createData = {
    title: "",
    author: "",
    genre: "",
    isbn: undefined,
    description: "",
    copies: undefined,
  };


  const form = useForm<createData>({});
  const editId = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const editedBookData = location.state?.book;

  useEffect(() => {
    if (editedBookData) {
      setformData(editedBookData);
      form.reset(editedBookData);
    } else {
      form.reset(defaultValue);
    }
  }, [editedBookData, location.pathname]);

  // const [
  //   createBooks,
  //   { data: createdBookData, isError: createdError, isLoading: createdLoading },
  // ] = useCreateBooksMutation();
  const [createBooks] = useCreateBooksMutation();
  const [updatedBooks] = useUpdateBookMutation();

  // post & update book
  const onSubmit = async (data: createData) => {
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
        const err = error as Error;
        toast("❌ Failed to update book", {
          description: err?.message || "Something went wrong",
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
        const err = error as Error;
        toast("❌ Failed to create book", {
          description: err?.message || "Something went wrong",
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
            <Button className="mt-1 w-full" type="submit">
              Submit
            </Button>
            {/* {defaultValues ? "Update" : "Submit"} */}
          </form>
        </Form>
      </div>
    </div>
  );
}
