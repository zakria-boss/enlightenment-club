import React from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} slick-next`}
      style={{
        ...style,
        display: 'block',
        right: '-50px',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div className="bg-[#EEAE13] text-white p-4 rounded-full shadow-lg transition-all hover:bg-[#d99d11] hover:shadow-xl hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  );
}

function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} slick-prev`}
      style={{
        ...style,
        display: 'block',
        left: '-50px',
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div className="bg-[#EEAE13] text-white p-4 rounded-full shadow-lg transition-all hover:bg-[#d99d11] hover:shadow-xl hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>
    </div>
  );
}

export default function Cabinet() {
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
    autoplaySpeed: 3000,
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

  return (
    <div className="mb-12 px-16">
      <h3 className="text-3xl font-semibold mb-12 text-center text-[#30323B]">Our Cabinet</h3>
      <div className="relative">
        <Slider {...settings}>
          {cabinetMembers.map((member, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[450px] flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="h-48 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-semibold mb-2 text-[#30323B]">{member.name}</h4>
                  <p className="text-primary mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm flex-grow overflow-y-auto">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}