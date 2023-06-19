import { NextSVG, TypeScriptIcon, ReactIcon, TailwindSVG, LinkedInIcon, GithubIcon, GmailIcon } from "@/util/icons"
import Link from "next/link"
import { flexCenter } from "./(hooks)/mixin"
const tools = [
    {
        name: '',
        icon: <NextSVG className="w-28 lg:w-24 md:w-20"/>
    },
    {
        name: 'React',
        icon: <ReactIcon className=""/>
    },
    {
        name: 'TypeScript',
        icon: <TypeScriptIcon className=""/>
    },
    {
        name: 'Tailwind CSS',
        icon: <TailwindSVG className="w-7"/>
    },
]

const contacts = [
    {
        icon: <GithubIcon className=""/>,
        link: 'https://github.com/IdoBand',
        className: 'ml-4 mr-2 lg:w-4 md:ml-2 md:mr-2',
        },
    {
        icon: <LinkedInIcon className="" />,
        link: 'https://www.linkedin.com/in/ido-band/',
        className: 'mx-2 lg:w-4 md:mx-2',
    },
    {
        icon: <GmailIcon className="hover:text-blue-500" />,
        link: 'mailto:ido.bandd@gmail.com',
        className: 'mx-2 lg:w-4 md:mx-2',
    },
]
const createdHeader = 'w-full text-3xl text-center font-medium mb-8 md:text-lg'
const About = () => {
  return (
    <main className="flex flex-col items-center px-16 py-10 gap-4 md:px-6 md:py-6">
        <h2 className={createdHeader}>Created With</h2>
        <div className={`flex flex-col items-start justify-start w-max`}>
            {tools.map((tool) => {
                return <div key={tool.name} className="flex gap-2 mb-4 text-xl lg:text:lg md:text-base">
                    {tool.icon}{tool.name}
                    </div>
            })}
        </div>
        <div className="">
        <h2 className={createdHeader}>Created By Ido Band</h2>
        <div className={flexCenter}>
        {contacts.map((icon,idx) => {
            return (
                <Link href={icon.link} target="_blank" key={idx} className={`w-8 hover:scale-110 ${icon.className}`}>
                    {icon.icon}
                </Link>
            )
        })}
            <Link href={'https://idoband.onrender.com/'} className='hover:text-blue-500 md:ml-2 hover:scale-110'>Portfolio</Link>
        </div>
        
        </div>   
    </main>
  )
}

export default About