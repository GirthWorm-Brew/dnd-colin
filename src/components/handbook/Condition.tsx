import { conditionsRetrieve } from "../../modules/open5e/sdk.gen";
import { Condition } from "../../modules/open5e/types.gen";
import { useHandbookData } from "./useHandbookData";
import { useParams } from "react-router";
import HandbookPage from "./HandbookPage";

export default function ConditionPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: condition, loading } = useHandbookData(
    stub,
    conditionsRetrieve,
    (data): data is Condition => (data as Condition)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!condition) {
    return (
      <div>
        <p>Condtion not found</p>
      </div>
    );
  }
  return (
    <HandbookPage>
      <main id="p1" data-index="0">
        <h1>condition</h1>
        <div className="columnWrapper"></div>
        <h2>{condition.name}</h2>
        <ul className="wide">
          {condition.descriptions.map((desc, indes) => (
            <li>
              <strong>{desc.gamesystem}:</strong> {desc.desc}
              <p>
                <em>{desc.document}</em>
              </p>
              <br />
            </li>
          ))}
        </ul>
        <a className="artist" href={condition.document.permalink}>
          {condition.document.publisher.name}
        </a>
      </main>
      <div className="footnote">
        <p className="">{condition.document.display_name}</p>
      </div>
      <div className="pageNumber auto"></div>
    </HandbookPage>
  );
}
