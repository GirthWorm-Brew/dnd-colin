import { Col, Container, Row } from "react-bootstrap";
import MainLayout from "./components/MainLayout";

import {
  Armor,
  Background,
  Class,
  Condition,
  Document,
  Feat,
  MagicItem,
  Creature,
  Plane,
  Race,
  Section,
  Spell,
  SpellList,
  Weapon,
} from "./components/handbook";
import "./styles/Nick.css";

export default function App() {
  return (
    <MainLayout>
      <Row>
        <Col>
          <Creature creatureKey="a5e-mm_aboleth" />
        </Col>
        <Col>
          <Armor armorKey="srd-2024_breastplate" />
        </Col>
        <Col>
          <Class />
        </Col>
      </Row>
    </MainLayout>
  );
}
