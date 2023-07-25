import ProductAction from "@/components/ProductAction";
import { Product, PriceAndStores } from "@/models/Products";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Popup from "@/components/Popup";
import Link from "next/link";
import moment from "moment";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { addToFavCart, getFavCart, hasProductInCart } from "utils/fav-products";
const apiUrl = process.env.NEXT_API_URL;

interface Props {
  productData: Product;
}
export default function ProductData(props: Props) {
  
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [popupText, setPopupText] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [textToCopy, setTextToCopy] = useState("");
  const [variations, setVariations] = useState<PriceAndStores | any>();
  const [selectedVariationId, setSelectedVariationId] = useState(0);
  const [isReview, setIsReview] = useState(false);
  const {
    id,
    attributes: { Name, brands, price_and_stors, featured_img, slug,stores },
  } = props.productData;

  const reviewCss = () => {
    if (isReview) {
      return "flex transp items-center justify-between w-full p-5 font-medium text-left border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white";
    }
    return "flex transp items-center justify-between w-full p-5 font-medium text-left border border  border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400";
  };
  const updatedAtText = () => {
    if (props.productData.attributes.updatedAt) {
      var a = moment(moment.now());
      var b = moment(props.productData.attributes.updatedAt);
      if (a.diff(b, "hours") > 48) {
        return 48;
      } else if (a.diff(b, "hours") === 0) {
        return 48;
      } else {
        return a.diff(b, "hours");
      }
    }
  };

  useEffect(() => {
    if (price_and_stors?.length > 0) {
      setVariations(price_and_stors);

      setSelectedVariationId(price_and_stors[0].id);
    } else {
      return;
    }
  }, [price_and_stors]);

  useEffect(() => {
    if (variations && variations.length > 0) {
      const variation = price_and_stors.filter(
        (v) => v.id === selectedVariationId
      )[0];
      const indexOfStore=price_and_stors.findIndex((v)=>v.id===selectedVariationId)
      

      const v = stores?.data[indexOfStore];
      if (v?.attributes!== null) {
        setTextToCopy(v ? v.attributes.discount_code : "");
      }
    }
  }, [selectedVariationId, props, price_and_stors]);

  const getQty = () => {
    const prd = price_and_stors.find((p) => p.id === selectedVariationId);
    if (prd) {
      return prd.quantity;
    } else {
      return price_and_stors[0]?.quantity ? price_and_stors[0]?.quantity : 75;
    }
  };

  const onLikeClick = () => {
    addToFavCart(id);
    checkIfLiked();
  };
  const checkIfLiked = () => {
    let userCart = getFavCart();
    if (userCart === null) {
      return;
    }
    const { inCart } = hasProductInCart(id, userCart.cart);
    if (inCart) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  };

  useEffect(() => {
    checkIfLiked();
  }, [id, getFavCart, checkIfLiked]);

  const popupMsg = (type: string) => {
    if (variations) {
      const variation = variations.filter(
        (v: any) => v.id === selectedVariationId
      )[0];
      if (type === "condition") {
        return setPopupText(variation.store.data.attributes.conditions);
      } else {
        if (variation.include_vat) {
          return setPopupText(
            `${t("common:include-vat")} 
            <br/>
             ${t("common:shipping-exclude")}`
          );
        } else {
          return setPopupText(t("common:exclude-vat"));
        }
      }
    }
  };

  const showPopup = (from: string) => {
    if (from === "condition") {
      setIsVisible(!isVisible);

      return popupMsg(from);
    } else {
      setIsVisible(!isVisible);
      return popupMsg(from);
    }
  };

  if (props.productData === null) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      <NextSeo
        title={Name}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME + "/products/" + slug}

        openGraph={{
          title: Name,
          locale,
          description: Name,
          images: [
            {
              url: featured_img?.data?.attributes?.url,
              alt: featured_img?.data?.attributes?.alternativeText,
            },
          ],
        }}
      />
      {isVisible && <Popup setIsVisible={setIsVisible} msg={popupText} />}

      <div className={`px-3 `}>
        <div className="flex justify-center product">
          <Swiper
            modules={[Scrollbar]}

            spaceBetween={50}
            slidesPerView={1}
            scrollbar={{ draggable: true }}
          >
            <SwiperSlide>
              <Image
                alt={featured_img.data.attributes.alternativeText}
                src={featured_img.data.attributes.url}
                height={250}
                objectFit="contain"
                width={200}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                alt={featured_img.data.attributes.alternativeText}
                src={featured_img.data.attributes.url}
                height={250}
                objectFit="contain"
                width={200}
              />{" "}
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex flex-col  justify-end items-end ">
          <h1 className="text-xl ">{Name}</h1>
          <div className="flex w-full items-center justify-between">
            <div onClick={onLikeClick} className="transp">
              {isLike ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </>
              )}
            </div>
            <div className="">
              <Link href={`/brands/${brands.data?.attributes.slug}`}>
                <a className="font-bold">
                  {brands.data?.attributes.brand_name}
                </a>
              </Link>{" "}
            </div>
          </div>
          <div className=" ">
            {t("common:best-price", {
              qty: getQty(),
            })}
          </div>
          <div className="my-4 flex gap-8">
            {variations?.map((detail: any,index:number) => (
              <div
                key={detail.id}
                onClick={() => setSelectedVariationId(detail.id)}
                className={`border  cursor-pointer rounded-full   ${
                  selectedVariationId == detail.id
                    ? "selected border-blue-700"
                    : ""
                } border-gray-900 transp py-1 px-3`}
              >
                {detail.quantity} ml
              </div>
            ))}
          </div>
        </div>

        <ProductAction
          textToCopy={textToCopy}
          variations={variations}
          selectedVariationId={selectedVariationId}
          setIsVisible={setIsVisible}
          showPopup={showPopup}
        />
        <p className="flex justify-end">
          {t("common:updated", { hours: updatedAtText() })}
        </p>

        <div className="mt-4 mb-9">
          <div id="accordion-collapse" data-accordion="open">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className={reviewCss()}
                onClick={() => setIsReview(!isReview)}
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded={isReview}
                aria-controls="accordion-collapse-body-1"
              >
                <span>{t("common:perfume-review")}</span>
                <svg
                  data-accordion-icon=""
                  className={`w-6 h-6 ${
                    isReview ? "rotate-360" : "rotate-180"
                  }  shrink-0`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className={isReview ? "block" : "hidden"}
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                {props.productData.attributes.review}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const reqUrl = `${apiUrl}/products`;

  const res = await fetch(reqUrl).then();

  const data = await res.json();
  const paths = data.data.map((post: any) => {
    return {
      params: { slug: post.attributes.slug.toString() },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params !== undefined ? ctx.params.slug : "";
  const loc = ctx.locale;

  const reqUrl = `${apiUrl}/products/${slug}${
    loc == "ar" ? "?locale=ar&" : "?"
  }populate=*`;

  const res = await fetch(reqUrl).then();
  const productData = await res.json();
  // console.log({ reqUrl });
  

  if (productData.data == null) {
    const testLoc = loc === "ar" ? "en" : "ar";
    const testReq = `${apiUrl}/products/${slug}${
      testLoc == "ar" ? "?locale=ar&" : "?"
    }populate=*`;
    const resp = await fetch(testReq).then((r) => r.json());

    if (resp.data !== null) {
      // const slug = resp.data.attributes.localizations.data[0].attributes.slug;
      // console.log({testReq})
      const locDataLength = resp.data.attributes.localizations.data.length;
      const _product = resp.data.attributes.localizations.data[0];
      const data = {
        id: _product.id,
        attributes: {
          ...resp.data.attributes,
          ..._product.attributes,
        },
      };

      return {
        props: {
          productData: locDataLength === 0 ? resp.data : data,
        },
      };
    }

    return {
      props: {
        productData: null,
        error: true,
        msg: "Not Found",
      },
    };
  }

  if (loc === "ar" && productData.data.attributes.locale !== "ar") {
    const data = {
      ...productData.data.attributes.localizations.data[0],
      ...productData.data.attributes,
    };

    return {
      props: {
        productData: data,
        // productData: productData.data.attributes.localizations.data[0],
      },
    };
  }

  return {
    props: {
      productData: productData.data,
    },
  };
};
