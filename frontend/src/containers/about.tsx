import React from 'react';

const AboutPageVariation3 = () => {
  const problemsSolutions = [
    {
      problem: "Recipes scattered across notebooks, apps, and emails",
      solution: "Unified digital platform with organized collections"
    },
    {
      problem: "Family recipes lost when passed between generations",
      solution: "Permanent digital preservation with sharing controls"
    },
    {
      problem: "No community for home cooks to share and learn",
      solution: "Built-in community features with privacy respect"
    },
    {
      problem: "Complex recipe apps with unnecessary features",
      solution: "Simple, focused interface for recipe management"
    }
  ];

  const values = [
    {
      principle: "Simplicity First",
      description: "Clean, intuitive interface that doesn't overwhelm"
    },
    {
      principle: "Privacy by Design",
      description: "You control exactly what you share and with whom"
    },
    {
      principle: "Community Focused",
      description: "Built around real cooking experiences and sharing"
    },
    {
      principle: "Preservation Minded",
      description: "Tools designed to protect culinary heritage"
    }
  ];

  const sections = [
    {
      title: "Why Recipe Book Exists",
      content: "Born from the frustration of losing handwritten family recipes and the desire to preserve culinary heritage in a digital age."
    },
    {
      title: "Our Mission",
      content: "To create a permanent, accessible home for recipes that might otherwise be lost, while building a community around shared food traditions."
    },
    {
      title: "What We Provide",
      content: "A clean, intuitive platform for recipe documentation, categorization, and sharing with privacy controls and community features."
    },
    {
      title: "For Whom",
      content: "Home cooks, professional chefs, families preserving traditions, and anyone who believes recipes are worth preserving."
    }
  ];

  const offerings = [
    {
      icon: "✍️",
      title: "Digital Recipe Cards",
      items: ["Easy formatting", "Ingredient lists", "Step-by-step instructions", "Cooking notes"]
    },
    {
      icon: "📚",
      title: "Organized Collections",
      items: ["Categories & tags", "Meal types", "Dietary restrictions", "Family collections"]
    },
    {
      icon: "🌐",
      title: "Sharing Options",
      items: ["Private recipes", "Family sharing", "Public community", "Export capabilities"]
    }
  ];

  const imageSections = [
    {
      title: "Organized Recipe Collections",
      description: "Keep all your recipes in one beautifully organized digital space",
      imagePosition: "left"
    },
    {
      title: "Share with Family & Friends",
      description: "Preserve family traditions by sharing recipes across generations",
      imagePosition: "right"
    },
    {
      title: "Community Inspiration",
      description: "Discover new recipes and cooking techniques from home cooks worldwide",
      imagePosition: "left"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-gray-900 mb-6">Recipe Book</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A digital sanctuary for your culinary creations, preserving traditions and building community through shared recipes.
          </p>
        </div>

        {/* Main Hero Image */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="aspect-[21/9] bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">📚</span>
                <span className="text-gray-500 text-lg">Your Digital Recipe Collection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Core Purpose Sections */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Our Purpose & Vision</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-medium text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Gallery Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Experience Recipe Book</h2>
          <div className="space-y-16">
            {imageSections.map((section, index) => (
              <div key={index} className={`flex flex-col ${section.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}>
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-5xl mb-3 block">{index === 0 ? '🍳' : index === 1 ? '👨‍👩‍👧‍👦' : '🌍'}</span>
                        <span className="text-gray-400 text-sm">{section.title} Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4">{section.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{section.description}</p>
                  <ul className="text-gray-500 space-y-2">
                    {index === 0 && (
                      <>
                        <li>• Digital recipe cards with beautiful formatting</li>
                        <li>• Categorize by cuisine, meal type, or occasion</li>
                        <li>• Quick search and filtering capabilities</li>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <li>• Share recipes with specific family members</li>
                        <li>• Create family-only recipe collections</li>
                        <li>• Preserve heirloom recipes for future generations</li>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <li>• Discover recipes from home cooks worldwide</li>
                        <li>• Learn new techniques and ingredients</li>
                        <li>• Join cooking communities and groups</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem/Solution Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Solving Real Cooking Challenges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Common Problems We Solve</h3>
              <div className="space-y-6">
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="border-l-4 border-red-200 pl-4 py-2">
                    <p className="text-gray-600">{item.problem}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">Our Thoughtful Solutions</h3>
              <div className="space-y-6">
                {problemsSolutions.map((item, index) => (
                  <div key={index} className="border-l-4 border-green-200 pl-4 py-2">
                    <p className="text-gray-600">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features & Offerings */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">What Recipe Book Provides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((offering, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-6 text-center">{offering.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-6 text-center">{offering.title}</h3>
                <ul className="text-gray-600 space-y-3">
                  {offering.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <span className="text-green-500 mr-3 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Our Guiding Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 border border-gray-200 text-center hover:shadow-md transition-all duration-300">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">
                    {index === 0 ? '✨' : index === 1 ? '🔒' : index === 2 ? '👥' : '💾'}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 mb-3">{value.principle}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Mission & Image */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Side */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-12 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl mb-6 block">❤️</span>
                  <p className="text-gray-600 text-lg">Every recipe tells a story worth preserving</p>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-12 flex items-center">
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-6">Our Promise to You</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    We provide a simple, respectful platform where your recipes are safe, organized, 
                    and ready to be shared—exactly how and when you want.
                  </p>
                  <p className="text-gray-500">
                    Because in every recipe, there's a piece of history, a memory, and love worth passing on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <h2 className="text-2xl font-light text-gray-900 mb-4">Ready to Preserve Your Recipes?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks who are already preserving their culinary heritage and sharing their cooking journey.
            </p>
            <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300">
              Start Your Recipe Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageVariation3;