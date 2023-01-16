import { PriceAndStores, Store } from "@/models/Products";

import React, { useEffect, useState } from "react";
interface Props {
  setIsVisible: any;
  msg: any;
}
export default function Popup(props: Props) {
  const t = props.msg.split("-").join("<br/>");
  console.log(t);
  return (
    <div className="bg-white shadow-lg z-10 px-4 absolute border h-min translate-y-full  py-2 top-0 left-0 right-0 bottom-0     ">
      <div className="border-b-2 py-3"> Message</div>
      <p className="py-4" dangerouslySetInnerHTML={{ __html: t }}></p>

      <div className="border-t-2 py-1">
        <button
          onClick={() => props.setIsVisible(false)}
          className="p-2 border transp bg-gray-500 text-gray-50 rounded-sm  float-right"
        >
          Close
        </button>
      </div>
    </div>
  );
}
