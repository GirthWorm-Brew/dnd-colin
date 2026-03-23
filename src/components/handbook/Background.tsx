import { Container } from "react-bootstrap";
import { backgroundsRetrieve } from "../../modules/open5e/sdk.gen";
import { Background } from "../../modules/open5e/types.gen";
import { useState, useEffect } from "react";

export default function BackgroundPage({ id }: { id: string }) {
  const [background, setBackground] = useState<Background | null>(null);

  useEffect(() => {
    async function load() {
      const res = await backgroundsRetrieve({
        path: {
          key: id,
        },
      });
      console.log(res.response);
      setBackground(res.data as Background);
    }
    load();
  }, []);

  if (!background) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  } else {
    return (
      <Container className="phb page">
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
              {background.benefits.map((benefit, index) => (
                <tr>
                  <td>{benefit.name}</td>
                  <td>{benefit.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </Container>
    );
  }
}
