"use client";
import { Employee } from "@/types";
import { Edit, MoreHorizontal, Trash2, User } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface ActionMenuProps {
  employee: Employee;
  onViewProfile: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  onDeleteEmployee: (id: number) => void;
  isMobile?: boolean;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  employee,
  onViewProfile,
  onEditEmployee,
  onDeleteEmployee,
  isMobile = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: "auto", bottom: "auto" });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (menuRect.bottom > viewportHeight) {
        setMenuPosition({ top: "auto", bottom: "100%" });
      } else {
        setMenuPosition({ top: "100%", bottom: "auto" });
      }
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 cursor-pointer text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 ${
          isOpen ? "bg-slate-100 text-slate-900" : ""
        }`}
        title="More actions"
      >
        <MoreHorizontal className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={menuRef}
            style={menuPosition}
            className="absolute bg-white right-0 mt-2 w-48 rounded-xl shadow-lg border border-slate-200 py-2 z-20"
          >
            <button
              onClick={() => handleAction(() => onViewProfile(employee))}
              className="flex items-center w-full px-4 py-2 cursor-pointer text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <User className="h-4 w-4 mr-3" />
              View Profile
            </button>
            <button
              onClick={() => handleAction(() => onEditEmployee(employee))}
              className="flex items-center w-full px-4 py-2 cursor-pointer text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              <Edit className="h-4 w-4 mr-3" />
              Edit Employee
            </button>
            <button
              onClick={() => handleAction(() => onDeleteEmployee(employee.id))}
              className="flex items-center w-full px-4 py-2 cursor-pointer text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-3" />
              Delete Employee
            </button>
          </div>
        </>
      )}
    </div>
  );
};