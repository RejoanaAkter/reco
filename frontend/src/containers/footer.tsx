export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🍳</span>
              </div>
              <div>
                <h3 className="text-2xl font-light tracking-tight">Recipe<span className="font-serif italic">Hub</span></h3>
                <p className="text-amber-200 text-sm font-light">Culinary Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm font-light max-w-xs">
              Where passion meets flavor. Discover, create, and share extraordinary culinary experiences that bring people together.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              {['📘', '📷', '🐦', '📺'].map((icon, index) => (
                <button 
                  key={index}
                  className="w-10 h-10 bg-white/10 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/10"
                >
                  <span className="text-sm">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-amber-100 relative inline-block">
              Explore
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Newest Recipes', emoji: '🆕' },
                { name: 'Categories', emoji: '📁' },
                { name: 'Featured Chefs', emoji: '👨‍🍳' },
                { name: 'Cooking Tips', emoji: '💡' },
                { name: 'Seasonal Specials', emoji: '🍂' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`/${link.name.toLowerCase().replace(' ', '')}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-all duration-300 group py-1"
                  >
                    <span className="text-sm opacity-70 group-hover:opacity-100">{link.emoji}</span>
                    <span className="font-light group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-amber-100 relative inline-block">
              Resources
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500"></div>
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Cooking Guides', emoji: '📚' },
                { name: 'Video Tutorials', emoji: '🎥' },
                { name: 'Ingredient Wiki', emoji: '🥬' },
                { name: 'Kitchen Tools', emoji: '🔪' },
                { name: 'Recipe Converter', emoji: '⚖️' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`/${link.name.toLowerCase().replace(' ', '')}`}
                    className="flex items-center gap-3 text-gray-300 hover:text-amber-300 transition-all duration-300 group py-1"
                  >
                    <span className="text-sm opacity-70 group-hover:opacity-100">{link.emoji}</span>
                    <span className="font-light group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 text-amber-100 relative inline-block">
              Stay Updated
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-amber-500"></div>
            </h4>
            <p className="text-gray-300 text-sm font-light mb-6 leading-relaxed">
              Join our culinary community! Get weekly recipes, cooking tips, and exclusive content delivered to your inbox.
            </p>
            
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  ✉️
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <span>Subscribe Now</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </form>

            {/* Trust Badge */}
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-200">Trusted by 10K+ Home Chefs</p>
                  <p className="text-xs text-gray-400">Join our growing community</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} RecipeHub. Crafted with ❤️ for food lovers worldwide.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
                <a 
                  key={index}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-amber-300 transition-colors duration-300 font-light"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-amber-500/20 text-4xl animate-bounce">🍃</div>
      <div className="absolute top-10 right-10 text-amber-500/20 text-4xl animate-pulse">✨</div>
    </footer>
  );
};