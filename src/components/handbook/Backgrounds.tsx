import { backgroundsRetrieve } from "../../modules/open5e/sdk.gen";
import { Background } from "../../modules/open5e/types.gen";
import { useHandbookData } from "./useHandbookData";
import { useParams } from "react-router";
import HandbookPage from "./HandbookPage";

export default function BackgroundPage() {
  let { stub } = useParams<{ stub: string }>();
  const { data: background, loading } = useHandbookData(
    stub,
    backgroundsRetrieve,
    (data): data is Background => (data as Background)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!background) {
    return (
      <div>
        <p>Not found</p>
      </div>
    );
  }

  return (
    <HandbookPage>
      <main className="">
        <h1>Background</h1>
        <div className="columnWrapper"></div>
        <h2>{background.name}</h2>
        {background.desc !== undefined && background.desc.length > 1 ? (
          <p>{background.desc}</p>
        ) : null}
        <table className="wide classTable frame decoration">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {background.benefits.map((benefit) => (
              <tr>
                <td>{benefit.name}</td>
                <td>{benefit.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </HandbookPage>
  );
}

