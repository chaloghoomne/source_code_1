'use client'

import React, { useEffect, useState } from "react";
import homefirst from "../../assets/homefirst.png";
import { fetchDataFromAPI } from "@/api-integration/commonAPi";
import { BASE_URL,NetworkConfig } from "@/api-integration/urlVariable";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { searchPackageByValue } from "../../redux/actions/package-id-actions";

const HomeFirst = ({ homeSecondRef }) => {
  const [data, setData] = useState();
  const [inputValue, setInputValue] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_HEADING_BY_ID}/Main`
        );
        if (response) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);



  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    dispatch(searchPackageByValue(e.target.value));

    if (homeSecondRef && homeSecondRef.current) {
      const targetPosition = homeSecondRef.current.offsetTop;

      const scrollPosition = targetPosition - window.innerHeight / 3;
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col shadow-md shadow-[#00000036] mt-10 md:flex-row items-center gap-4 md:justify-between h-auto md:h-auto px-6  bg-gradient-to-r from-[#3180CA] to-[#7AC7F9]">
      <div className="md:flex  hidden text-white flex-col items-start  w-full md:w-[55%] text-left p-2 md:pt-20 md:pb-4 ">
        <h1
          style={{ textShadow: "1px 0px 0px rgba(0,0,0,0.8)" }}
          className="text-5xl  md:w-[90%] flex flex-col poppins-six gap-3  md:text-[2.8rem] font-bold mb-4"
        >
          {data?.title || "Get the VISA simple, fast & Reliable"}<br />
          <p className="text-2xl ">Get your visa with Chalo Ghoomne</p>
        </h1>
        <p
          style={{ textShadow: "1px 0px 0px rgba(0,0,0,0.8)" }}
          className="text-md relative top-5 poppins-six md:w-[80%] font-bold md:text-md mb-10"
        >
          {data?.description}
        </p>
        <div className="flex items-center px-8 flex-wrap gap-5 p-3 bg-white/70 rounded-lg ">
          <div className="flex justify-start px-5 bg-white border border-gray-300  rounded-lg  items-center">
            <CiSearch size={23} color="black" />
            <input
              type="text"
              placeholder="Where to....."
              value={inputValue}
              onChange={(e) => handleInputValue(e)}
              className="flex-grow focus:outline-none w-40 md:w-50 lg:w-56 text-black p-[6px] "
            />
          </div>
          <button className="bg-[#F26337] min-w-28 text-white text-sm p-[8px] rounded-full">
            Get Started
          </button>
        </div>
        <p className="mt-2 poppins-two text-[12px]">
          {data?.shortDescription ||
            `*Exclusive offers on VISA service, Air Tickets, and Travel Packages.`}
        </p>
      </div>
      <div className="flex items-center md:justify-end  justify-center w-full md:w-[45%] p-2 md:px-4">
        <img src={homefirst.src} alt="Travel Image" className="max-w-[80%] relative top-7" />
      </div>
      <div className="flex md:hidden text-white  flex-col items-start justify-center w-full md:w-1/2 text-left p-2 md:p-4">
        <h1 className="text-2xl poppins-six md:text-5xl font-bold mb-4">
        {data?.title || "Get the VISA simple, fast & Reliable"}<br />
        <p className="text-2xl ">{data?.subHeading||`Get your visa with Chalo Ghoomne`}</p>
        </h1>
        <p className="text-md poppins-three md:text-xl mb-6">
        {data?.description}
        </p>
        <div className="flex items-center flex-wrap p-4 justify-between gap-2 bg-white/70 rounded-lg w-full">
          <div className="flex justify-start w-full px-5 bg-white border border-gray-300  rounded-lg  items-center">
            <CiSearch size={23} color="black" />
            <input
              type="text"
              placeholder="Where to....."
              value={inputValue}
              onChange={(e) => handleInputValue(e)}
              className="flex-grow focus:outline-none w-40 md:w-56 lg:w-72 text-black p-1"
            />
          </div>
          <button className="bg-[#F26337] w-full text-white p-2  rounded-md">
            Get Started
          </button>
        </div>
        <p className="my-2 poppins-three">
        {data?.shortDescription ||
            `*Exclusive offers on VISA service, Air Tickets, and Travel Packages.`}
        </p>
      </div>
    </div>
  );
};

export default HomeFirst;
