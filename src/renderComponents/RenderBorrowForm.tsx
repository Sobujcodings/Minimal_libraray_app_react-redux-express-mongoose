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
import { toast } from "sonner";

export default function RenderBorrowForm() {
  type borrowTypes = {
    quantity: number;
    dueDate: string;
  };

  const form = useForm<borrowTypes>({
    shouldUnregister: true,
  });

  const location = useLocation();
  const selectedBorrowBook = location?.state?.book;
  // console.log(selectedBorrowBook);
  const navigate = useNavigate();

  // borrow create hook
  const [BorrowBook] = useBorrowBookMutation();

  // handle korte hobe jate input faka diye submit na hoy warning dekhabo to fill the form !!important
  const onSubmitBorrow = async (data: borrowTypes) => {
    if (data.quantity > selectedBorrowBook.copies) {
      toast("❌ Quantity cannot exceed available copies");
      return;
    }
    const BorrowBookRequest = {
      book: selectedBorrowBook._id,
      quantity: Number(data.quantity),
      dueDate: new Date(data.dueDate).toISOString(),
    };

    try {
      const response = await BorrowBook(BorrowBookRequest).unwrap();
      toast("✅ Book borrowed successfully", {
        description: response.message,
        action: {
          label: "Close",
          onClick: () => console.log("close clicked"),
        },
      });
      navigate("/borrow-summary");
    } catch (error) {
      const err = error as Error;
      toast("❌ Failed to borrow book", {
        description: err?.message || "Something went wrong",
      });
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
            rules={{ required: "quantiry is required" }}
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
            rules={{ required: "dueDate is required" }}
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
