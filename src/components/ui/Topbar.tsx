import "../../styles/Nick.css";
export default function Topbar() {
  return (
    <header className="main-header">
      <div className="logo">Logo</div>
      <nav className="nav-tabs">
        <a href="Landing.html" className="tab">
          Home
        </a>
        <label htmlFor="nav-combat" className="tab t-combat">
          Combat Tracker
        </label>
        <label htmlFor="nav-chars" className="tab t-chars">
          Player Characters
        </label>
        <label htmlFor="nav-monsters" className="tab t-monsters">
          Monster Compendium
        </label>
        <label htmlFor="nav-board" className="tab t-board">
          Encounter Board
        </label>
      </nav>
      <div className="user">👤</div>
    </header>
  );
}
