import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { scrollBar } from "../[lang]/(hooks)/mixin";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "@/redux/provider";
import SessionProvider from "../[lang]/(providers)/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";
export const metadata = {
  title: "Hour Tracker",
  description: "Track Your Work",
};
const dir = {
  en: "ltr",
  he: "rtl",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang={params.lang} dir={dir[params.lang]}>
      <Providers>
        <SessionProvider session={session}>
          <body
            className={`${inter.className} bg-light text-dark ${scrollBar}`}
          >
            <Navbar lang={params.lang} />
            <div className="min-h-[calc(99vh-90px)] ">{children}</div>
            <Footer />
            <div id="modal-portal" className="z-50" />
            <div id="spinner-portal" className="relative z-[100]" />
            <Toaster />
          </body>
        </SessionProvider>
      </Providers>
    </html>
  );
}
