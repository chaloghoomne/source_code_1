'use client'

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountryId, getselectedCountry } from "../../redux/actions/package-id-actions";
import ImagePlaceholder from "./ImagePlaceholder";
import { useRouter } from 'next/navigation'
import { REACT_URL } from "@/api-integration/urlVariable";

const VisaCard = ({ image, city, country, price, rating, description, id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [finalValue, setFinalValue] = useState(30);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleRedirect = (id, name) => {
    dispatch(getselectedCountry(name));
    dispatch(getCountryId(id));
    router.push(`${REACT_URL}/visa-types/${id}`);
  };

  const handleseeMore = (value) => {
    setFinalValue(value);
  };

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div className="w-full md:max-w-xl items-start self-start cursor-pointer bg-white rounded-e-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <div onClick={() => handleRedirect(id, country)} className="relative ">
        <div className="relative w-full">
          {imageLoaded ? (
            <img
              className="w-full rounded-t-brand rounded-2xl object-cover md:h-[200px] md:transition-all md:ease-in-out 2xl:h-[200px] max-h-[200px]"
              src={image}
              alt={country}
            />
          ) : (
            <ImagePlaceholder />
          )}
          <div className="absolute inset-0 left-5 -z-10 w-[80%] rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 blur-md opacity-65"></div>
        </div>
      </div>
      <div className="w-full">
        <h3
          onClick={() => handleRedirect(id, country)}
          className="text-lg px-4 py-1 mt-2 poppins-seven font-bold"
        >
          {country}
        </h3>
        <div
          style={{ borderRadius: "0px 0px 16px 16px" }}
          className="flex items-center py-2 px-4 w-full bg-[#F7F7F780] justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm text-[#0C111F99]">{country}</span>
            <span className="text-md poppins-seven font-semibold">
              ₹{price}
            </span>
          </div>

          <button
            onClick={() => handleRedirect(id, country)}
            className="bg-gradient-to-r from-[#3180CA] to-[#7AC7F9] text-white py-2 px-6 rounded-full self-center text-xs shadow-lg poppins-five shadow-[#a4d3f3] transition-colors duration-300"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
