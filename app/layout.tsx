import Header from "@/components/layout/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Flip, ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="h-screen overflow-hidden">
          <Header />
          {children}
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Flip}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
