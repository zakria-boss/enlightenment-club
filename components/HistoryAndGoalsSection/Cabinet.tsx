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
    bio: "The President oversees TEC’s operations, appoints the Central Cabinet, approves memberships, and supervises events. He ensures adherence to TEC’s objectives, resolves issues, and maintains the organization’s structure.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Muhammad Asad Yaseen",
    role: "Vice President & Chairman Council of Members",
    bio: "As Vice President and CCM, Muhammad Asad Yaseen supports TEC’s growth and intellectual development. He organizes Member Series, directs Affiliate Member sessions, and ensures expansion through regular reporting.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Muhammad Asad Ashraf",
    role: "President Enlightenment Student Federation (ESF)",
    bio: "Muhammad Asad Ashraf leads ESF, managing TEC’s operations in educational institutes. He appoints institutional leaders, oversees memberships, and ensures discipline within the student wing.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Muhammad Ali Raza",
    role: "President ESF-PU",
    bio: "Muhammad Ali Raza heads TEC’s activities at the University of the Punjab. He engages students, organizes campus events, and strengthens TEC’s presence in the university.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Talha Afzal",
    role: "Event Manager",
    bio: "Talha Afzal manages TEC’s events, handling planning, logistics, and execution. He ensures that all events align with TEC’s objectives.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Dawood Ahmad",
    role: "Media Advisor",
    bio: "Dawood Ahmad oversees TEC’s media strategy, promoting its objectives through social media and digital platforms. He ensures an active and engaging online presence.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Rafi Ullah",
    role: "Media Manager",
    bio: "Rafi Ullah supports the Media Advisor by managing social media, editing videos, and publishing content like podcasts and event recordings.",
    image: "/images/placeholder.svg"
  },
  {
    name: "Mehran Tariq",
    role: "Finance Advisor",
    bio: "Mehran Tariq manages TEC’s finances, overseeing funds, maintaining records, and ensuring transparency in financial matters.",
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
                <div className="h-52 w-full overflow-hidden rounded-t-lg flex-shrink-0">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    variants={imageHoverVariants}
                    whileHover="hover"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-shrink-0 mb-2">
                    <h4 className="text-2xl font-semibold text-[#30323B] font-serif h-14 line-clamp-2 mb-2">{member.name}</h4>
                    <p className="text-primary font-medium h-6 line-clamp-1">{member.role}</p>
                  </div>
                  <div className="relative flex-grow overflow-hidden">
                    <p className="text-gray-600 text-sm line-clamp-6">{member.bio}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F5F5F5] to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
}
