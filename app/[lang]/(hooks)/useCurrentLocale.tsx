import { usePathname } from "next/navigation";

const useCurrentLocale = () => {
  const locale = usePathname().split("/")[1];
  return {
    locale,
  };
};

export default useCurrentLocale;
