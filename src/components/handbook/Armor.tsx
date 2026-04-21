import { armorRetrieve } from "../../modules/open5e/sdk.gen";
import { Armor } from "../../modules/open5e/types.gen";
import { useParams } from "react-router";
import { useHandbookData } from "./useHandbookData";
import HandbookPage from "./HandbookPage";

export default function ArmorPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: armor, loading } = useHandbookData(
    stub,
    armorRetrieve,
    (data): data is Armor => (data as Armor)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!armor) {
    return (
      <div>
        <p>Armor not found</p>
      </div>
    );
  }

  return (
    <HandbookPage modifier="auto">
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
            {armor.grants_stealth_disadvantage ? (
              <li>Disadvantage on stealth checks</li>
            ) : null}
            {typeof armor.strength_score_required == "number" ? (
              <li>
                <strong>Requires: </strong> {armor.strength_score_required}{" "}
                Strength
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
    </HandbookPage>
  );
}