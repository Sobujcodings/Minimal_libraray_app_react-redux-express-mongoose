import "./App.css";
import {
  useGetBooksQuery,
  useGetBorrowedBooksQuery,
} from "./Redux/api/baseApi";
import RenderTable from "./renderComponents/renderTable";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import RenderBorrowBooks from "./renderComponents/RenderBorrowBooks";

function App() {
  // fix cors error of beckend and deploy again -> see frontend output of that error
  // another table for summary

  const form = useForm({
    shouldUnregister: true,
  });

  const [OpenForm, setOpenForm] = useState(false);

  // GET books, borrow books data from hook of baseApi
  const { data: booksData, isError, isLoading } = useGetBooksQuery(undefined);
  const { data: BorrowBooksData } = useGetBorrowedBooksQuery(undefined);

  const handleAddBooks = () => {
    setOpenForm(!OpenForm);
  };

  return (
    <>
      {/* navbar */}
      <div className="flex justify-evenly my-5">
        <ul className="text-left">
          <Link to="/">Minimal Library Management System 📚</Link>
        </ul>
        <ul>
          <Link to="/all-books">All books</Link>
        </ul>
        <Link to="/borrow-summary">Borrow Summary</Link>
        <ul>
          <Button onClick={() => handleAddBooks()}>Add Book</Button>
        </ul>
      </div>

      <div>
        {!isLoading && (
          <RenderTable
            books={booksData}
            OpenForm={OpenForm}
            setOpenForm={setOpenForm}
            className="mx-5"
            form={form}
          ></RenderTable>
        )}
      </div>

      {/* <div>
        <RenderBorrowBooks
          Borrowbooks={BorrowBooksData}
          className="mx-5"
        ></RenderBorrowBooks>
      </div> */}
    </>
  );
}

export default App;
