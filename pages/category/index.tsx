import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

export default function MainIndex() {
  const { t } = useTranslation();

  const l = [
    { title: t("common:perfume-men"), slug: "/perfume-men" },
    { title: t("common:perfume-women"), slug: "/perfume-women" },
    { title: t("common:perfume-unisex"), slug: "/perfume-unisex" },
  ];
  return (
    <div className="container p-4">
      <div
        className={`   flex-col px-6 md:flex items-center  py-4
                       bg-white  w-screen top-12 left-0 z-50 
                       flex gap-4  nav-items md:flex-row 
                       md:justify-end md:items-center  md:gap-4  lg:gap-6`}
      >
        {l.map((navlink) => (
          <Link href={navlink.slug} key={Math.random()}>
            <a
              className={"hover:underline w-full py-2 border-b-2 md:border-b-0"}
            >
              {navlink.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
