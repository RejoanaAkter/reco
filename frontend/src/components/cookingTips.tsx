import React from "react";
import {
  FaUtensils,
  FaLeaf,
  FaClock,
  FaFireAlt,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { RiBowlFill } from "react-icons/ri";
import { motion } from "framer-motion";
import AnimatedBorder from "@/components/animatedTitle";

interface Tip {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const tips: Tip[] = [
  {
    id: 1,
    icon: <FaUtensils className="w-7 h-7" />,
    title: "Knife Skills",
    description:
      "Learn how to chop, dice, and slice like a pro to save time and improve presentation.",
  },
  {
    id: 2,
    icon: <FaLeaf className="w-7 h-7" />,
    title: "Fresh Ingredients",
    description:
      "Use fresh, seasonal ingredients to enhance flavor and nutrition in every dish.",
  },
  {
    id: 3,
    icon: <FaClock className="w-7 h-7" />,
    title: "Time Management",
    description:
      "Plan your cooking steps efficiently to avoid long waits and overcooked meals.",
  },
  {
    id: 4,
    icon: <FaFireAlt className="w-7 h-7" />,
    title: "Perfect Heat",
    description:
      "Master controlling stove heat to cook evenly and avoid burning your dishes.",
  },
];

export const CookingTips = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};


  return (
    <section
      className="relative bg-fixed bg-center bg-cover w-full p-16 "
      style={{
        backgroundImage:
          "url('/recipeCover.png')",
      }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="flex justify-center">
        <div className="relative max-w-screen-2xl mx-auto w-full">
          <div className=" gap-4 mb-12">
            <h2 className="text-xl font-semibold mb-1 text-white text-start font-serif italic flex gap-2">
              <RiBowlFill className="text-white" size={24} />
              Professional Cooking Tips
            </h2>
            <AnimatedBorder borderColor='bg-white' />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {tips.map((tip) => (
                <motion.div
                  key={tip.id}
                  variants={cardVariants}
                  className="group relative bg-white rounded p-8 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100 hover:border-amber-100 overflow-hidden"
                >
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-500">
                    <div className="absolute inset-0 "></div>
                  </div>

                  {/* Elegant Border Accent */}
                  <div className="absolute inset-0 rounded border border-transparent  transition-all duration-700"></div>

                  {/* Floating Icon Container */}
                  <div className="relative flex justify-center mb-8">
                    <div className="relative">
                      {/* Icon Background with Gradient */}
                      <div className="w-20 h-20 border border-amber-500 rounded flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 relative overflow-hidden">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                        {/* Main Icon */}
                        <div className="text-amber-600 relative z-10">
                          {tip.icon}
                        </div>
                      </div>

                      {/* Floating Decorative Elements */}

                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-5 relative z-10">
                    {/* Title with Elegant Typography */}
                    <h3 className="text-xl font-light text-gray-900 leading-tight tracking-wide">
                      {tip.title}
                    </h3>

                    {/* Description with Better Readability */}
                    <p className="text-gray-600 text-sm leading-relaxed font-light tracking-wide">
                      {tip.description}
                    </p>
                  </div>

                  {/* Sophisticated Corner Accents */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-400/10 to-transparent rounded-tr-2xl rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-orange-400/5 to-transparent rounded-br-2xl rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300"></div>

                  {/* Subtle Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_50px_rgba(251,191,36,0.05)] group-hover:shadow-[inset_0_0_60px_rgba(251,191,36,0.08)] transition-shadow duration-500"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto"
            >
              <p className="text-gray-200 text-lg font-light">
                Good cooking is an art, but great cooking is a science that
                anyone can master with the right techniques.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
