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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function RenderBorrowForm({
  showBorrowBook,
  setshowBorrowBook,
  onSubmitBorrow,
}) {
  const form = useForm({
    shouldUnregister: true,
  });

  return (
    <div>
      <Dialog open={showBorrowBook} onOpenChange={setshowBorrowBook}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-2">Borrow A Book</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitBorrow)}
                className="space-y-2"
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
