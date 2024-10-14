'use client'

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';

import 'swiper/css';

const slides = [
  {
    id: 1,
    title: "Welcome to TEC",
    content: "Welcome to The Enlightenment Club (TEC), where we foster intellectual growth, political understanding, and spiritual enlightenment from an Islamic perspective. Join us on our journey to empower the Muslim Ummah through knowledge, critical thinking, and meaningful dialogue.",
    imageUrl: "/images/slider/slide1.jpeg"
  },
  {
    id: 2,
    title: "Rational Thinking",
    content: "At TEC, we believe in the power of rational thinking and philosophy. It is through deep contemplation and critical analysis that we find clarity in the complexities of life. Philosophy encourages us to think beyond the surface, question our assumptions, and arrive at meaningful conclusions.",
    imageUrl: "/images/slider/slide2.webp"
  },
  {
    id: 3,
    title: "About Islam",
    content: "Islam provides a comprehensive guide for leading a righteous life through the teachings of the Quran and Hadith. At TEC, we explore these timeless principles, delving into their relevance in modern society. Join us as we reflect on the wisdom within the Quran and Hadith, guiding us towards ethical and meaningful lives.",
    imageUrl: "/images/slider/slide3.webp"
  }
];

function highlightTEC(text: string) {
  return text.split("TEC").join('<span class="text-primary">TEC</span>');
}

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const titleVariants = {
  hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

const contentVariants = {
  hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut', delay: 0.2 } }
};

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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col md:flex-row items-center justify-evenly px-4 sm:px-6 md:px-10 lg:px-16 z-10">

              {/* Logo for Small Screens */}
              <motion.div
                className="mt-4 mr-2 md:mt-0 md:hidden"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
              >
                <Image
                  src="/images/image.svg"
                  alt="The Enlightenment Club Logo"
                  width={20}
                  height={20}
                  className="w-auto h-auto"
                />
              </motion.div>

              {/* Slide Title & Content */}
              <motion.div
                className="text-white max-w-md sm:max-w-2xl"
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                <motion.h1
                  className="text-3xl sm:text-4xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight"
                  initial="hidden"
                  animate="visible"
                  variants={titleVariants}
                >
                  {slide.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="text-primary">{slide.title.split(' ').slice(-1)}</span>
                </motion.h1>

                {/* Slide Content */}
                <motion.p
                  className="text-sm sm:text-base lg:text-xl font-light leading-relaxed lg:leading-loose"
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                  dangerouslySetInnerHTML={{ __html: highlightTEC(slide.content) }}
                />
              </motion.div>

              {/* Logo for Larger Screens */}
              <motion.div
                className="mt-4 md:mt-0 hidden md:block"
                initial="hidden"
                animate="visible"
                variants={logoVariants}
              >
                <Image
                  src="/images/image.svg"
                  alt="The Enlightenment Club Logo"
                  width={220}
                  height={220}
                  className="w-auto h-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}