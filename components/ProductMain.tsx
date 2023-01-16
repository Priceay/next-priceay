import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

export default function Product() {
  const [isLike, setIsLike] = useState(false);

  return (
    <>
      <div className="flex justify-center product">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <Image
              alt="text"
              src={"/imgs/sample.png"}
              width={300}
              height={450}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="text"
              src={"/imgs/sample.png"}
              width={300}
              height={450}
            />
          </SwiperSlide>
          ...
        </Swiper>
      </div>
      <div className="flex flex-col gap-2 justify-end items-end ">
        <h1 className="text-2xl ">بلو دي شانيل للرجال او دي تواليت</h1>
        <div className="flex w-full justify-between">
          <div className="transp" onClick={() => setIsLike(!isLike)}>
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
          <div className="text-xl">شانيل</div>
        </div>
        <div className="text-xl">أفضل سعر لحجم 75 مل</div>
        <div className="my-4 flex gap-8">
          <div className="border rounded-full     border-gray-900  py-1 px-3">
            50ml
          </div>
          <div className="border rounded-full   selected  border-gray-900  py-1 px-3">
            75ml
          </div>
          <div className="border rounded-full     border-gray-900  py-1 px-3">
            100ml
          </div>
        </div>
      </div>
    </>
  );
}
