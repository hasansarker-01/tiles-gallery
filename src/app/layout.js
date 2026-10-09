
import "./globals.css";

import Nav from "@/components/Navbar";
// import Marq from "@/components/Marquee";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Tiles Gallery",
  description: "Discover your perfect tile aesthetic.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-white text-black dark:bg-gray-950 dark:text-white">
        <Nav />
        <main className="pt-24">
          {children}
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </body>
    </html>
  );
}

