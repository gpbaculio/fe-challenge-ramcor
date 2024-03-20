import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Zombie Apocalypse Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/survivors" className="hover:text-gray-300">
                Survivors
              </Link>
            </li>
            <li>
              <Link href="/inventories" className="hover:text-gray-300">
                Inventories
              </Link>
            </li>
            <li>
              <Link href="/reports" className="hover:text-gray-300">
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
