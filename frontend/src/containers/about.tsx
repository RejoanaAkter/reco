import React from "react";
import { Utensils, Leaf, Heart } from "lucide-react";

const AboutScreen = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-10 flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 text-center relative overflow-hidden">
        {/* Decorative background accents */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-100 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full blur-2xl"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6">
          About Our Recipes 🍲
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          At <span className="font-semibold text-orange-500">Flavorful Creations</span>, 
          we believe food is more than just a meal – it's a story, a tradition, 
          and a celebration. Our recipes bring together vibrant flavors, 
          wholesome ingredients, and a touch of love to make every bite memorable.
        </p>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-orange-50/90 rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <Utensils className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Tasty</h3>
            <p className="text-gray-600 text-sm">
              Recipes tested to satisfy your cravings while keeping things fun
              and flavorful.
            </p>
          </div>

          <div className="bg-green-50/90 rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <Leaf className="w-10 h-10 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-green-600 mb-2">Fresh</h3>
            <p className="text-gray-600 text-sm">
              We use fresh, seasonal ingredients to make your dishes shine with
              natural goodness.
            </p>
          </div>

          <div className="bg-pink-50/90 rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
            <Heart className="w-10 h-10 text-pink-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Made with Love</h3>
            <p className="text-gray-600 text-sm">
              Every recipe is crafted with care to bring joy and warmth to your
              dining table.
            </p>
          </div>
        </div>

        <p className="text-gray-700 text-base max-w-2xl mx-auto mb-8">
          Whether it’s a quick snack, a hearty dinner, or a festive feast, our
          curated recipes are here to inspire your kitchen adventures and help
          you cook with confidence.
        </p>

        <button className="px-8 py-3 bg-orange-500 text-white font-medium rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
          🍴 Explore Recipes
        </button>
      </div>
    </div>
  );
};

export default AboutScreen;
