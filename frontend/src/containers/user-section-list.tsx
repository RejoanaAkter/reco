'use client';

import UserCard from "@/components/userCard";
import { useUsers } from "@/components/userUsers";
import bgImage from "@/public/your-bg.jpg"; // make sure to import your image properly
import Image from "next/image";
import { GiCook } from "react-icons/gi";

const UserList = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <div className="text-center py-10 text-lg text-gray-600">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="w-full relative  flex items-center justify-center h-full">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Image
          src={'/h.jpg'}
          alt="Background"
          fill
          className="object-cover"
          quality={80}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 w-2/3 text-white text-center ">
        <div className="mb-24">
                  <span role="img" aria-label="users" className="flex justify-center"> <GiCook size={32} /></span>
          <div className="flex items-center justify-center w-full max-w-3xl mx-auto relative mt-2">
            <span className="absolute top-1/2 left-0 w-1/3 border-t border-yellow-500 -z-10"></span>
            <div className=" px-4 text-xl font-bold flex items-center gap-3">
              Our Amazing Users
            </div>
              <span className="absolute top-1/2 right-0 w-1/3 border-t border-yellow-500 -z-10"></span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 ">
          {users.slice(0, 3).map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;
