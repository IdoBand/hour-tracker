"use client";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";
import Modal from "./Modal";
import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import il from "public/flags/IL.png";
import us from "public/flags/US.png";
import ae from "public/flags/AE.png";
import Image from "next/image";
import { Locale } from "@/i18n.config";
import { useCookies } from 'next-client-cookies';
type LocaleSwitcherProps = {
  localeDict: any
}
export default function LocaleSwitcher({ localeDict }: LocaleSwitcherProps) {
  const cookies = useCookies()
  const pathName = usePathname();
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [localePulldown, setLocalePulldown] = useState<boolean>(false)
  function setLocaleInCookies(locale: Locale) {
    cookies.set('locale', locale)
  }
  const [redirectURL, setRedirectURL] = useState<string>("");

  function getCurrentLocale() {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    return segments[1];
  }

  function redirectLanguage(locale: Locale) {
    setLocaleInCookies(locale)
    if (!pathName) return "/";
    const segments = pathName.split("/");
    if (locale === segments[1]) {
      return;
    }
    segments[1] = locale;
    setRedirectURL(segments.join("/"));
    setWarningModal(true);
  }

  return (
    <>
    <div className={`relative z-40 bg-white p-1 rounded-md min-w-max`} onClick={() => {setLocalePulldown(curr => !curr)}}>
      {localePulldown ?
      <div className="absolute top-0 border border-gray-400 rounded-md gap-1 p-1 min-w-max bg-white">
        <span className="text-danger font-medium w-full flex flex-row-reverse cursor-pointer"
          onClick={(e) => {e.stopPropagation(); setLocalePulldown(false)}}
        >X</span>
        {i18n.locales.map((locale) => (
          <div
          key={`locale-${locale}`}
          className="select-item flex rtl:flex-row-reverse cursor-pointer gap-1"
          onClick={() => redirectLanguage(locale as Locale)}
          >
            <Image src={IMG[locale].flag} alt={IMG[locale].alt} width={20} />
            {locale}
          </div>
        ))}
      </div>
    :
      <div className="flex rtl:flex-row-reverse gap-1">
        <Image src={IMG[getCurrentLocale()  as 'en'].flag} alt={IMG[getCurrentLocale() as 'en'].alt} width={20} />
        {getCurrentLocale()}
        <ArrowDownCircleIcon className="w-5" />
      </div>
    }
    </div>
      
      {warningModal && (
        <Modal onClose={() => setWarningModal(false)}>
          <div className="p-8 flex flex-col text-center gap-y-6">
          {localeDict.areUsure}
          <div>

            {localeDict.unsavedData}
          </div>
            <div className="flex gap-5">
              <Button
                text={localeDict.goBack}
                theme="blank"
                className=""
                type="button"
                onClick={() => setWarningModal(false)}
              />
              <Link href={redirectURL}>
                <Button
                  text={localeDict.continue}
                  theme="full"
                  className=""
                  type="button"
                />
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

const IMG = {
  en: {
    flag: us,
    alt: "United States",
  },
  he: {
    flag: il,
    alt: "Israel",
  },
  ar: {
    flag: ae,
    alt: "Utd Arab Emirates",
  },
};