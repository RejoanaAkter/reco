import React from "react";
import { FaUtensils, FaLeaf, FaClock, FaFireAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { RiBowlFill } from "react-icons/ri";
import { motion } from "framer-motion";

interface Tip {
  id: number;
  icon: JSX.Element;
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
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section
      className="relative bg-fixed bg-center bg-cover w-full pt-16 pb-28"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1705056547423-de4ef0f85bf7?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMHdoaXRlJTIwYmFja2tncm91bmR8ZW58MHx8MHx8')",
      }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="flex justify-center">
        <div className="relative max-w-screen-2xl mx-auto w-full">
          <div className="flex justify-center gap-4 mb-12">
            <RiBowlFill size={32} color="#fff" />
            <h2 className="text-3xl font-bold text-white text-center">
              Professional Cooking Tips
            </h2>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-7xl mx-auto px-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tips.map((tip) => (
                <motion.div
                  key={tip.id}
                  variants={cardVariants}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/20 hover:border-amber-200/30 hover:scale-105"
                >
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className="relative flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {tip.icon}
                      </div>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center shadow-md">
                      <FaStar className="text-amber-500 text-xs" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4 relative z-10">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight">
                      {tip.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      {tip.description}
                    </p>

                    {/* Learn More Button */}
                    <button className="w-full mt-4 bg-transparent border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white py-2 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                      <span>Learn More</span>
                      <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300 text-xs" />
                    </button>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-amber-500/20 to-transparent rounded-tr-2xl rounded-bl-2xl"></div>
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
                "Good cooking is an art, but great cooking is a science that anyone can master with the right techniques."
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};