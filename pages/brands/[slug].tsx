import { Product } from "@/models/Products";

import { GetStaticPaths, GetStaticProps } from "next";
import ProductCard from "@/components/ProductCard";
import { NextSeo } from "next-seo";
interface Props {
  productData: Product[];
}
const apiUrl = process.env.NEXT_API_URL;
export default function Brand(props: Props) {
  if (props.productData == null) {
    return <div className="text-center text-2xl"> Not Found Anything</div>;
  }

  return (
    <>
      <NextSeo
        title={
          props.productData[0].attributes.brands.data.attributes.brand_name
        }
      />
      <div className="px-4">
        <h1 className="text-2xl my-4">
          {props.productData[0].attributes.brands.data.attributes.brand_name}{" "}
        </h1>
        <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto">
          {props.productData.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const reqUrl = `${apiUrl}/brands?populate=deep`;

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

  const reqUrl = `${apiUrl}/products${
    loc == "ar" ? "?locale=ar&" : "?"
  }filters[brands][slug][$contains]=${slug}&populate=*`;

  const res = await fetch(reqUrl).then();
  const productData = await res.json();

  if (productData.data.length == 0) {
    const reqUrlLoc = `${apiUrl}/products${
      loc == "ar" ? "?" : "?locale=ar&"
    }filters[brands][slug][$contains]=${slug}&populate=*`;
    const response = await fetch(reqUrlLoc).then((r) => r.json());

    if (
      response.data.length > 0 &&
      response.data[0].attributes.brands.data.attributes.localizations
    ) {
      const trSlug =
        response.data[0].attributes.brands.data.attributes.localizations.data[0]
          .attributes.slug;
      const trUrl = `${apiUrl}/products${
        loc == "ar" ? "?locale=ar&" : "?"
      }filters[brands][slug][$contains]=${trSlug}&populate=*`;
      const trResp = await fetch(trUrl).then((r) => r.json());
      if (trResp.data) {
        return {
          props: {
            productData: trResp.data,
          },
        };
      } else {
        return {
          props: {
            productData: null,
            error: true,
            msg: "Not Found",
          },
        };
      }
    } else {
      return {
        props: {
          productData: null,
          error: true,
          msg: "Not Found",
        },
      };
    }
  }

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
      productData: productData.data,
    },
  };
};
