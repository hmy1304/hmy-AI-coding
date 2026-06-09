import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        💰 Pocket Money Manager
      </div>

      <nav>
        <NavLink to="/">대시보드</NavLink>

        <NavLink to="/transactions">
          거래내역
        </NavLink>

        <NavLink to="/statistics">
          통계
        </NavLink>
      </nav>

      <ThemeToggle />
    </header>
  );
}

export default Header;