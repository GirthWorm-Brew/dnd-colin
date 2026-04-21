import {
  armorList,
  backgroundsList,
  classesList,
  conditionsList,
  creaturesList,
  documentsList,
  featsList,
  itemsList,
  magicitemsList,
  spellsList,
  speciesList,
  weaponsList,
} from "../open5e";
import { ListFn } from "./paginate";

type AnyQuery = Record<string, unknown>;
type AnyListFn = ListFn<AnyQuery, unknown>;
export type CategoryEntry = {
  listFn: AnyListFn;
  baseQuery: AnyQuery;
  label: string;
};

const SRD = { document__key__in: ["srd-2024"] };

export const categoryConfig = {
  armor: { listFn: armorList, baseQuery: SRD, label: "Armor" },
  backgrounds: {
    listFn: backgroundsList,
    baseQuery: SRD,
    label: "Backgrounds",
  },
  classes: {
    listFn: classesList,
    baseQuery: { ...SRD, is_subclass: false },
    label: "Classes",
  },
  subclasses: {
    listFn: classesList,
    baseQuery: { ...SRD, is_subclass: true },
    label: "Subclasses",
  },
  conditions: { listFn: conditionsList, baseQuery: SRD, label: "Conditions" },
  creatures: { listFn: creaturesList, baseQuery: SRD, label: "Creatures" },
  documents: { listFn: documentsList, baseQuery: SRD, label: "Documents" },
  feats: { listFn: featsList, baseQuery: SRD, label: "Feats" },
  items: { listFn: itemsList, baseQuery: SRD, label: "Items" },
  magicItems: { listFn: magicitemsList, baseQuery: SRD, label: "Magic Items" },
  spells: { listFn: spellsList, baseQuery: SRD, label: "Spells" },
  species: { listFn: speciesList, baseQuery: SRD, label: "Species" },
  weapons: { listFn: weaponsList, baseQuery: SRD, label: "Weapons" },
} satisfies Record<string, CategoryEntry>;

export type Category = keyof typeof categoryConfig;
export const categories = (Object.keys(categoryConfig) as Category[]).map(
  (key) => ({ key, label: categoryConfig[key].label }),
);
