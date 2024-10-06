'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';

const backgroundSlides = [
  { id: 1, imageUrl: '/images/slider/slide1.jpeg' },
  { id: 2, imageUrl: '/images/slider/slide2.webp' },
  { id: 3, imageUrl: '/images/slider/slide3.webp' },
  { id: 4, imageUrl: '/images/slider/slide4.webp' },
];

export default function HeroSlider() {
  return (
    <section className="relative h-[calc(100vh-5rem)] w-full overflow-hidden">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="absolute inset-0 h-full w-full z-0"
      >
        {backgroundSlides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <Image
              src={slide.imageUrl}
              alt="Enlightenment Club Background"
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 z-10">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            The Enlightenment <span className='text-tertiary'>Club</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed lg:leading-loose">
            Fostering intellectual and political understanding from an Islamic perspective.
            Empowering the Muslim Ummah through knowledge and critical thinking.
          </p>
        </div>

        <div className="mt-8 md:mt-0 md:block hidden">
          <Image
            src="/images/image.svg"
            alt="The Enlightenment Club Logo"
            width={220}
            height={220}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
}
