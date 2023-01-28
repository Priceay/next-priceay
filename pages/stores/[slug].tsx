import { Product } from "@/models/Products";
import { GetStaticPaths, GetStaticProps } from "next";
import ProductCard from "@/components/ProductCard";
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";
import React from "react";
const apiUrl = process.env.NEXT_API_URL;
interface Props {
  productData: Product[];
}
export default function Slug(props: Props) {
  const { t } = useTranslation();

  const { productData } = props;

  return (
    <>
      <NextSeo
        title={t("common:stores")}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME + "/stores"}
      />
      <div className="px-3">
        <div className="grid grid-cols-2 my-8">
          {productData.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const reqUrl = `${apiUrl}/stores`;

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
  const loc = ctx.locale;
  const slug = ctx.params !== undefined ? ctx.params.slug : "";

  const reqUrl = `${apiUrl}/stores/${slug}?populate=*`;
  const res = await fetch(reqUrl).then();
  const productData = await res.json();

  if (productData.data == null) {
    return {
      props: {
        productData: null,
        error: true,
        msg: "Not Found",
      },
    };
  }

  return {
    props: {
      productData: productData.data.attributes.products.data,
    },
  };
};
