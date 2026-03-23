import { Col, Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "react-bootstrap";

const sidebarItems: Array<string> = ["Item1, Item2, Item3, Item4, Item5, Item6, Item7, Item8"];
const sidebarCharacters: Array<string> = [
  "Character, Character, Character, Character, Character, Character, Character, Character",
];
const sidebarMonsters: Array<string> = [
  "Monster, Monster, Monster, Monster, Monster, Monster, Monster, Monster",
];

export default function Sidebar() {
  return (
    <>
      <Col>
        <input type="checkbox" id="toggle-left" className="toggle-hidden" />
        <label htmlFor="toggle-left" className="side-tab left-tab">
          Library ◀
        </label>
        <aside className="sidebar sidebar-left">
          <input type="radio" name="lib-tab" id="lib-mon" className="lib-state" checked />
          <input type="radio" name="lib-tab" id="lib-spell" className="lib-state" />
          <input type="radio" name="lib-tab" id="lib-item" className="lib-state" />
          <input type="radio" name="lib-tab" id="lib-char" className="lib-state" />
          <DropdownButton id="sidebar-dropdown-selection" title="Category">
            <DropdownMenu>
              <DropdownItem>armor</DropdownItem>
              <DropdownItem>Backgrounds</DropdownItem>
              <DropdownItem>Classes</DropdownItem>
              <DropdownItem>Conditions</DropdownItem>
              <DropdownItem>Documents</DropdownItem>
              <DropdownItem>Feats</DropdownItem>
              <DropdownItem>Magic Items</DropdownItem>
              <DropdownItem>Monsters</DropdownItem>
              <DropdownItem>Planes</DropdownItem>
              <DropdownItem>Races</DropdownItem>
              <DropdownItem>Sections</DropdownItem>
              <DropdownItem>Spell Lists</DropdownItem>
              <DropdownItem>Spells</DropdownItem>
              <DropdownItem>Weapons</DropdownItem>
            </DropdownMenu>
          </DropdownButton>

          {/* <div className="library-nav"> */}
          {/*   <label htmlFor="lib-mon">Monsters</label> */}
          {/*   <label htmlFor="lib-spell">Spells</label> */}
          {/*   <label htmlFor="lib-item">Items</label> */}
          {/*   <label htmlFor="lib-char">Chars</label> */}
          {/* </div> */}

          <div className="library-content">
            <div className="content-pane pane-monsters">
              <h4>Monsters</h4>
              <ul className="list">
                <li>Ancient Dragon</li>
                <li>Beholder</li>
              </ul>
            </div>
            <div className="content-pane pane-spells">
              <h4>Spells</h4>
              <ul className="list">
                <li>Fireball</li>
                <li>Magic Missile</li>
              </ul>
            </div>
            <div className="content-pane pane-items">
              <h4>Items</h4>
              <ul className="list">
                <li>Vorpal Sword</li>
                <li>Bag of Holding</li>
              </ul>
            </div>
            <div className="content-pane pane-chars">
              <h4>Characters</h4>
              <ul className="list">
                <li>Gandalf</li>
                <li>Legolas</li>
              </ul>
            </div>
          </div>
        </aside>
      </Col>
    </>
  );
}
