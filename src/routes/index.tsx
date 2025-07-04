import App from "@/App";
import BooksTable from "@/pages/BooksTable";
import { createBrowserRouter } from "react-router";
import BorrowTable from "../pages/BorrowTable";
import BooksDetails from "../pages/BooksDetails";
import CreateBook from "@/pages/CreateBook";
import RenderBorrowForm from "@/renderComponents/RenderBorrowForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <BooksTable />,
      },
      {
        path: "/books",
        index: true,
        element: <BooksTable />,
      },
      {
        path: "books/:id",
        element: <BooksDetails />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/edit-book/:id",
        element: <CreateBook />,
      },
      {
        path: "/borrow/:id",
        element: <RenderBorrowForm />,
      },
      {
        path: "borrow-summary",
        element: <BorrowTable />,
      },
    ],
  },
]);
