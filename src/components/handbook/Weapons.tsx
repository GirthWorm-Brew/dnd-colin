import { itemsRetrieve, weaponsRetrieve } from "../../modules/open5e/sdk.gen";
import { Item, Weapon } from "../../modules/open5e/types.gen";
import { useParams } from "react-router";
import { formatCost, formatWeight } from "./itemFormatter";
import { useHandbookData } from "./useHandbookData";
import HandbookPage from "./HandbookPage";

export default function WeaponPage() {
  let { stub } = useParams<{ stub: string }>();

  const { data: item, loading: itemLoading } = useHandbookData(
    stub,
    itemsRetrieve,
    (data): data is Item => (data as Item)?.name !== undefined,
  );

  const { data: weapon, loading: weaponLoading } = useHandbookData(
    stub,
    weaponsRetrieve,
    (data): data is Weapon => (data as Weapon)?.name !== undefined,
  );

  if (itemLoading || weaponLoading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!item || !weapon) {
    return (
      <div>
        <p>Weapon not found</p>
      </div>
    );
  }

  // True if the range is 0 or if it can be thrown
  const isMelee =
    weapon.range == 0 ||
    item.weapon.properties.some(
      (properties) => properties.property.name === "Thrown",
    );

  // Stores the mastery property separately
  const masteryProperty = item.weapon.properties.find(
    (properties) => properties.property.type === "Mastery",
  );

  // Stores all the property names and adds appropriate details
  const propertyNames = item.weapon.properties
    .filter((properties) => properties.property.type !== "Mastery")
    .map((properties) => {
      switch (properties.property.name) {
        case "Thrown":
        case "Versatile":
          return `${properties.property.name} (${properties.detail}), `;
        case "Ammunition":
          return `Ammunition (Range ${weapon.range}/${weapon.long_range}), `;
        default:
          return properties.property.name
            ? `${properties.property.name}, `
            : "";
      }
    });

  if (masteryProperty) {
    propertyNames.push(masteryProperty.property.name);
  }

  return (
    <HandbookPage>
      <h1>Weapon</h1>
      <div className="wide">
        <h2>{item.name}</h2>
        <div className="wide">
          <div className="wide">
            <strong>Type: </strong>
            {item.weapon.is_simple ? "Simple" : "Martial"}{" "}
            {isMelee ? "Melee" : "Ranged"} Weapon <br />
            <br />
            <p>
              Proficiency with a {item.name} allows you to add your proficiency
              bonus to the attack roll for any attack you make with it.
              <br />
              This weapon has the following mastery property. To use this
              property, you must have a feature that lets you use it.
              <br />
              <br />
              <em>
                <strong>{masteryProperty?.property.name}: </strong>
              </em>{" "}
              {masteryProperty?.property.desc}
              <br />
            </p>
          </div>
          <div className="wide">
            <table>
              <thead>
                <tr>
                  <th>
                    <strong>Name</strong>
                  </th>
                  <th>
                    <strong>Cost</strong>
                  </th>
                  <th>
                    <strong>Damage</strong>
                  </th>
                  <th>
                    <strong>Weight</strong>
                  </th>
                  <th>
                    <strong>Properties</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>{formatCost(item.cost ?? "0")}</td>
                  <td>
                    {item.weapon.damage_dice} {item.weapon.damage_type.name}
                  </td>
                  <td>{formatWeight(item.weight ?? "0")}</td>
                  <td>{propertyNames}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HandbookPage>
  );
}

