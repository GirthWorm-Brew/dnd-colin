import { Link } from "react-router";
import "../../styles/Style.css";
import { Button } from "react-bootstrap";

type TopbarProps = {
	libraryOpen: boolean;
	onToggleLibrary: () => void;
};

export default function Topbar({ libraryOpen, onToggleLibrary }: TopbarProps) {
	return (
		<header className="main-header">
			<div className="header-left">
				<Button
					variant="dark"
					size="sm"
					className="library-toggle"
					onClick={onToggleLibrary}
					aria-expanded={libraryOpen}
					aria-controls="sidebar-left"
				>
					☰ Library
				</Button>
				<div className="logo">Logo</div>
			</div>
			{/* nav-bar at the top of the page, using routes from routes.tsx */}
			<nav className="nav-tabs">
				<Link className="tab t-home" to="">
					Home
				</Link>
				<Link className="tab t-chars" to="encounter/characters">
					Player Characters
				</Link>
				<Link className="tab t-board" to="encounter/generate">
					Encounter Generator
				</Link>
				<Link className="tab t-combat" to="encounter/track">
					Combat Tracker
				</Link>
			</nav>
			<div className="user">👤</div>
		</header>
	);
}
