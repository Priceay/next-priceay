import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Search from "./Search";
export default function SearchForm(props: any) {
  const { back } = useRouter();

  const goBack = () => {
    if (props.setIsSearching) {
      props.setIsSearching(false);
    } else {
      back();
    }
  };

  return (
    <div className="w-full    bg-white  fixed   z-50 px-4    min-h-screen py-2 top-0 left-0 right-0 bottom-0  m-auto">
      <div className=" mt-16">
        <Search back={goBack} counter={props.counter} />
      </div>
    </div>
  );
}
