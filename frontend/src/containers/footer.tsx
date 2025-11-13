export const Footer = () => {
  return (
    <footer className="w-full relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">🍳</span>
              </div>
              <div>
                <h3 className="text-xl font-light">Recipe<span className="font-serif italic">Hub</span></h3>
                <p className="text-amber-200 text-xs">Culinary Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Discover, create, and share extraordinary culinary experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-medium text-amber-100 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {['Recipes', 'Categories', 'Chefs', 'Tips', 'Specials'].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-medium text-amber-100 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2">
              {['Guides', 'Tutorials', 'Ingredients', 'Tools', 'Converter'].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-amber-300 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-medium text-amber-100 text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-gray-300 text-xs leading-relaxed">
              Get weekly recipes and cooking tips.
            </p>
            
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 text-sm backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1 group"
              >
                <span>Subscribe</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            <div className="text-gray-400 text-xs">
              © {new Date().getFullYear()} RecipeHub. Made with ❤️
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
                <a 
                  key={index}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-amber-300 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {['📘', '📷', '🐦'].map((icon, index) => (
                <button 
                  key={index}
                  className="w-8 h-8 bg-white/10 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 text-xs"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-4 left-4 text-amber-500/10 text-2xl">•</div>
      <div className="absolute top-4 right-4 text-amber-500/10 text-2xl">•</div>
    </footer>
  );
};