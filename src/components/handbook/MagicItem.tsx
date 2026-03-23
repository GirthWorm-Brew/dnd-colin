import { Container } from "react-bootstrap";
import { magicitemsRetrieve } from "../../modules/open5e/sdk.gen";
import { MagicitemsRetrieveResponse } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

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

export default function MagicItem({ id }: { id: string }) {
  const [magicItem, setMagicItem] = useState<MagicitemsRetrieveResponse | null>(
    null,
  );

  useEffect(() => {
    async function load() {
      const res = await magicitemsRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setMagicItem(res.data as MagicitemsRetrieveResponse);
    }
    load();
  }, []);

  if (!magicItem) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  } else {
    return (
      <Container fluid className="phb page">
        <main className=""></main>
      </Container>
    );
  }
}
