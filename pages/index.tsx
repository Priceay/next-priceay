import SearchForm from "@/components/SearchForm";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Product } from "@/models/Products";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Social from "@/components/Social";
const apiUrl = process.env.NEXT_PUBLIC_API;

const Home: NextPage = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstLetter, setFirstLetter] = useState("6");
  const { locale } = useRouter();
  const [counter, setCounter] = useState(0);
  const [showSearchByBrand, setSearchByBrand] = useState(false);
  const [products, setProducts] = useState<Product[]>();

  const browseWithNameStarting = async () => {
    setIsLoaded(false);
    console.log();
    const url = `${apiUrl}/brands?filters[brand_name][$startsWith]=${firstLetter.replace(
      / /g,
      ""
    )}&populate=*`;

    const dUrl = `${apiUrl}/products${
      locale === "ar" ? "?locale=ar&" : "?"
    }filters[brands][brand_name][$startsWith]=${firstLetter.replace(
      / /g,
      ""
    )}&populate=*`;

    const response = await fetch(url).then((r) => r.json());

    setProducts(response.data);
    setIsLoaded(true);
  };

  useEffect(() => {
    browseWithNameStarting();
  }, [firstLetter, locale]);

  const showSearch = () => {
    setCounter((prev) => counter + 1);
    console.log({ counter });
    setIsSearching(true);
  };
  const { t } = useTranslation();

  return (
    <>
      {isSearching && (
        <SearchForm counter={counter} setIsSearching={setIsSearching} />
      )}

      <main className="px-9 relative font-normal font-Almarai">
        <h1 className="text-2xl md:text-3xl my-2 text-center  ">
          {t("common:main")}
        </h1>

        <div onClick={showSearch}>
          <input
            type={"text"}
            disabled={counter > 0 ? true : false}
            className="border transp  w-full focus:outline-none px-8 py-3 rounded-3xl  border-black   my-4  active:border-0  "
          />
        </div>

        <div className="flex text-xs sm:text-sm md:text-md justify-around underline gap-1 mb-8">
          <p className="flex gap-1 lg:gap-2 items-center">
            <span> {t("common:update")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </p>
          <p className="flex gap-1 lg:gap-2 items-center">
            <span>{t("common:trusted-stores")}</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 md:h-5 md:w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </p>
        </div>
        <p
          className="text-center flex justify-center transp
           items-center gap-2 text-2xl mb-8 hover:cursor-pointer"
          onClick={() => setSearchByBrand(!showSearchByBrand)}
        >
          {t("common:search")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </p>

        {showSearchByBrand && (
          <p className="my-8 text-center">
            {t("common:initials")
              .split(",")
              .map((t) => (
                <span
                  key={t}
                  className="hover:cursor-pointer transp"
                  onClick={() => setFirstLetter(t)}
                >
                  {t} {","}
                </span>
              ))}
          </p>
        )}

        {showSearchByBrand && isLoaded ? (
          <div className="flex flex-col gap-8 items-end justify-end">
            {products?.map((product: any) => (
              <div className="text-right" key={product.id}>
                <Link href={`/brands/${product.attributes.slug}`}>
                  <a>{product.attributes.brand_name}</a>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          isLoading &&
          showSearchByBrand && (
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200px"
                height="200px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#4cabf6"
                  strokeWidth="10"
                  r="35"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            </div>
          )
        )}
        <Social />
      </main>
    </>
  );
};

export default Home;
