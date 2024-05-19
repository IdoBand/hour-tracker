"use client";
import { usePathname } from "next/navigation";
import { i18n } from "@/i18n.config";

import Modal from "./Modal";
import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import il from "public/flags/IL.png";
import us from "public/flags/US.png";
import ae from "public/flags/AE.png";
import Image from "next/image";
export default function LocaleSwitcher() {
  const pathName = usePathname();
  const [warningModal, setWarningModal] = useState<boolean>(false);
  const [redirectURL, setRedirectURL] = useState<string>("");

  function getCurrentLocale() {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    return segments[1];
  }

  function redirectLanguage(locale: any) {
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
      <select
        onChange={(e) => redirectLanguage(e.target.value)}
        value={getCurrentLocale()}
      >
        {i18n.locales.map((locale) => (
          <option
            key={`locale-${locale}`}
            value={locale}
            className="select-item"
          >
            {locale}
            {/* <Image src={IMG[locale].flag} alt={IMG[locale].alt} width={20} /> */}
          </option>
        ))}
      </select>
      {warningModal && (
        <Modal onClose={() => setWarningModal(false)}>
          <div className="p-8 flex flex-col text-center gap-y-6">
            Unsaved data will be lost
            <div className="flex gap-5">
              <Button
                text="Go Back"
                theme="blank"
                className=""
                type="button"
                onClick={() => setWarningModal(false)}
              />
              <Link href={redirectURL}>
                <Button
                  text="Continue"
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
