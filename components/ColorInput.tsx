import React, { useEffect, useRef } from 'react';

interface ColorInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  isHighlighted?: boolean;
}

export const ColorInput: React.FC<ColorInputProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  description,
  isHighlighted 
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      id={id}
      ref={rootRef}
      className={`
        flex items-center justify-between p-2 rounded-lg transition-all duration-500 group border
        ${isHighlighted 
          ? 'bg-indigo-900/40 border-indigo-500 ring-1 ring-indigo-500' 
          : 'border-transparent hover:bg-neutral-800/50'
        }
      `}
    >
      <div className="flex flex-col overflow-hidden">
        <span className={`text-xs font-medium transition-colors font-mono ${isHighlighted ? 'text-indigo-200' : 'text-neutral-300 group-hover:text-white'}`}>
          {label}
        </span>
        {description && (
          <span className="text-[10px] text-neutral-500 hidden group-hover:block transition-all truncate">
            {description}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] text-neutral-500 font-mono uppercase">
          {value}
        </span>
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-600 shadow-sm cursor-pointer hover:scale-110 transition-transform">
          <input
            type="color"
            value={value || "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] p-0 m-0 cursor-pointer border-0"
          />
        </div>
      </div>
    </div>
  );
};