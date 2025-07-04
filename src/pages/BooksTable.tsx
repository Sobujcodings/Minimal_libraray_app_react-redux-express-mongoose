import { useGetBooksQuery } from "@/Redux/api/baseApi";
import RenderTable from "@/renderComponents/renderTable";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";

export default function BooksTable() {
  const form = useForm({
    shouldUnregister: true,
  });

  const { data: booksData, isError, isLoading } = useGetBooksQuery(undefined);

  const [OpenForm, setOpenForm] = useState(false);

  const handleAddBooks = () => {
    setOpenForm(!OpenForm);
  };

  return (
    <div>
      <div>
        {!isLoading && (
          <RenderTable
            books={booksData}
            OpenForm={OpenForm}
            setOpenForm={setOpenForm}
            className="mx-5 mb-5"
            form={form}
            handleAddBooks={handleAddBooks}
          ></RenderTable>
        )}
      </div>
    </div>
  );
}
