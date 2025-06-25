import Footer from "@/components/layout/footer";
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
        <body className="flex min-h-screen flex-col lg:h-screen lg:overflow-hidden">
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
