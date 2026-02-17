// components/common/PrimaryButton.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface PrimaryButtonProps {
  label: string;
  href?: string;
  type?: "button" | "submit";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function PrimaryButton({
  label,
  href,
  type = "button",
  fullWidth = false,
  className = "",
  disabled = false
}: PrimaryButtonProps) {
  const router = useRouter();
  const locale = useLocale();

  const handleClick = () => {
    if (disabled) return;
    if (href) {
      // Add locale prefix if not already present
      const isExternal = href.startsWith('http') || href.startsWith('//');
      // const hasLocale = href.startsWith(`/${locale}/`) || href.startsWith('/vi/') || href.startsWith('/en/');
      const hasLocale = href.startsWith('/vi') || href.startsWith('/en'); // Simplification or keep original regex if strict
      // Original logic seemed to check for /locale/

      // Let's stick to original behavior as closely as possible or improved
      const localizedHref = isExternal || hasLocale ? href : `/${locale}${href}`;
      router.push(localizedHref);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={href ? handleClick : undefined}
      className={`
        relative overflow-hidden group bg-[#001a41] text-white 
        px-8 py-4 text-sm font-bold uppercase tracking-widest 
        transition-all duration-500 shadow-xl
        ${fullWidth ? 'w-full' : 'w-auto'} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span className={`absolute inset-0 w-0 bg-yellow-500 transition-all duration-500 ease-out z-0 ${!disabled ? 'group-hover:w-full' : ''}`}></span>
      <span className="relative z-10 flex items-center justify-center gap-4">
        {label}
      </span>
    </button>
  );
}