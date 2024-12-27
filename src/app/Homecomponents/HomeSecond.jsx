'use client'

import React, { forwardRef, useEffect, useState } from "react";
import VisaCard from "./VisaCard";
import { MdKeyboardArrowRight } from "react-icons/md";
import { fetchDataFromAPI } from "@/api-integration/commonAPi";
import { BASE_URL,NetworkConfig } from "@/api-integration/urlVariable";
import { useSelector } from "react-redux";

const HomeSecond = forwardRef((props, ref) => {
  const [packages, setPackages] = useState([]);
  const [data, setData] = useState();
  const [finalValue, setFinalVlaue] = useState(12);
  const inputValue = useSelector(
    (state) => state.SearchPackageReducer.inputValue
  );


  const viewAll = () => {
    setFinalVlaue(10000);
  };

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

  const showlimited = () => {
    setFinalVlaue(12);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}places?country=${inputValue}`
        );
        if (response) {
          setPackages(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [inputValue]);

  return (
    <div ref={ref} className="py-[40px] px-5">
      {/* <h1 className="text-3xl poppins-six font-bold text-center mb-12">
        {data?.heading || "World Best Visas Requested Countries"}
      </h1> */}
      {/* <h2 className="text-[22px] text-orange-500 text-center poppins-five mb-2">
      {data?.title}
      </h2> */}
      <h1 className="text-5xl poppins-six text-center  font-bold mb-[40px]">
        {data?.heading}
      </h1>
      
      <div className="max-w-8xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {packages?.map((visa, index) => (
          <VisaCard
            key={index}
            image={visa?.image}
            city={visa?.city}
            country={visa?.country}
            price={visa?.price}
            rating={visa?.rating}
            id={visa?._id}
            description={visa?.description}
          />
        ))}
      </div>
      {finalValue > 12 ? (
        <h1
          onClick={finalValue === 12 ? viewAll : showlimited}
          className="text-2xl font-bold poppins-seven flex justify-center items-center cursor-pointer mt-10 text-yellow-500 text-center gap-2  mb-8"
        >
          {finalValue === 12 ? "View All " : "Hide"}{" "}
          <div className="self-center items-center flex ">
            {/* <MdKeyboardArrowRight
            size={25}
            style={{ marginTop: "4px", paddingLeft: "-3px" }}
            color="orange"
          />{" "}
          <MdKeyboardArrowRight
            size={22}
            style={{ marginTop: "4px" }}
            color="orange"
          />{" "}
          <MdKeyboardArrowRight
            size={20}
            style={{ marginTop: "4px" }}
            color="orange"
          /> */}
          </div>
        </h1>
      ) : (
        <h1 className="text-2xl font-bold poppins-seven flex justify-center items-center cursor-pointer  text-yellow-500 text-center gap-2  mb-8"></h1>
      )}
    </div>
  );
});

export default HomeSecond;
