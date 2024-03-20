"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Zombie Apocalypse Management</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/survivors"
                className={
                  pathname === "/survivors"
                    ? "text-gray-500"
                    : "hover:text-gray-300"
                }
              >
                Survivors
              </Link>
            </li>
            <li>
              <Link
                href="/inventories"
                className={
                  pathname === "/inventories"
                    ? "text-gray-500"
                    : "hover:text-gray-300"
                }
              >
                Inventories
              </Link>
            </li>
            <li>
              <Link
                href="/reports"
                className={
                  pathname === "/reports"
                    ? "text-gray-500"
                    : "hover:text-gray-300"
                }
              >
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
