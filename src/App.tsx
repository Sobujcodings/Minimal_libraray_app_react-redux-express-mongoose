import { Link } from "lucide-react";
import "./App.css";
import { useGetBooksQuery } from "./Redux/api/baseApi";
import RenderTable from "./renderComponents/renderTable";

function App() {
  // fix cors error of beckend and deploy again -> see frontend output of that error
  // another table for summary


  // GET books data from useGetBooksQuery hook of baseApi
  const { data: booksData, isError, isLoading } = useGetBooksQuery(undefined);
  // console.log("data", booksData);

  
  return (
    <>
    {/* navbar */}
      <div className="flex justify-evenly my-5">
        <ul className="text-left">Minimal Library Management System 📚</ul>
        <ul>All books</ul>
        <ul>Borrow Summary</ul>
        <ul>Add Books</ul>
      </div>

      <div>
        {!isLoading && (
          <RenderTable books={booksData} className="mx-5"></RenderTable>
        )}
      </div>

    </>
  );
}

export default App;
