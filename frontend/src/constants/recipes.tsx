  import AnimatedBorder from "@/components/animatedTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { 
  IoRestaurant, 
  IoSchool, 
  IoPeople, 
  IoDocumentText, 
  IoLayers, 
  IoShareSocial 
} from "react-icons/io5";


 export const problemsSolutions = [
    {
      problem: "Recipes scattered across notebooks, apps, and emails",
      solution: "Unified digital platform with organized collections",
    },
    {
      problem: "Family recipes lost when passed between generations",
      solution: "Permanent digital preservation with sharing controls",
    },
    {
      problem: "No community for home cooks to share and learn",
      solution: "Built-in community features with privacy respect",
    },
    {
      problem: "Complex recipe apps with unnecessary features",
      solution: "Simple, focused interface for recipe management",
    },
  ];

 export const values = [
    {
      principle: "Simplicity First",
      description: "Clean, intuitive interface that doesn't overwhelm",
      icon: <IoLayers className="text-amber-600 text-2xl" />,
    },
    {
      principle: "Privacy by Design",
      description: "You control exactly what you share and with whom",
      icon: <IoDocumentText className="text-amber-600 text-2xl" />,
    },
    {
      principle: "Community Focused",
      description: "Built around real cooking experiences and sharing",
      icon: <IoPeople className="text-amber-600 text-2xl" />,
    },
    {
      principle: "Preservation Minded",
      description: "Tools designed to protect culinary heritage",
      icon: <IoSchool className="text-amber-600 text-2xl" />,
    },
  ];

 export const offerings = [
    {
      icon: <IoDocumentText className="text-amber-600 text-4xl mx-auto mb-4" />,
      title: "Digital Recipe Cards",
      items: [
        "Easy formatting",
        "Ingredient lists",
        "Step-by-step instructions",
        "Cooking notes",
      ],
    },
    {
      icon: <IoLayers className="text-amber-600 text-4xl mx-auto mb-4" />,
      title: "Organized Collections",
      items: [
        "Categories & tags",
        "Meal types",
        "Dietary restrictions",
        "Family collections",
      ],
    },
    {
      icon: <IoShareSocial className="text-amber-600 text-4xl mx-auto mb-4" />,
      title: "Sharing Options",
      items: [
        "Private recipes",
        "Family sharing",
        "Public community",
        "Export capabilities",
      ],
    },
  ];

 export const sections = [
    {
      icon: <IoRestaurant className="inline text-amber-600 mr-2" />,
      title: "Why Recipe Book Exists",
      content:
        "Born from the frustration of losing handwritten family recipes and the desire to preserve culinary heritage in a digital age.",
    },
    {
      icon: <IoSchool className="inline text-amber-600 mr-2" />,
      title: "Our Mission",
      content:
        "To create a permanent, accessible home for recipes that might otherwise be lost, while building a community around shared food traditions.",
    },
    {
      icon: <IoLayers className="inline text-amber-600 mr-2" />,
      title: "What We Provide",
      content:
        "A clean, intuitive platform for recipe documentation, categorization, and sharing with privacy controls and community features.",
    },
    {
      icon: <IoPeople className="inline text-amber-600 mr-2" />,
      title: "For Whom",
      content:
        "Home cooks, professional chefs, families preserving traditions, and anyone who believes recipes are worth preserving.",
    },
  ];