"use client";

import { Carousel } from "flowbite-react";

export default function SlidingInterval() {
  return (
    <Carousel slideInterval={5000}>
      <img
        alt="..."
        src="https://icdn.dantri.com.vn/zoom/1200_630/2022/03/15/shopeefood-crop-1647309511518.jpeg"
      />
      <img
        alt="..."
        src="https://cali.vn/storage/app/media/an-rau-thay-com-co-giam-can-khong-thumbnail.jpg"
      />
      <img
        alt="..."
        src="https://cdn.nguyenkimmall.com/images/detailed/575/7-mon-chay-ngon-va-dep-mat-cho-mam-cung-ram-thang-gieng-thumbnail.jpg.jpg"
      />
      <img
        alt="..."
        src="https://cdn3.dhht.vn/wp-content/uploads/2023/01/100-mon-chay-don-gian-de-lam-tai-nha-thom-ngon-moi-ngay-bia.jpg"
      />
      <img
        alt="..."
        src="https://hnm.1cdn.vn/thumbs/720x480/2023/01/24/hanoimoi.com.vn-uploads-image-news-thumbnails-2023-1-_thumbnails242720230227325.jpg"
      />
    </Carousel>
  );
}
