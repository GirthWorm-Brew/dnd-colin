import { spellsRetrieve } from "../../modules/open5e/sdk.gen";
import { Spell } from "../../modules/open5e/types.gen";
import { useParams } from "react-router";
import { useHandbookData } from "./useHandbookData";
import HandbookPage from "./HandbookPage";

export default function SpellPage() {
  let { stub } = useParams();

  const { data: spell, loading } = useHandbookData(
    stub,
    spellsRetrieve,
    (data): data is Spell => (data as Spell)?.name !== undefined
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!spell) {
    return (
      <div>
        <p>Not found</p>
      </div>
    );
  }

  return (
    <HandbookPage modifier="auto">
      <main className="" id="p1" data-index="0">
        <h1>Spell</h1>
        <div className="columnWrapper">
          <h2 id="spell" className="">
            {spell.name}
          </h2>
          <p className="wide">
            <em>
              Level {spell.level} {spell.school.name}
            </em>
          </p>
          <ul className="wide">
            <li>
              <strong>Casting Time: </strong>
              {spell.casting_time}
            </li>
            <li>
              <strong>Components: </strong>
              {spell.verbal ? " V " : ""}
              {spell.somatic ? " S " : ""}
              {spell.material ? `M (${spell.material_specified})` : ""}
            </li>
            <li>
              <strong>Duration: </strong>
              {spell.duration}
            </li>
          </ul>
          <p className="wide">{spell.desc}</p>
          <dl className="">
            {spell.casting_options.map((option) => (
              <>
                <dt>{option.type}</dt>
                <dd>
                  {option.damage_roll != null ? (
                    <li>Damage Roll: {option.damage_roll}</li>
                  ) : null}
                  {option.desc != null ? <li>{option.desc}</li> : null}
                  {option.target_count != null ? (
                    <li>Target Count: {option.target_count}</li>
                  ) : null}
                  {option.duration != null ? (
                    <li>Duration: {option.duration}</li>
                  ) : null}
                  {option.range != null ? (
                    <li>Range: {option.range}</li>
                  ) : null}
                  {option.shape_size != null ? (
                    <li>Shape/Size:{option.shape_size}</li>
                  ) : null}
                  {option.concentration != null ? (
                    <li>Concentration: {option.concentration}</li>
                  ) : null}
                </dd>
                <br />
              </>
            ))}
          </dl>
        </div>
        <a className="artist" href={spell.document.permalink}>
          {spell.document.publisher.name}
        </a>
        <div className="footnote">
          <p className="">{spell.document.name}</p>
        </div>
        <div className="pageNumber auto"></div>
      </main>
    </HandbookPage>
  );
}