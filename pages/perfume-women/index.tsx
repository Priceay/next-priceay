import { Product } from "@/models/Products";
import { GetStaticProps } from "next";
import ProductCard from "@/components/ProductCard";
import useTranslation from "next-translate/useTranslation";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import Link from "next/link";

const apiUrl = process.env.NEXT_API_URL;
interface Props {
  productData: Product[];
  meta: any;
}
export default function PerfumeWomen(props: Props) {
  const { t } = useTranslation();
  const { locale } = useRouter();

  return (
    <>
      <NextSeo
        title={t("common:perfume-women")}
        canonical={process.env.NEXT_PUBLIC_DOMAIN_NAME + "/perfume-women"}
        openGraph={{
          title: t("common:perfume-wo men"),
          locale,
        }}
      />
      <div className="px-3">
        <p className="text-3xl text-center">{t("common:perfume-women")}</p>

        <div className="grid md:grid-cols-4 grid-cols-2 my-8">
          {props.productData.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <div className="flex gap-4 my-16 justify-center">
        {[1, 2, 3].map((i) => (
          <>
            <div className="px-4 py-3 border">
              <Link href={`/perfume-women/page/${i}`}>{i}</Link>
            </div>
          </>
        ))}
        <div className="px-4 py-3 border">
          <Link href={`/perfume-men/page/${props.meta.pagination.pageCount}`}>
            {props.meta.pagination.pageCount}
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  const reqUrl = `${apiUrl}/products${
    locale == "ar" ? "?locale=ar&" : "?"
  }filters[gender][$eq]=Female&populate=*`;

  const response = await fetch(reqUrl).then((r) => r.json());

  return {
    props: {
      productData: response.data,
      meta: response.meta,
    },
  };
};
