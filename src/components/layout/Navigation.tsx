import { FaCartShopping, FaRegUser, FaMagnifyingGlass } from "react-icons/fa6";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white p-6 shadow-md">
      <h2>Strefa zaworów</h2>
      <ul className="flex items-center justify-around gap-4">
        <li>Strona główna</li>
        <li>O nas</li>
        <li>Polityka prywatności</li>
        <li>Kontakt</li>
      </ul>
      <ul className="flex items-center justify-around gap-4">
        <li>
          <FaCartShopping />
        </li>
        <li>
          <FaRegUser />
        </li>
        <li>
          <FaMagnifyingGlass />
        </li>
      </ul>
    </nav>
  );
};
