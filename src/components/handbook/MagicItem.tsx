import { magicitemsRetrieve } from "../../modules/open5e/sdk.gen";
import { Item } from "../../modules/open5e/types.gen";
import { useParams } from "react-router";
import { useHandbookData } from "./useHandbookData";
import HandbookPage from "./HandbookPage";

// { "slug": string,
//   "name": string,
//   "type": string,
//   "desc": string
//   "rarity": string,
//   "requires_attunement": string,
//   "document__slug": string,
//   "document__title": string,
//   "document__url": string
// }

export default function magicItem() {
  let { stub } = useParams<{ stub: string }>();
  const { data: magicItem, loading } = useHandbookData(
    stub,
    magicitemsRetrieve,
    (data): data is Item => (data as Item)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!magicItem) {
    return (
      <div>
        <p>Condtion not found</p>
      </div>
    );
  }
  return (
    <HandbookPage>
      <main className="">
        <h1>Magic Item</h1>
        <div className="columnWrapper">
          <h2 id="magicItem">{magicItem.name}</h2>
          <p className="wide">
            <em>
              {magicItem.rarity.name} {magicItem.category.name}
            </em>
          </p>
        </div>
        <a className="artist" href={magicItem.document.permalink}>
          {magicItem.document.publisher.name}
        </a>
        <div className="footnote">
          <p className="">{magicItem.document.name}</p>
        </div>
        <div className="pageNumber auto"></div>
      </main>
    </HandbookPage>
  );
}
