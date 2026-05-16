import "./Header.css";

function Header({ onLogout }) {
  return (
    <header className="header">
      <h1>Finance AI Dashboard</h1>
      <button className="logout-button" onClick={onLogout}>Log out</button>
    </header>
  );
}

export default Header;
