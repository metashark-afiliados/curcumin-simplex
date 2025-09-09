// RUTA: src/components/layout/LanguageSwitcher.tsx
/**
 * @file Language Switcher Component
 * @description Renders a dropdown menu for selecting the campaign language.
 *
 * @author Your Name
 * @version 1.0.0
 */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

const availableLanguages: Language[] = [
  { code: "en-US", name: "English (USA)" },
  { code: "en-CA", name: "English (CAN)" },
  { code: "fr-CA", name: "Français (CAN)" },
  { code: "pt-BR", name: "Português (BRA)" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLangCode = pathname.split('/')[3] || 'en-US';
  const currentLanguage = availableLanguages.find(lang => lang.code === currentLangCode) || availableLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split('/');
    segments[3] = langCode; // Reemplaza el locale en la URL
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Change language, current language is ${currentLanguage.name}`}
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left transition-colors ${
                  currentLangCode === lang.code
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}