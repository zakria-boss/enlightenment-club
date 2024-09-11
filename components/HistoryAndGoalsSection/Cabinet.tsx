import React from 'react';
import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Dynamically import react-slick with no SSR
const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Define types for the arrow props
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Custom arrow components with added color styling
function NextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} slick-next`}
      style={{
        ...style,
        display: 'block',
        right: '10px',
        zIndex: 1,
        background: '#EEAE13', // Custom color for the arrow
        borderRadius: '50%',
        width: '40px',
        height: '40px'
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div
      className={`${className} slick-prev`}
      style={{
        ...style,
        display: 'block',
        left: '10px',
        zIndex: 1,
        background: '#EEAE13', // Custom color for the arrow
        borderRadius: '50%',
        width: '40px',
        height: '40px'
      }}
      onClick={onClick}
    />
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
    slidesToShow: 3, // Show 3 slides at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true, // Pause when the mouse hovers over the carousel
    pauseOnFocus: false, // Ensure that the autoplay continues when the carousel is focused
    nextArrow: <NextArrow />, // Custom next arrow
    prevArrow: <PrevArrow />, // Custom previous arrow
    responsive: [
      {
        breakpoint: 1024, // For tablet and medium screens
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600, // For mobile and small screens
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#30323B]">Our Cabinet</h3>
      <Slider {...settings}>
        {cabinetMembers.map((member, index) => (
          <div key={index} className="p-6">
            <div className="bg-gray-100 rounded-lg p-6">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2 text-center">{member.name}</h4>
              <p className="text-[#EEAE13] mb-2 text-center">{member.role}</p>
              <p className="text-gray-600 text-center">{member.bio}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
