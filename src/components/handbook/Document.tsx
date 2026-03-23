import { Container } from "react-bootstrap";
import { documentsRetrieve } from "../../modules/open5e/sdk.gen";
import { Document } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

export default function DocumentPage({ id }: { id: string }) {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    async function load() {
      const res = await documentsRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setDocument(res.data as Document);
    }
    load();
  }, []);

  if (!document) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  } else {
    return (
      <Container>
        <main className="page tocDepthH3" id="p1" data-index="0"></main>
      </Container>
    );
  }
}
