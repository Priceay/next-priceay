import algoliasearch from "algoliasearch/lite";
import { useEffect } from "react";
import { InstantSearch, Hits } from "react-instantsearch-hooks-web";

import AutoComplete from "./Autocomplete";
import CustomHits from "./CustomHits";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "";

const searchApi = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || "";
const searchClient = algoliasearch(appId, searchApi);

export default function Search(props: any) {
  useEffect(() => {
    if (typeof window != undefined) {
      setTimeout(() => {
        const r = document.querySelector(".aa-SubmitButton");

        if (r !== null) {
          r.addEventListener("click", (e: any) => {
            if (e.detail > 0) {
              return props.back();
            }
            // if (e.pointerId && e.pointerId > 0) {
            //   console.log("EXECUTING IN CHROME");
            //   return props.back();
            // }
            // if (e.clientX > 0) {
            //   props.back();
            // }
          });
          r.innerHTML = `<svg 
            xmlns="http://www.w3.org/2000/svg"
            
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>`;
        }
      }, 500);
    }
  }, [props]);
  return (
    <div className="flex flex-col  my-4 justify-center ">
      <InstantSearch
        searchClient={searchClient}
        indexName="production_api::product.product"
        routing

        // numberLocale=""
      >
        <AutoComplete
          searchClient={searchClient}
          placeholder="Search products.."
          detachedMediaQuery="none"
          className="select-text"
          autoFocus
          openOnFocus
        />

        <Hits className="my-8" hitComponent={CustomHits} />
      </InstantSearch>
    </div>
  );
}
