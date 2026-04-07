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
  Species,
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
          <Document id="srd-2024" />
        </Col>
        <Col>
          <Condition id="charmed" />
        </Col>
        <Col>
          <Feat id="srd-2024_archery" />
        </Col>
        <Col>
          <Creature id="a5e-mm_aboleth" />
        </Col>
        <Col>
          <Armor id="srd-2024_breastplate" />
        </Col>
        <Col>
          <Class />
        </Col>
        <Col>
          <Weapon />
        </Col>
      </Row>
    </MainLayout>
  );
}
