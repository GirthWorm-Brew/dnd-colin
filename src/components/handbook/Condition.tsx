import { Container } from "react-bootstrap";
import { conditionsRetrieve } from "../../modules/open5e/sdk.gen";
import { Condition } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

export default function ConditionPage({ id }: { id: string }) {
  const [condition, setCondition] = useState<Condition | null>(null);

  useEffect(() => {
    async function load() {
      const res = await conditionsRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setCondition(res.data as Condition);
    }
    load();
  }, []);

  if (!condition) {
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
