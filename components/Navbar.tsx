import Link from "next/link";
import { flexCenter, navbarLinkClassName, navbarLinkTextClassName } from "@/app/[lang]/(hooks)/mixin";
import { LogoSVG } from "@/util/icons";
import { Bars3Icon } from "@heroicons/react/24/solid";
import About from "../app/[lang]/(modalComponents)/About";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
////////////////////////////////////////////////////////////////////////
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LocaleSwitcher from "./locale-switcher";
////////////////////////////////////////////////////////////////////////
import UserNavigation from "./UserNavigation";

export default async function Navbar({ lang }: { lang: Locale }) {
  const { navigation } = await getDictionary(lang);
  const session = await getServerSession(authOptions)
  return (
    <>
      <header
        className={`w-full ${flexCenter}  border-b border-solid border-grayBorder z-20 bg-light`}
      >
        <div
          className={`flex justify-between relative w-10/12 items-center md:w-11/12`}
        >
          <Link href={`/${lang}`} className={`${flexCenter} gap-1`}>
            <LogoSVG className={``} height="28" />
            <h1 className={`${flexCenter} font-bold`}>Hour Tracker</h1>
          </Link>
          
          <div className="md:hidden">
            <nav className={`${flexCenter} gap-4`}>
            {session?.user &&    <Link
                href={`${lang}/dashboard`}
                className={`${navbarLinkClassName}`}
              >
                <div className={`${navbarLinkTextClassName}`}>{navigation.dashboard}</div>
              </Link>}
              <UserNavigation dict={navigation.userNavigation} />
              <About dict={navigation} />
              <LocaleSwitcher localeDict={navigation.localeDict} />
            </nav>
          </div>
          <div className="hidden md:block">
            {/* <button className={`${flexCenter} group`} onClick={() => setMobileMenu((prev) => !prev)}>
            <Bars3Icon className='w-8 group-hover:fill-sky-400' />
          </button> */}
          </div>
        </div>
      </header>
    </>
  );
}
