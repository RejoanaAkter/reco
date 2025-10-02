'use client';

import UserCard from "@/components/userCard";
import { useUsers } from "@/components/userUsers";
import getImageUrl from "@/settings/utils";
import Image from "next/image";
import { GiCook } from "react-icons/gi";

const UserList = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <div className="text-center py-10 text-lg text-gray-400">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="relative w-full ">
      {/* Background image with soft overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={getImageUrl("/h.jpg")}
          alt="Background"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 opacity-80"></div>
      </div>

      {/* Section Heading */}
      <div className="text-center mb-16">
        <GiCook size={36} className="mx-auto text-gray-800 mb-2" />
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-24 bg-purple-300"></span>
          <h2 className="text-3xl font-bold text-gray-800">Our Amazing Users</h2>
          <span className="h-[1px] w-24 bg-purple-300"></span>
        </div>
        <p className="mt-2 text-gray-500 text-sm">Talented chefs sharing their favorite recipes</p>
      </div>

      {/* Users Cards */}
      <div className="flex flex-wrap justify-center gap-10 px-4 pt-8">
        {users.slice(0, 3).map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </section>
  );
};

export default UserList;
