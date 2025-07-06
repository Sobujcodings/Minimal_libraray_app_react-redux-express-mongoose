import { Link } from 'react-router-dom'
import logo from "./../../assets/flowbite-logo.svg"

export default function footer() {
    return (
        <div>
            <footer className="bg-black text-white shadow-sm dark:bg-gray-900">
                <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <a
                            href="/"
                            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src={logo}
                                className="h-8"
                                alt="Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                সহজ-সরল-সিম্পল
                            </span>
                        </a>
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <Link to="/books" className="hover:underline me-4 md:me-6">All Books</Link>
                            </li>
                            <li>
                                <Link to="/create-book" className="hover:underline me-4 md:me-6">Create book</Link>
                            </li>
                            <li>
                                <Link to="/borrow-summary" className="hover:underline me-4 md:me-6">Borrow Summary</Link>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2025{" "}
                        <a href="https://flowbite.com/" className="hover:underline">
                            Library Management System
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </footer>
        </div>
    )
}
