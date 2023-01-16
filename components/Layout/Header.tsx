import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsOpen(false);
  }, [router.asPath, router.locale]);
  const navBar = [
    { title: t("common:perfume-men"), slug: "/perfume-men" },
    { title: t("common:perfume-women"), slug: "/perfume-women" },
    { title: t("common:perfume-unisex"), slug: "/perfume-unisex" },
    { title: t("common:fav"), slug: "/fav" },
    { title: t("common:stores"), slug: "/stores" },
    { title: t("common:contact-us"), slug: "/contact-us" },
    { title: t("common:privacy-policy"), slug: "/privacy-policy" },
    { title: t("common:terms-and-condition"), slug: "/terms-and-condition" },
  ];
  return (
    <header>
      <nav className="flex justify-between py-1 px-4 items-center     ">
        <div className="logo text-4xl ">
          <Link href={"/"}>
            <a>
              <Image
                alt="logo"
                width={130}
                height={45}
                src={"/imgs/logo.png"}
              />
            </a>
          </Link>
        </div>
        <div className=" md:hidden flex gap-2 items-center justify-center hover:cursor-pointer">
          <div className="    ">
            <Link
              href={"https://onelink.to/xu2b6x"}
              target="_blank"
              rel="noopener"
            >
              <a>
                <Image
                  alt="logo"
                  width={130}
                  height={40}
                  src={"/imgs/ss.png"}
                />
              </a>
            </Link>
          </div>

          <Link href={`/search`} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>

          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 hover:cursor-pointer block md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 hover:cursor-pointer block md:hidden"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </div>
        <div
          className={`${
            isOpen
              ? "absolute flex-col px-6"
              : "hidden md:flex items-center w-full"
          } py-4   bg-white  w-screen top-12 left-0 z-50 flex gap-4  nav-items md:flex-row md:justify-end md:items-center  md:gap-4  lg:gap-6`}
        >
          {navBar.map((navlink) => (
            <Link href={navlink.slug} key={Math.random()}>
              <a className={"hover:underline py-2 border-b-2 md:border-b-0"}>
                {navlink.title}
              </a>
            </Link>
          ))}

          <div>
            {router.locales?.map((loc) => (
              <Link
                href={router.asPath}
                className="  pb-2 border-b-2 md:border-b-0"
                locale={loc}
                key={loc}
              >
                <button
                  className={`mx-2 p-2 border  ${
                    loc === router.locale ? "border-blue-400" : ""
                  }`}
                >
                  {loc}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
