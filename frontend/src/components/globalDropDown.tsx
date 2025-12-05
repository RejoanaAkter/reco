 
 import { createPortal } from "react-dom";
 import { AnimatePresence, motion } from "framer-motion";
 import { IoIosArrowDown } from "react-icons/io";
 import getImageUrl from "@/settings/utils";
import { useEffect, useRef, useState } from "react";
 
 export const GlobalDropdown = ({
    label,
    items,
    selected,
    setSelectedItem,
    placeholder,
    isCategory = false,
  }: {
    label: string;
    items: any[];
    selected: any;
    setSelectedItem: any;
    placeholder: string;
    isCategory?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const [dropdownStyle, setDropdownStyle] = useState({});

    const portalRoot = typeof window !== "undefined" ? document.body : null;

    const handleSelect = (item: any) => {
      setSelectedItem(item);
      setIsOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      if (isOpen) document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "absolute",
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          zIndex: 99999,
        });
      }
    }, [isOpen]);

    return (
      <div className="relative">
        <div
          ref={buttonRef}
          className="border border-gray-300 px-3 py-1.5 text-sm cursor-pointer bg-white flex items-center justify-between rounded"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          {selected ? (
            <div className="flex items-center">
              {isCategory && selected.imageUrl && (
                <img
                  src={getImageUrl(selected.imageUrl)}
                  alt={selected.name}
                  className="w-6 h-6 object-cover rounded mr-2"
                />
              )}
              <span>{selected.name || selected.label}</span>
            </div>
          ) : (
            <span className="text-gray-800">{placeholder}</span>
          )}
          <IoIosArrowDown className={`ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {portalRoot &&
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, scaleY: 0.8, transformOrigin: "top" }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={dropdownStyle}
                  className="max-h-60 overflow-auto border border-gray-300 bg-white shadow-lg rounded-md origin-top"
                >
                  {items.map((item) => (
                    <li
                      key={item._id || item.value || item.label}
                      className="px-3 py-1.5 hover:bg-blue-100 cursor-pointer flex items-center text-gray-800"
                      onClick={() => handleSelect(item)}
                    >
                      {isCategory && item.imageUrl && (
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded mr-3"
                        />
                      )}
                      {item.name || item.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>,
            portalRoot
          )}
      </div>
    );
  };