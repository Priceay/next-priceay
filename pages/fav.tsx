import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { getFavCart } from "utils/fav-products";
import genParams from "utils/gen-params";
import { useRouter } from "next/router";
import { Product } from "@/models/Products";
import ProductCard from "@/components/ProductCard";

export default function Fav() {
  const { locale, asPath } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  const apiUrl = process.env.NEXT_PUBLIC_API;

  const { t } = useTranslation();
  const getProducts = async (param: string) => {
    const url = `${apiUrl}/products?populate=deep${
      locale === "ar" ? "&locale=ar&" : "&"
    }${param}`;

    const res = await fetch(url).then((r) => r.json());

    if (res.data) {
      setProducts(res.data);
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  };
  useEffect(() => {
    let userCart = getFavCart();
    if (
      userCart !== null &&
      userCart.cart !== undefined &&
      userCart.cart.length
    ) {
      setIsError(false);

      let params = genParams(userCart.cart).join("&");
      getProducts(params);
    } else {
      setIsError(true);
      setErrorText("No Products Found");
    }
  }, [asPath, locale, getProducts]);

  return (
    <div>
      <NextSeo title={t("common:fav")} />

      <h1 className="text-center text-4xl my-4">{t("common:fav")}</h1>
      {isError && <p className="text-center">{errorText}</p>}
      {isLoaded ? (
        <div className="grid grid-cols-2 md:grid-cols-4">
          {products
            ? products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : "No Products"}
        </div>
      ) : (
        !isError && (
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
    </div>
  );
}
