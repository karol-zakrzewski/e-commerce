import { FaCartShopping, FaRegUser, FaMagnifyingGlass } from "react-icons/fa6";

export const Navigation = () => {
  return (
    <nav className="flex justify-between items-center p-6 shadow-md">
      <h2>Pipe</h2>
      <ul className="flex justify-around items-center gap-4">
        <li>Strona główna</li>
        <li>O nas</li>
        <li>Polityka prywatności</li>
      </ul>
      <ul className="flex justify-around items-center gap-4">
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
