import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { cookies } from 'next/headers'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

export function middleware(request: NextRequest) {

  const cookieStore = request.cookies
  const localeFromCookies = cookieStore.get('locale') ? cookieStore.get('locale')!.value : ''
  const pathname = request.nextUrl.pathname;
  
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale in url
  if (pathnameIsMissingLocale) {
    // if there is no locale in cookies redirect to default (en)
    const locale = localeFromCookies ? localeFromCookies : getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url,
      ),
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
