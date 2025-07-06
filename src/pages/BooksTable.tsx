import { useGetBooksQuery } from "@/Redux/api/baseApi";
import RenderTable from "@/renderComponents/RenderTable";
import { useForm } from "react-hook-form";

export default function BooksTable() {
  const form = useForm({
    shouldUnregister: true,
  });
  const { data, isLoading } = useGetBooksQuery(undefined);

  return (
    <div>
      <div>
        {!isLoading && (
          <RenderTable
            books={data?.data || []}
            className="mx-5 mb-5 mt-5"
            form={form}
          ></RenderTable>
        )}
      </div>
    </div>
  );
}
