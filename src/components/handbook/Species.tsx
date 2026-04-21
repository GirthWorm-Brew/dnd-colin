import { useHandbookData } from "./useHandbookData";
import { Species } from "../../modules/open5e/types.gen";
import { speciesRetrieve } from "../../modules/open5e/sdk.gen";
import { useParams } from "react-router";
import HandbookPage from "./HandbookPage";

export default function Race() {
  let { stub } = useParams<{ stub: string }>();
  const { data: species, loading } = useHandbookData(
    stub,
    speciesRetrieve,
    (data): data is Species => (data as Species)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!species) {
    return (
      <div>
        <p>Species not found</p>
      </div>
    );
  }

  return (
    <HandbookPage>
      <main id="p1" data-index="0"></main>
    </HandbookPage>
  );
}
