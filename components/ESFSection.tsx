'use client'

import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import 'swiper/css';
import { useEffect } from 'react';

const esfWings = [
  {
    id: 1,
    wingName: "ESF-PU",
    university: "Punjab University",
    president: "Ali Raza",
    description: "The Punjab University wing of the Enlightenment Student Federation fosters a community of thinkers and learners, encouraging students to engage with intellectual discourse and promote rational thinking.",
    imageUrl: "https://via.placeholder.com/500x300"
  },
  {
    id: 2,
    wingName: "ESF-GCU",
    university: "Government College University",
    president: "Ayesha Siddiqui",
    description: "The ESF-GCU wing is a dynamic group of students from Government College University who work together to explore philosophical and spiritual themes within an academic setting.",
    imageUrl: "https://via.placeholder.com/500x300"
  },
  {
    id: 3,
    wingName: "ESF-FAST",
    university: "FAST University",
    president: "Bilal Khan",
    description: "At FAST University, the Enlightenment Student Federation chapter focuses on innovation and leadership, inspiring students to approach their academic and personal development with a critical mindset.",
    imageUrl: "https://via.placeholder.com/500x300"
  }
];

const esfHead = {
  name: "Asad Ashraf",
  title: "Head of Enlightenment Student Federation",
  description: "Asad Ashraf oversees all the student federation wings across various universities. He works closely with each wing's president to ensure the mission of the Enlightenment Club is upheld and promoted.",
  imageUrl: "https://via.placeholder.com/200x200"
};

const esfDescription = `
  The Enlightenment Student Federation (ESF) is a vibrant and dynamic student body that spans across various universities.
  ESF's mission is to foster intellectual growth, leadership, and community engagement among students through critical thinking and meaningful dialogue.
  Each university wing of ESF operates under the guidance of a President and works towards empowering students to question, explore, and grow both academically and spiritually.
`;

// Animation variants
const esfTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const esfImageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }
};

const esfHeadTextVariants = {
  hidden: { opacity: 0, y: 50, transition: { duration: 0.5, ease: 'easeIn' } },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

const esfHeadImageVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20, transition: { duration: 0.5, ease: 'easeIn' } },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

export default function ESFSection() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  const esfWingsControls = useAnimation();
  const { ref: wingsSectionRef, inView: wingsInView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    if (wingsInView) {
      esfWingsControls.start("visible");
    }
  }, [controls, inView, esfWingsControls, wingsInView]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#EFE7DA] to-[#E1D5C3]" ref={ref}>
      {/* Section Header */}
      <motion.h2
        className="text-4xl font-bold mb-8 text-center text-[#30323B] font-serif"
        initial="hidden"
        animate={controls}
        variants={esfTextVariants}
      >
        Enlightenment Student Federation (ESF)
      </motion.h2>

      {/* ESF Description */}
      <motion.div
        className="max-w-3xl mx-auto mb-12 text-center"
        initial="hidden"
        animate={controls}
        variants={esfTextVariants}
      >
        <p className="text-lg leading-relaxed text-gray-700 px-4 sm:px-6 lg:px-8">
          {esfDescription}
        </p>
      </motion.div>

      {/* ESF Head Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="text-center md:text-left max-w-md"
          initial="hidden"
          animate={controls}
          variants={esfHeadTextVariants}
        >
          <h3 className="text-2xl font-bold text-[#30323B] mb-4">{esfHead.name}</h3>
          <p className="text-lg font-light leading-relaxed text-gray-700">{esfHead.description}</p>
        </motion.div>

        <motion.div
          className="mt-6 md:mt-0"
          initial="hidden"
          animate={controls}
          variants={esfHeadImageVariants}
        >
          <Image
            src={esfHead.imageUrl}
            alt={esfHead.name}
            width={200}
            height={200}
            className="rounded-full shadow-lg"
          />
        </motion.div>
      </div>

      {/* ESF Wings Carousel */}
      <div ref={wingsSectionRef}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="max-w-4xl mx-auto"
        >
          {esfWings.map((wing) => (
            <SwiperSlide key={wing.id}>
              <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-white flex flex-col md:flex-row items-center">
                <motion.div
                  className="relative w-full md:w-1/2 h-full"
                  initial="hidden"
                  animate={esfWingsControls}
                  variants={esfImageVariants}
                >
                  <Image
                    src={wing.imageUrl}
                    alt={wing.wingName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-lg"
                  />
                </motion.div>

                <motion.div
                  className="p-6 md:w-1/2 flex flex-col justify-center text-center md:text-left"
                  initial="hidden"
                  animate={esfWingsControls}
                  variants={esfTextVariants}
                >
                  <h3 className="text-2xl font-bold text-[#30323B] mb-2">{wing.wingName}</h3>
                  <h4 className="text-lg font-semibold text-primary mb-4">{wing.president} - President</h4>
                  <p className="text-lg font-light leading-relaxed text-gray-700">{wing.description}</p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
