'use client';

import { useUsers } from "@/components/userUsers";
import getImageUrl from "@/settings/utils";
import { GiChefToque, GiCookingPot } from "react-icons/gi";
import { motion } from "framer-motion";
import { FaStar, FaUtensils, FaLeaf, FaHeart } from "react-icons/fa";

export default function UserList() {
  const { users, loading, error } = useUsers();

  // Animation variants
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
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (loading)
    return (
      <div className="py-20 flex items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50/30">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <GiChefToque className="text-amber-700" size={20} />
          </motion.div>
          <p className="text-amber-800/70 text-sm font-light">Loading chefs...</p>
        </div>
      </div>
    );
  
  if (error)
    return (
      <div className="py-20 text-center text-amber-700/80 font-light">
        {error}
      </div>
    );

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-amber-50/20 to-rose-50/30 py-16 px-6">
      {/* Background Elements */}
      <div className="absolute top-10 left-5 w-60 h-60 bg-amber-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-5 w-72 h-72 bg-rose-200/10 rounded-full blur-2xl"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-20 left-10 text-amber-300/30 text-3xl"
      >
        <FaLeaf />
      </motion.div>
      <motion.div
        variants={floatingVariants}
        animate="float"
        transition={{ delay: 1 }}
        className="absolute bottom-20 right-12 text-rose-300/20 text-2xl"
      >
        <FaUtensils />
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header - Compact */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-200/80 to-amber-300/80 rounded-2xl shadow-md border border-amber-300/30 mb-3"
          >
            <GiChefToque className="text-amber-700/80" size={24} />
          </motion.div>
          
          <h1 className="text-xl font-light text-slate-800 mb-2">
            Culinary <span className="font-serif italic text-amber-600/90">Artists</span>
          </h1>
          
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mb-4"></div>
          
          <p className="text-black text-sm max-w-2xl mx-auto leading-relaxed font-light">
            Meet the chefs behind our exquisite recipes
          </p>
        </motion.div>

        {/* Chef Cards - Compact */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {users.slice(0, 3).map((user, index) => (
            <motion.div
              key={user._id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Main Card - Compact */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-white/60 hover:border-amber-200/40">
                {/* Background Pattern */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50/20 to-rose-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Chef Avatar - Smaller */}
                <div className="relative mb-6">
                  <div className="relative w-24 h-24 mx-auto">
                    {/* Outer Orbital Ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 border border-amber-200/20 rounded-full"
                    />
                    
                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={getImageUrl(user.image)}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Floating Badge - Smaller */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute -bottom-1 -right-1 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-xl p-2 shadow-md"
                    >
                      <GiChefToque size={12} />
                    </motion.div>
                  </div>
                </div>

                {/* Chef Information - Compact */}
                <div className="text-center space-y-4 relative z-10">
                  {/* Name and Title */}
                  <div>
                    <h3 className="text-lg font-medium text-slate-800 mb-1">
                      {user.name}
                    </h3>
                    <div className="flex justify-center items-center gap-1 text-amber-600/70">
                      <FaStar className="text-amber-400" size={10} />
                      <span className="text-xs font-light uppercase">Chef</span>
                      <FaStar className="text-amber-400" size={10} />
                    </div>
                  </div>

                  {/* Specialty - Compact */}
                  <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-xl border border-amber-200/30">
                    <GiCookingPot className="text-amber-600/60 text-sm" />
                    <span className="text-xs text-amber-700/70 font-medium">
                      {user.specialty || "Contemporary"}
                    </span>
                  </div>

                  {/* Bio - Shorter */}
                  <p className="text-slate-600/70 text-sm leading-relaxed font-light line-clamp-2">
                    {user.bio || "Creating memorable dining experiences through innovative techniques."}
                  </p>

                  {/* Stats - Compact */}
                  <div className="flex justify-around pt-4 border-t border-amber-100/30">
                    {[
                      { value: "50+", label: "Recipes", icon: <FaUtensils className="text-amber-500/60" size={10} /> },
                      { value: "4.9", label: "Rating", icon: <FaStar className="text-amber-500/60" size={10} /> },
                      { value: "5Y", label: "Exp", icon: <FaHeart className="text-rose-400/60" size={10} /> }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {stat.icon}
                          <div className="text-sm font-light text-slate-700/80">{stat.value}</div>
                        </div>
                        <div className="text-xs text-slate-500/50 font-light">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* View Profile Button - Smaller */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 bg-transparent border border-amber-400/40 text-amber-700/70 hover:bg-amber-500 hover:text-white hover:border-amber-500 px-4 py-2 rounded-xl text-sm font-light transition-all duration-300"
                  >
                    View Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Chefs Link - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="/chefs" 
            className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-amber-200/30 text-amber-700/70 hover:text-amber-800 hover:bg-white/70 px-6 py-3 rounded-xl text-sm font-light transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View All Chefs</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-amber-600/60"
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}