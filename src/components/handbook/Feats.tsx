import { featsRetrieve } from "../../modules/open5e/sdk.gen";
import { Feat } from "../../modules/open5e/types.gen";
import { useHandbookData } from "./useHandbookData";
import { useParams } from "react-router";
import HandbookPage from "./HandbookPage";

export default function FeatPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: feat, loading } = useHandbookData(
    stub,
    featsRetrieve,
    (data): data is Feat => (data as Feat)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!feat) {
    return (
      <div>
        <p>Condtion not found</p>
      </div>
    );
  }
  return (
    <HandbookPage>
      <main className="">
        <h1>Feat</h1>
        <div className="columnWrapper"></div>
        <h2>{feat.name}</h2>
        <p className="wide">
          {feat.type}
          <br />
          <em>
            <strong> Requires: </strong>
            {feat.has_prerequisite ? feat.prerequisite : null}
          </em>
        </p>
        {feat.desc !== undefined && feat.desc.length > 1 ? (
          <p>{feat.desc}</p>
        ) : null}
        <ul>
          {feat.benefits.map((benefit, index) => (
            <li className="wide">{benefit.desc}</li>
          ))}
        </ul>
        <a className="artist" href={feat.document.permalink}>
          {feat.document.publisher.name}
        </a>
      </main>
      <div className="footnote">
        <p className="">{feat.document.display_name}</p>
      </div>
      <div className="pageNumber auto"></div>
    </HandbookPage>
  );
}
