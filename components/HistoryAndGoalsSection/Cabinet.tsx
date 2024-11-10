'use client'

import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import NextArrow from '../NextArrow';
import PrevArrow from '../PrevArrow';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const cabinetMembers = [
  {
    name: "Abdus Salam",
    role: "President",
    bio: "Abdus Salam leads The Enlightenment Club (TEC), driving strategic initiatives and ensuring intellectual growth within the organization.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Asad Yasin",
    role: "Chairman General Counsel",
    bio: "Asad Yasin advises on legal matters and ensures compliance with The Enlightenment Club's (TEC) governing policies and regulations.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Asad Ashraf",
    role: "Chairman ESF",
    bio: "Asad Ashraf manages the Enlightenment Student Federation (ESF), providing guidance on academic resources and financial support for students.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Ali",
    role: "President ESF PU",
    bio: "Ali leads the Enlightenment Student Federation (ESF) chapter at Punjab University, overseeing operations and educational initiatives at the campus level.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Mehran Tariq",
    role: "Treasurer",
    bio: "Mehran Tariq manages The Enlightenment Club's (TEC) finances, including budgeting, accounting, and financial planning.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Talha",
    role: "Events Coordinator",
    bio: "Talha is responsible for organizing and executing The Enlightenment Club's (TEC) events, workshops, and seminars.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Dawood",
    role: "Media Manager",
    bio: "Dawood manages The Enlightenment Club's (TEC) online presence, including social media content, branding, and promotional materials.",
    image: "/images/placeholder.svg"
  }
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  pauseOnHover: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function Cabinet() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
  };

  const imageHoverVariants = {
    hidden: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  return (
    <div className="mb-12 pb-12 px-8 sm:px-16 overflow-hidden" ref={ref}>
      <motion.h3
        className="text-3xl font-bold mb-8 text-center text-[#30323B] font-serif"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        Our Cabinet
      </motion.h3>
      <motion.div
        className="relative"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut", staggerChildren: 0.2 } }
        }}
      >
        <Slider {...settings}>
          {cabinetMembers.map((member, index) => (
            <motion.div
              key={index}
              className="px-4 mb-7 mt-7"
              variants={cardVariants}
            >
              <div className="bg-gradient-to-br from-white to-[#F5F5F5] rounded-lg shadow-xl overflow-hidden h-[500px] flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="h-52 overflow-hidden rounded-t-lg">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    variants={imageHoverVariants}
                    whileHover="hover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-2xl font-semibold mb-2 text-[#30323B] font-serif">{member.name}</h4>
                  <p className="text-primary mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm flex-grow overflow-y-auto">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
}
