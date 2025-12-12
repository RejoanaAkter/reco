import { ReactNode } from "react";
import { BookOpen } from "lucide-react";

interface SectionHeaderProps {
  icon?: ReactNode; // default icon if not provided (BookOpen)
  title?: string; // default title if not provided (Instructions)
  width?: string; // optional width
  titleColor?: string; // customizable title color
  titleSize?: string; // customizable title text size
}

export function SmallTitle({ icon, title, width = "w-full", titleColor = "text-gray-900",
     titleSize = "text-lg" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3  ${width}`}>
      <div className="w-8 h-8 bg-gray-50 border rounded flex items-center justify-center">
        {icon ?? (<BookOpen size={16} className= "text-amber-700" />)}
      </div>
      <h2 className={`${titleSize} font-semibold ${titleColor}`}>{title ?? "Instructions"}</h2>
    </div>
  );
}

