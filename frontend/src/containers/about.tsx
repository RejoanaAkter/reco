"use client";

import AnimatedBorder from "@/components/animatedTitle";
import { offerings, problemsSolutions, sections, values } from "@/constants/recipes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { 
  IoRestaurant, 
  IoSchool, 
  IoPeople, 
  IoDocumentText, 
  IoLayers, 
  IoShareSocial 
} from "react-icons/io5";

const AboutPageVariation3 = () => {
    const router = useRouter();


  return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-12 space-y-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-3xl font-serif italic text-gray-900 mb-4 flex items-center gap-2">
            <IoDocumentText className="text-amber-600" /> Our Purpose & Vision
          </h1>
          <AnimatedBorder />
          <p className="text-gray-700 mt-4 text-[14px] leading-relaxed">
            Recipe Book was born to preserve culinary heritage, simplify recipe
            management, and create a vibrant home-cooking community.
          </p>
        </div>
        <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden shadow-md border border-gray-200">
          <Image
            src={"/family.png"}
            alt="Our Purpose Visual"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
          >
            <h3 className="text-md font-medium text-gray-800 mb-2 flex items-center">
              {section.icon} {section.title}
            </h3>
            <p className="text-gray-600 text-[14px]">{section.content}</p>
          </div>
        ))}
      </div>

      {/* Problem & Solution Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center flex justify-center items-center gap-2">
            <IoRestaurant className="text-amber-600" /> Common Problems We Solve
          </h3>
          <ul className="space-y-3">
            {problemsSolutions.map((item, idx) => (
              <li
                key={idx}
                className="border-l-2 border-amber-600 pl-4 text-gray-700 text-sm"
              >
                {item.problem}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center flex justify-center items-center gap-2">
            <IoSchool className="text-amber-600" /> Our Thoughtful Solutions
          </h3>
          <ul className="space-y-3">
            {problemsSolutions.map((item, idx) => (
              <li
                key={idx}
                className="border-l-2 border-amber-600 pl-4 text-gray-700 text-sm"
              >
                {item.solution}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Offerings Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {offerings.map((offering, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300"
          >
            {offering.icon}
            <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
              {offering.title}
            </h3>
            <ul className="text-gray-700 space-y-1">
              {offering.items.map((item, iidx) => (
                <li key={iidx} className="flex items-start">
                  <span className="text-amber-700 text-md mr-2">•</span>
                  <p className="text-[13px]">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-md transition-all duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              {value.icon}
            </div>
            <h3 className="font-medium text-gray-900 mb-3">{value.principle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
          <h2 className="text-2xl font-light text-gray-900 mb-4 flex justify-center items-center gap-2">
            <IoDocumentText className="text-amber-600" /> Ready to Preserve Your Recipes?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of home cooks who are already preserving their culinary heritage and sharing their cooking journey.
          </p>
          <button  onClick={() => router.push("/createRecipe")}
           className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
            Start Your Recipe Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPageVariation3;
