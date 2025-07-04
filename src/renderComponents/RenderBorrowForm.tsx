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
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "@/Redux/api/baseApi";

export default function RenderBorrowForm() {
  const form = useForm({
    shouldUnregister: true,
  });

  const location = useLocation();
  const selectedBorrowBook = location?.state?.book;
  console.log(selectedBorrowBook);
  const navigate = useNavigate();

  // borrow create hook
  const [BorrowBook, { data: borrowedBookData }] = useBorrowBookMutation();

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
      navigate("/borrow-summary");
      // toast.success(response.message || "Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      // toast.error(error?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <div className="mx-[35%] my-[6%] border rounded-lg p-5">
      <h6 className="text-1xl mb-4 font-semibold">Borrow this Book</h6>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitBorrow)}
          className="space-y-5"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DueDate</FormLabel>
                <FormControl>
                  <Input type="date" placeholder="dueDate" {...field} />
                </FormControl>
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
