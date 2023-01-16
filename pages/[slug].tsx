import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { read } from "to-vfile";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
const apiUrl = process.env.NEXT_API_URL;

export default function SinglePages({ data }: any) {
  const { query } = useRouter();

  const { t } = useTranslation();
  if (data === null) {
    return <>NO Data Found</>;
  }

  const d = data;

  return (
    <>
      <NextSeo
        title={t(`common:${query.slug}`)}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME + `/${query.slug}`}
        openGraph={{
          title: t(`common:${query.slug}`),
        }}
      />
      <main className="container mx-auto px-4 singlepage">
        <div dangerouslySetInnerHTML={{ __html: d }}></div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = ["contact-us", "privacy-policy", "terms-and-condition"];
  const paths = data.map((post: string) => {
    return {
      params: { slug: post.toString() },
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

  const reqUrl = `${apiUrl}/${slug}${
    loc == "ar" ? "?locale=ar&" : "?"
  }populate=deep`;
  const res = await fetch(reqUrl).then();
  const productData = await res.json();
  const d = productData.data.attributes.content;

  const tt = await unified().use(remarkParse).use(remarkHtml).process(d);
  //   console.log(tt.value);
  if (productData.data !== null) {
    return {
      props: {
        data: tt.value,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};
