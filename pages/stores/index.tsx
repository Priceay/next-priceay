import { NextSeo } from "next-seo";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const apiUrl = process.env.NEXT_API_URL;
interface Props {
  stores: {
    id: number;
    attributes: {
      lists: string;
    };
  };
}
export default function Stores(props: Props) {
  const { stores } = props;
  const { locale } = useRouter();
  const l = stores ? stores.attributes.lists.split("\n") : "";
  // console.log()
  const { t } = useTranslation();

  if (stores == null) {
    return <div className="text-center text-3xl">No Stores To Show </div>;
  }
  return (
    <div className="px-3">
      <NextSeo
        title={t("common:stores")}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME + "/stores"}
        openGraph={{
          title: t("common:stores"),
          locale,
        }}
      />
      <h1 className="text-2xl my-4 text-center">{t("common:stores")} </h1>
      {l && l.map((list) => <div key={Math.random()}> {list}</div>)}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reqUrl = `${apiUrl}/stores-list`;

  const res = await fetch(reqUrl).then();

  const data = await res.json();

  return {
    props: {
      stores: data.data,
    },
  };
};
