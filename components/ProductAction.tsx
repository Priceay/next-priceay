import { PriceAndStores, Store } from "@/models/Products";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import React, { useEffect, useState } from "react";
interface Props {
  variations: PriceAndStores[];
  selectedVariationId: number;
  textToCopy: string;
  setIsVisible: any;
  showPopup: any;
}
export default function ProductAction(props: Props) {
  const { t } = useTranslation();

  const { variations, selectedVariationId, textToCopy } = props;

  const [isCopied, setIsCopied] = useState(false);
  const [variation, setVariation] = useState<PriceAndStores>();
  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    }
  };

  const selectedVariation = () => {
    if (variations !== undefined) {
      console.log({ variations });
      const variationF = variations.filter(
        (variation) => variation.id === selectedVariationId
      )[0];

      return variationF;
    }
  };

  useEffect(() => {
    if (variations) {
      const variationF = variations.filter(
        (variation) => variation.id === selectedVariationId
      )[0];
      setVariation(variationF);
    }
  }, [selectedVariationId, variations]);

  const storeImg =
    selectedVariation()?.store.data.attributes.featured_img.data.attributes.url;
  return (
    <>
      <section className="border border-gray-500">
        <div className="font-IBM text-xss flex justify-between gap-0 flex-shrink-0    px-2  sm:text-sm w-full float-right bg-primaryWarning">
          <span
            className="font-IBM font-semibold hover:cursor-pointer underline transp"
            onClick={() => props.showPopup("condition")}
          >
            الشروط
          </span>
          {selectedVariation()?.store.data !== null
            ? selectedVariation()?.store.data.attributes.store_text
            : ""}
        </div>
        <div className="">
          <div className="flex justify-between px-5 mt-8 mb-4   sm:mb-8  sm:mt-16  ">
            <button className="brand">
              <Image
                alt={"Store Image"}
                src={storeImg ? storeImg : "/nice-one.png"}
                width={80}
                height={40}
              />
            </button>
            {/* <div>المزيد</div> */}
            <div className="flex flex-row-reverse">
              <span className="text-xl mx-2">
                {selectedVariation()?.price ? selectedVariation()?.price : 125}
              </span>
              <span className="font-bold">{t("common:riyal")}</span>
            </div>
          </div>
        </div>
        <hr className="bg-gray-400  seprated   " />

        <div className="flex justify-around hover:cursor-pointer items-center  my-4">
          <div
            onClick={copyToClipboard}
            className="flex gap-2 transp sm:gap-4 border border-black p-2 sm:p-3 rounded-md border-dashed"
          >
            <span className="text-sm font-bold ">
              {isCopied ? t("common:copied") : t("common:copy-code")}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isCopied ? "text-green-700" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
              <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <button
            className="hover:cursor-pointer transp"
            onClick={() => props.showPopup("true")}
          >
            {t("common:more")}
          </button>
          <button className="bg-primaryBlue text-white rounded-3xl  p-2">
            <Link
              href={variation ? variation.link : "#"}
              target="_blank"
              rel="noopener"
            >
              <a className="font-bold" rel="noopener" target={"_blank"}>
                {t("common:go-to-store")}
              </a>
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
