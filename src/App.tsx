import "./App.css";
import { Link, Outlet } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Toaster } from "sonner";
import ScrollToTop from "./components/ui/ScrollToTop";
import Footer from './components/ui/footer';

function App() {
  return (
    <div>
      <Toaster richColors position="top-right" />
      <ScrollToTop />

      <div className="min-h-screen flex flex-col ">
        <div className="flex justify-evenly bg-gray-100 text-white ">
          <NavigationMenu className="my-3 ">
            <NavigationMenuList className="space-x-10">
              <NavigationMenuItem className="">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/">Minimal Library Management System 📚</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/books">All books</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/borrow-summary">Borrow Summary</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem className="">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to="/create-book">Add Book</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto border">
          <Outlet />
        </main>

        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
