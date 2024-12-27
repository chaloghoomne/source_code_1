"use client"

import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeSecond from "./Homecomponents/HomeSecond";
import HomeFirst from "./Homecomponents/HomeFirst";
import HomeThird from "./Homecomponents/HomeThird";
import HomeFourth from "./Homecomponents/HomeFourth";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { useSearchParams } from 'next/navigation';

const Home = () => {
  const homeSecondRef = useRef(null);

  const searchParams = useSearchParams();
  const scrollToVisaSection = searchParams.get('scrollToVisaSection');

  useEffect(() => {
    // If we're coming from the Visa link with the specific state
    if (scrollToVisaSection && homeSecondRef.current) {
      homeSecondRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <div className="min-w-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chalo Ghoomne</title>
        <link rel="canonical" href="https://chaloghoomne.com/" />   
      </Helmet>
      <HomeFirst homeSecondRef={homeSecondRef} />
      <div id="visa-section">
        <HomeSecond ref={homeSecondRef} />
      </div>
      <div className="h-[2px] rounded-lg bg-black/10"></div>
      <HomeThird />
      <div className="h-[2px] rounded-lg bg-black/10"></div>
      <HomeFourth />
      <a
        href="https://wa.me/919555535252"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg whatsapp-icon hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        <FaWhatsapp className="w-8 h-8 text-white" />
      </a>
    </div>
  );
};

export default Home;
