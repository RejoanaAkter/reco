"use client";

import UserCard from "@/components/userCard";
import { useUsers } from "@/components/userUsers";

const UserList = () => {
  const { users, loading, error } = useUsers();

  if (loading) return <div className="text-center py-10 text-lg text-gray-600">Loading users...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="bg-gradient-to-b from-gray-100 via-amber-50 to-amber-100 min-h-screen py-20 px-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12 flex justify-center items-center gap-2">
        <span>👥</span> Our Amazing Users
      </h2>

      {/* ✅ Centered container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserList;
