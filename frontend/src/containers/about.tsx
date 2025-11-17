"use client";

import AnimatedBorder from "@/components/animatedTitle";
import getImageUrl from "@/settings/utils";
import Image from "next/image";
import React from "react";

const AboutPageVariation3 = () => {
  const problemsSolutions = [
    {
      problem: "Recipes scattered across notebooks, apps, and emails",
      solution: "Unified digital platform with organized collections",
    },
    {
      problem: "Family recipes lost when passed between generations",
      solution: "Permanent digital preservation with sharing controls",
    },
    {
      problem: "No community for home cooks to share and learn",
      solution: "Built-in community features with privacy respect",
    },
    {
      problem: "Complex recipe apps with unnecessary features",
      solution: "Simple, focused interface for recipe management",
    },
  ];

  const values = [
    {
      principle: "Simplicity First",
      description: "Clean, intuitive interface that doesn't overwhelm",
    },
    {
      principle: "Privacy by Design",
      description: "You control exactly what you share and with whom",
    },
    {
      principle: "Community Focused",
      description: "Built around real cooking experiences and sharing",
    },
    {
      principle: "Preservation Minded",
      description: "Tools designed to protect culinary heritage",
    },
  ];

  const sections = [
    {
      title: "Why Recipe Book Exists",
      content:
        "Born from the frustration of losing handwritten family recipes and the desire to preserve culinary heritage in a digital age.",
    },
    {
      title: "Our Mission",
      content:
        "To create a permanent, accessible home for recipes that might otherwise be lost, while building a community around shared food traditions.",
    },
    {
      title: "What We Provide",
      content:
        "A clean, intuitive platform for recipe documentation, categorization, and sharing with privacy controls and community features.",
    },
    {
      title: "For Whom",
      content:
        "Home cooks, professional chefs, families preserving traditions, and anyone who believes recipes are worth preserving.",
    },
  ];

  const offerings = [
    {
      icon: "✍️",
      title: "Digital Recipe Cards",
      items: [
        "Easy formatting",
        "Ingredient lists",
        "Step-by-step instructions",
        "Cooking notes",
      ],
    },
    {
      icon: "📚",
      title: "Organized Collections",
      items: [
        "Categories & tags",
        "Meal types",
        "Dietary restrictions",
        "Family collections",
      ],
    },
    {
      icon: "🌐",
      title: "Sharing Options",
      items: [
        "Private recipes",
        "Family sharing",
        "Public community",
        "Export capabilities",
      ],
    },
  ];

  const imageSections = [
    {
      title: "Organized Recipe Collections",
      description:
        "Keep all your recipes in one beautifully organized digital space",
      imagePosition: "left",
    },
    {
      title: "Share with Family & Friends",
      description:
        "Preserve family traditions by sharing recipes across generations",
      imagePosition: "right",
    },
    {
      title: "Community Inspiration",
      description:
        "Discover new recipes and cooking techniques from home cooks worldwide",
      imagePosition: "left",
    },
  ];

  return (
    <div className="min-h-screen py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Core Purpose Sections */}
        <div className="my-2">
          <h2 className="text-xl text-gray-900 text-start font-serif italic ">
            Our Purpose & Vision
          </h2>
          <AnimatedBorder />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
            {/* Left Side - Image */}
            <div className="col-span-1 lg:col-span-1">
              <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex justify-center relative overflow-hidden">
                  <Image
                    src={"/h.jpg"}
                    alt={"Our Purpose Visual"}
                    fill
                    className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="col-span-1 lg:col-span-2">
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-md font-medium text-gray-800 ">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 text-[14px] mt-1">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        {/* Problem/Solution Section */}
        <div className="mt-4">
          <h2 className="text-xl text-gray-900 text-start font-serif italic ">
            Solving Real Cooking Challenges
          </h2>
          <AnimatedBorder />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Common Problems We Solve
              </h3>
              <div className="space-y-4">
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="border-l-2 border-amber-600 pl-4">
                    <p className="text-gray-700 text-sm">{item.problem}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Our Thoughtful Solutions
              </h3>
              <div className="space-y-4">
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="border-l-2 border-amber-600 pl-4">
                    <p className="text-gray-700 text-sm">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features & Offerings */}
        <div className="mt-10">
          <h2 className="text-xl text-gray-900 text-start font-serif italic ">
            What Recipe Book Provides
          </h2>
          <AnimatedBorder />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-6 text-center">{offering.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                  {offering.title}
                </h3>
                <ul className="text-gray-700 space-y-1">
                  {offering.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-amber-700 text-md mr-3 ">•</span>
                      <p className="text-[13px]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-10">
          <h2 className="text-xl text-gray-900 text-start font-serif italic ">
            Our Guiding Principles
          </h2>
          <AnimatedBorder />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">
                    {index === 0
                      ? "✨"
                      : index === 1
                      ? "🔒"
                      : index === 2
                      ? "👥"
                      : "💾"}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-3">
                  {value.principle}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Mission & Image */}
        <div className="mt-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl mb-6 block">❤️</span>
                  <p className="text-gray-600 text-lg">
                    Every recipe tells a story worth preserving
                  </p>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-12 flex items-center">
                <div>
                  <h2 className="text-xl font-light text-gray-900 mb-4">
                    Our Promise to You
                  </h2>
                  <p className="text-gray-700 text-md leading-relaxed mb-4">
                    We provide a simple, respectful platform where your recipes
                    are safe, organized, and ready to be shared—exactly how and
                    when you want.
                  </p>
                  <p className="text-gray-700 text-[13px]">
                    Because in every recipe, there's a piece of history, a
                    memory, and love worth passing on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Ready to Preserve Your Recipes?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks who are already preserving their
              culinary heritage and sharing their cooking journey.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
              Start Your Recipe Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageVariation3;
