import { Container } from "react-bootstrap";
import { featsRetrieve } from "../../modules/open5e/sdk.gen";
import { Feat } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

export default function FeatPage({ id }: { id: string }) {
  const [feat, setFeat] = useState<Feat | null>(null);

  useEffect(() => {
    async function load() {
      const res = await featsRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setFeat(res.data as Feat);
    }
    load();
  }, []);

  if (!feat) {
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
