import type {
  NamedBlock,
  Speed,
} from "../../modules/md-builder/components/creatures/CreatureTypes";
import monsterJson from "../../../data/monsters/lich.json";
import "../../../themes/V3/5ePHB/style.css";
import "../../../themes/V3/Blank/style.css";
import "../../../themes/V3/phb.standalone.css";
import React from "react";

function PropListWrapper({
  list,
  type,
}: {
  list: NamedBlock[] | null;
  type: String;
}): React.ReactNode {
  if (list === null) {
    return <></>;
  }
  return (
    <>
      <h3 id="actions">{type}</h3>
      <ul>
        {list.map((item: NamedBlock) => (
          <li>
            <em>
              <strong>{item.name}</strong>
            </em>{" "}
            {item.desc}
          </li>
        ))}
      </ul>
    </>
  );
}

function SpeedBlock({ speed }: { speed: Speed }) {
  const walk = speed.walk ? speed.walk : 0;
  const swim = speed.swim ? speed.swim : 0;
  const fly = speed.fly ? speed.fly : 0;
  const burrow = speed.burrow ? speed.burrow : 0;
  const climb = speed.climb ? speed.climb : 0;
  const hover = speed.hover;
  return (
    <>
      <dt>
        <strong>speed</strong>
      </dt>
      <dd>
        {walk > 0 ? `${walk} ft ` : ""}
        {swim > 0 ? `Swim: ${swim} ft ` : ""}
        {fly > 0 ? `Fly: ${fly} ft ` : ""}
        {burrow > 0 ? `Burrow: ${burrow} ft ` : ""}
        {climb > 0 ? `Climb: ${climb} ft ` : ""}
        {hover ? "(hover)" : ""}
      </dd>
    </>
  );
}

function InfoSection({ info, title }: { info: String; title: String }) {
  if (info === "" || info.length < 2) {
    return null;
  }
  return (
    <>
      <dt>
        <strong>{title}</strong>
      </dt>
      <dd>
        <br />
        {info}
        <br />
      </dd>
    </>
  );
}
const monster = monsterJson;
export default function App() {
  return (
    <>
      <main className="page tocDepthH3" id="p1" data-index="0">
        {/* <div> */}
        {/*   <form> */}
        {/*     <select> */}
        {/*       {files.map((name) => ( */}
        {/*         <option value={name}>{name}</option> */}
        {/*       ))} */}
        {/*     </select> */}
        {/*   </form> */}
        {/* </div> */}
        <div className="columnWrapper">
          <div
            className="watercolor9"
            style={{
              opacity: 0.24,
              top: -750,
              left: -500,
            }}
          ></div>
          <div className="block monster frame wide">
            <h2 id="monster" className="">
              {monster.name}
            </h2>
            <p>
              <em>
                {monster.size} {monster.type} {monster.subtype}
                <span className="inline-block bonus">{monster.alignment}</span>
              </em>
            </p>
            <hr />
            <dl>
              <dt>
                <strong>armor class</strong>
              </dt>
              <dd>
                {monster.armor_class}
                <br />
              </dd>
              <dt>
                <strong>hit points</strong>
              </dt>
              <dd>
                {monster.hit_points}
                <br />
              </dd>
              <SpeedBlock speed={monster.speed} />
            </dl>
            <hr />
            <table>
              <thead>
                <tr>
                  <th align="center">str</th>
                  <th align="center">dex</th>
                  <th align="center">con</th>
                  <th align="center">int</th>
                  <th align="center">wis</th>
                  <th align="center">cha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td align="center">{monster.strength}</td>
                  <td align="center">{monster.dexterity}</td>
                  <td align="center">{monster.constitution}</td>
                  <td align="center">{monster.intelligence}</td>
                  <td align="center">{monster.wisdom}</td>
                  <td align="center">{monster.charisma}</td>
                </tr>
              </tbody>
            </table>
            <hr />
            <dl>
              <InfoSection
                info={monster.damage_resistances}
                title={"Damage Resistances"}
              />
              <InfoSection
                info={monster.condition_immunities}
                title={"Condition Immunities"}
              />
              <InfoSection info={monster.senses} title={"Senses"} />
              <InfoSection info={monster.languages} title={"Languages"} />
              <dt>
                <strong>challenge</strong>
              </dt>
              <dd>
                {monster.challenge_rating}{" "}
                <span className="inline-block bonus">
                  <strong>proficiency bonus</strong>{" "}
                </span>
              </dd>
            </dl>
            <hr />
            <PropListWrapper
              list={monster.legendary_actions}
              type={"Legendary Actions"}
            />
            <PropListWrapper
              list={monster.special_abilities}
              type={"Special"}
            />
            <PropListWrapper list={monster.actions} type={"Actions"} />
            <PropListWrapper
              list={monster.bonus_actions}
              type={"Bonus Actions"}
            />
          </div>
          {monster.desc != "" || monster.desc.length > 2 ? (
            <div className="descriptive wide">{monster.desc}</div>
          ) : (
            ""
          )}
        </div>
        <a className="artist" href={monster.document__url}>
          {monster.document__url}
        </a>
        <div className="footnote">
          <p className="">{monster.document__title}</p>
        </div>
        <div className="pageNumber">{monster.page_no}</div>
      </main>
    </>
  );
}
