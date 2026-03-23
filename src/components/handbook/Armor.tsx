import { Container } from "react-bootstrap";
import { armorRetrieve } from "../../modules/open5e/sdk.gen";
import { Armor } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

export default function ArmorPage({ id }: { id: string }) {
  const [armor, setArmor] = useState<Armor | null>(null);

  useEffect(() => {
    async function load() {
      const res = await armorRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setArmor(res.data as Armor);
    }
    load();
  }, []);

  if (!armor) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  } else {
    return (
      <Container className="phb page auto">
        <main className="">
          <h1>Armor</h1>
          <div className="columnWrapper">
            <h2 id="armor">{armor.name}</h2>
            <p className="wide">
              <em>{armor.category}</em>
            </p>
            {armor.ac_base > 0 ? (
              <p className="wide">
                <strong>AC: </strong>
                {armor.ac_display}{" "}
              </p>
            ) : null}
            <ul className="wide">
              {armor.grants_stealth_disadvantage ? <li>Disadvantage on stealth checks</li> : null}
              {typeof armor.strength_score_required == "number" ? (
                <li>
                  <strong>Requires: </strong> {armor.strength_score_required} Strength
                </li>
              ) : null}
            </ul>
          </div>
          <a className="artist" href={armor.document.permalink}>
            {armor.document.publisher.name}
          </a>
          <div className="footnote">
            <p className="">{armor.document.name}</p>
          </div>
          <div className="pageNumber auto"></div>
        </main>
      </Container>
    );
  }
}
