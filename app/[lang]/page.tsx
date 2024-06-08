import { HomeImage } from "@/util/icons";
import { flexCenter } from "./(hooks)/mixin";
import { CubeIcon } from "@heroicons/react/24/solid";
import { MotionDiv } from "@/components/MotionDiv";
import StartTracking from "./StartTracking";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n.config";
////////////////////////////////////////////////////////////////////////////////////////
interface BulletProps {
  header: string;
  text: string;
}
const Bullet = ({ header, text }: BulletProps) => {
  return (
    <div
      className={`flex flex-col w-[30%] group border border-grayBorder p-5 mb-5 bg-sky-100 shadow-xl rounded-xl lg:w-11/12 lg:my-4 lg:text-sm`}
    >
      <div className="flex gap-3 w-full">
        <CubeIcon className="w-5 group-hover:rotate-180 group-hover:fill-sky-400 transition-all duration-300" />
        <h2 className="text-lg font-medium">{header}</h2>
      </div>
      {text}
    </div>
  );
};

////////////////////////////////////////////////////////////////////////////////////////

interface SentenceProps {
  text: string;
}
const Sentence = ({ text }: SentenceProps) => {
  return (
    <div className="flex gap-2">
      <CubeIcon className="w-3" />
      {text}
    </div>
  );
};

const motionContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};
const motionChild = {
  initial: {
    opacity: 0,
    x: 200,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.08,
    },
  },
};
////////////////////////////////////////////////////////////////////////////////////////

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { navigation , page } = await getDictionary(lang);
  const { home } = page;
  
  // const [isMobile, setIsMobile] = useState<boolean>(false)
  // const user = useAppSelector(state => state.userSlice.user)
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia('(max-width: 800px)')
  //   const handleScreenChange = (event: MediaQueryListEvent) => {
  //       setIsMobile(event.matches);
  //     }
  //     mediaQuery.addEventListener('change',handleScreenChange);
  //     return () => {
  //       mediaQuery.removeEventListener('change',handleScreenChange);
  //     };
  // }, [])

  return (
    <main
      className="flex justify-center items-start w-full relative overflow-x-hidden
    before:absolute before:left-10 before:top-3 before:w-96 before:h-96 before:rounded-full before:bg-sky-200 before:shadow-xl before:animate-up-down-top
    md:before:w-44 md:before:h-44
    after:absolute after:left-1/2 after:-top-9 after:w-36 after:h-36 after:rounded-full after:bg-sky-200 after:animate-up-down-top after:shadow-xl
    "
    >
      <div className="w-10/12 h-full flex flex-col z-10 lg:w-[95%]">
        <div
          className={`w-full flex mb-10 lg:flex-col lg:justify-center lg:items-center`}
        >
          <div
            className={`w-1/2 min-h-full flex justify-end items-center flex-col gap-8
            lg:w-full lg:items-center lg:mt-5
            `}
          >
            <MotionDiv
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              className="text-4xl font-semibold lg:text-2xl md:text-lg"
            >
              {home.title}
            </MotionDiv>
            <MotionDiv
              variants={motionContainer}
              initial="initial"
              animate="animate"
              className="text-lg font-sans lg:text-base md:text-sm"
            >
              {Array.from({ length: 3 }, (_, idx) => (
                <MotionDiv key={idx} variants={motionChild}>
                  <Sentence text={home[`sen${idx + 1}` as "sen1"]} />
                </MotionDiv>
              ))}
              <p className="mt-3 ml-5 font-medium">{home.sen4}</p>
            </MotionDiv>

            <div className={`${flexCenter} gap-4 md:flex-col group`}>
              <StartTracking homeDict={home} navigationDict={navigation} />
            </div>
          </div>
          <div
            className="w-1/2 flex justify-center relative
            before:absolute before:-left-20 before:bottom-0 before:w-36 before:h-36 before:rounded-full before:bg-sky-200 before:-z-10 before:shadow-xl before:animate-up-down-bottom
            md:before:left-0
            after:absolute after:-right-12 after:top-3 after:w-72 after:h-72 after:rounded-full after:bg-sky-200 after:shadow-xl after:animate-up-down-top
            lg:w-full
          "
          >
            {/* <HomeImage width={isMobile ? '200' : '400'} height={isMobile ? '200' : '400'} className="z-10"/> */}
          </div>
        </div>
        <div
          className={`flex w-full z-10 mt-16 justify-between lg:justify-center lg:items-center lg:flex-col lg:mt-0
        `}
        >
          {Array.from({ length: 3 }, (_, idx) => (
            <Bullet
              key={idx}
              header={home[`card${idx + 1}header` as "sen1"]}
              text={home[`card${idx + 1}text` as "sen1"]}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
