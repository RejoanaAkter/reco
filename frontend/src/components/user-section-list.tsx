"use client";

import AnimatedBorder from "@/components/animatedTitle";
import { useUsers } from "@/hook/userUsers";
import useRecipes from "@/hook/useRecipes";
import { motion } from "framer-motion";
import { LuChefHat } from "react-icons/lu";
import UserCard from "./userCard";
import UserCardSkeleton from "@/loader/userCardSkeleton";


export default function UserList() {
  const { users = [], loading, error } = useUsers();
  const { recipes = [] } = useRecipes();

  /* --------------------------------
     Count recipes per user
  ----------------------------------*/
  const recipeCountByUser = recipes.reduce<Record<string, number>>(
    (acc, recipe) => {
      const userId = recipe?.user?._id;
      if (!userId) return acc;
      acc[userId] = (acc[userId] || 0) + 1;
      return acc;
    },
    {}
  );

  /* --------------------------------
     Top 3 users by recipe count
  ----------------------------------*/
  const topUsers = [...users]
    .map((user) => ({
      ...user,
      recipeCount: recipeCountByUser[user._id] || 0,
    }))
    .sort((a, b) => b.recipeCount - a.recipeCount)
    .slice(0, 3);

  /* --------------------------------
     Animation
  ----------------------------------*/
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  /* --------------------------------
     Error State
  ----------------------------------*/
  if (error) {
    return (
      <div className="py-16 text-center text-gray-600">
        {error}
      </div>
    );
  }

  return (
    <section className="py-6 bg-white w-full">
      {/* Title */}
      <div className="px-18">
        <h2 className="text-xl font-semibold mb-1 text-gray-900 font-serif italic flex gap-2">
          <LuChefHat size={24} className="text-amber-700" />
          Top Contributors
        </h2>
        <AnimatedBorder />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))
            : topUsers.map((user) => (
                <UserCard
                  key={user._id}
                  user={user}
                  recipeCount={user.recipeCount}
                />
              ))}
        </motion.div>

      </div>
    </section>
  );
}
