// app/components/StatCard.tsx
import React from "react";
import { LucideIcon } from "lucide-react"; // optional if using Lucide icons

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  footer?: string;
}

const Card = ({ title, value, icon, footer }: CardProps) => {
  return (
    <div className="w-2/5 bg-white border border-gray-300 rounded-md shadow-md p-4 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-semibold">{value}</p>
        </div>
        {icon && <div className="text-black text-4xl">{icon}</div>}
      </div>
      {footer && <p className="text-xs text-gray-500 mt-2">{footer}</p>}
    </div>
  );
};
export default Card