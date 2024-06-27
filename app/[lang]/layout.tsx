import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { scrollBar } from "../[lang]/(hooks)/mixin";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "@/redux/provider";
import SessionProvider from "@/providers/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Toaster } from "@/components/ui/toaster";
import { Locale, i18n } from "@/i18n.config";
import { CookiesProvider } from 'next-client-cookies/server';
import { cookies } from "next/headers";
export const metadata = {
  title: "Hour Tracker",
  description: "Track Your Work",
};
// export async function generateStaticParams() {
//   return i18n.locales.map(locale => ({ lang: locale }))
// }
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
  const cookieStore = cookies()
  let locale
  if (cookieStore.has('locale')) {
    locale = params.lang
  } else {
    locale = params.lang
  }

  const session = await getServerSession(authOptions);
  
  return (
    <html lang={locale} dir={dir[locale as 'en']}>
        <body
          className={`${inter.className} bg-light text-dark ${scrollBar}`}
        >
          <CookiesProvider>
            <SessionProvider session={session}>
              <Providers>
                {/* @ts-expect-error Server Component */}
                <Navbar lang={locale} />
                <div className="min-h-[calc(99vh-90px)] ">{children}</div>
                <Footer />
                <div id="modal-portal" className="z-50" />
                <div id="spinner-portal" className="relative z-[100]" />
                <Toaster />
              </Providers>
            </SessionProvider>
          </CookiesProvider>
        </body>
    </html>
  );
}
