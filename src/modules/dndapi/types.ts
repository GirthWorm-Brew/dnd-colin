import type { components, operations } from "../../generated/open5e";

export type Open5eRoot = Record<string, string>;

export type Open5eOperation = keyof operations;
export type Open5eListOperation = Extract<Open5eOperation, `${string}_list`>;
export type Open5eRetrieveOperation = Extract<
  Open5eOperation,
  `${string}_retrieve`
>;

export type Open5eJsonResponse<
  Op extends Open5eOperation,
  Status extends keyof operations[Op]["responses"] = 200,
> = operations[Op]["responses"][Status] extends {
  content: {
    "application/json": infer Payload;
  };
}
  ? Payload
  : never;

export type Open5eListResponse<Op extends Open5eListOperation> =
  Open5eJsonResponse<Op, 200>;
export type Open5eListItem<Op extends Open5eListOperation> =
  Open5eListResponse<Op> extends {
    results: Array<infer Item>;
  }
    ? Item
    : never;
export type Open5eRetrieveResponse<Op extends Open5eRetrieveOperation> =
  Open5eJsonResponse<Op, 200>;

export type Open5ePathParams<Op extends Open5eOperation> =
  operations[Op]["parameters"]["path"];
export type Open5eQueryParams<Op extends Open5eOperation> =
  operations[Op]["parameters"]["query"];

export type EnumListResponse = Array<Record<string, string>>;

export type Open5eCollectionMap = {
  items: {
    listPath: "/v2/items/";
    detailPath: "/v2/items/{key}/";
    listOperation: "items_list";
    detailOperation: "items_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedItemList"];
    itemResponse: components["schemas"]["Item"];
  };
  magicitems: {
    listPath: "/v2/magicitems/";
    detailPath: "/v2/magicitems/{key}/";
    listOperation: "magicitems_list";
    detailOperation: "magicitems_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedItemList"];
    itemResponse: components["schemas"]["Item"];
  };
  itemsets: {
    listPath: "/v2/itemsets/";
    detailPath: "/v2/itemsets/{key}/";
    listOperation: "itemsets_list";
    detailOperation: "itemsets_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedItemSetList"];
    itemResponse: components["schemas"]["ItemSet"];
  };
  itemcategories: {
    listPath: "/v2/itemcategories/";
    detailPath: "/v2/itemcategories/{key}/";
    listOperation: "itemcategories_list";
    detailOperation: "itemcategories_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedItemCategoryList"];
    itemResponse: components["schemas"]["ItemCategory"];
  };
  documents: {
    listPath: "/v2/documents/";
    detailPath: "/v2/documents/{key}/";
    listOperation: "documents_list";
    detailOperation: "documents_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedDocumentList"];
    itemResponse: components["schemas"]["Document"];
  };
  licenses: {
    listPath: "/v2/licenses/";
    detailPath: "/v2/licenses/{key}/";
    listOperation: "licenses_list";
    detailOperation: "licenses_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedLicenseList"];
    itemResponse: components["schemas"]["License"];
  };
  publishers: {
    listPath: "/v2/publishers/";
    detailPath: "/v2/publishers/{key}/";
    listOperation: "publishers_list";
    detailOperation: "publishers_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedPublisherList"];
    itemResponse: components["schemas"]["Publisher"];
  };
  weapons: {
    listPath: "/v2/weapons/";
    detailPath: "/v2/weapons/{key}/";
    listOperation: "weapons_list";
    detailOperation: "weapons_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedWeaponList"];
    itemResponse: components["schemas"]["Weapon"];
  };
  armor: {
    listPath: "/v2/armor/";
    detailPath: "/v2/armor/{key}/";
    listOperation: "armor_list";
    detailOperation: "armor_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedArmorList"];
    itemResponse: components["schemas"]["Armor"];
  };
  gamesystems: {
    listPath: "/v2/gamesystems/";
    detailPath: "/v2/gamesystems/{key}/";
    listOperation: "gamesystems_list";
    detailOperation: "gamesystems_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedGameSystemList"];
    itemResponse: components["schemas"]["GameSystem"];
  };
  backgrounds: {
    listPath: "/v2/backgrounds/";
    detailPath: "/v2/backgrounds/{key}/";
    listOperation: "backgrounds_list";
    detailOperation: "backgrounds_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedBackgroundList"];
    itemResponse: components["schemas"]["Background"];
  };
  feats: {
    listPath: "/v2/feats/";
    detailPath: "/v2/feats/{key}/";
    listOperation: "feats_list";
    detailOperation: "feats_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedFeatList"];
    itemResponse: components["schemas"]["Feat"];
  };
  species: {
    listPath: "/v2/species/";
    detailPath: "/v2/species/{key}/";
    listOperation: "species_list";
    detailOperation: "species_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedSpeciesList"];
    itemResponse: components["schemas"]["Species"];
  };
  creatures: {
    listPath: "/v2/creatures/";
    detailPath: "/v2/creatures/{key}/";
    listOperation: "creatures_list";
    detailOperation: "creatures_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedCreatureList"];
    itemResponse: components["schemas"]["Creature"];
  };
  creaturetypes: {
    listPath: "/v2/creaturetypes/";
    detailPath: "/v2/creaturetypes/{key}/";
    listOperation: "creaturetypes_list";
    detailOperation: "creaturetypes_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedCreatureTypeList"];
    itemResponse: components["schemas"]["CreatureType"];
  };
  creaturesets: {
    listPath: "/v2/creaturesets/";
    detailPath: "/v2/creaturesets/{key}/";
    listOperation: "creaturesets_list";
    detailOperation: "creaturesets_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedCreatureSetList"];
    itemResponse: components["schemas"]["CreatureSet"];
  };
  damagetypes: {
    listPath: "/v2/damagetypes/";
    detailPath: "/v2/damagetypes/{key}/";
    listOperation: "damagetypes_list";
    detailOperation: "damagetypes_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedDamageTypeList"];
    itemResponse: components["schemas"]["DamageType"];
  };
  languages: {
    listPath: "/v2/languages/";
    detailPath: "/v2/languages/{key}/";
    listOperation: "languages_list";
    detailOperation: "languages_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedLanguageList"];
    itemResponse: components["schemas"]["Language"];
  };
  alignments: {
    listPath: "/v2/alignments/";
    detailPath: "/v2/alignments/{key}/";
    listOperation: "alignments_list";
    detailOperation: "alignments_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedAlignmentList"];
    itemResponse: components["schemas"]["Alignment"];
  };
  conditions: {
    listPath: "/v2/conditions/";
    detailPath: "/v2/conditions/{key}/";
    listOperation: "conditions_list";
    detailOperation: "conditions_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedConditionList"];
    itemResponse: components["schemas"]["Condition"];
  };
  spells: {
    listPath: "/v2/spells/";
    detailPath: "/v2/spells/{key}/";
    listOperation: "spells_list";
    detailOperation: "spells_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedSpellList"];
    itemResponse: components["schemas"]["Spell"];
  };
  spellschools: {
    listPath: "/v2/spellschools/";
    detailPath: "/v2/spellschools/{key}/";
    listOperation: "spellschools_list";
    detailOperation: "spellschools_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedSpellSchoolList"];
    itemResponse: components["schemas"]["SpellSchool"];
  };
  classes: {
    listPath: "/v2/classes/";
    detailPath: "/v2/classes/{key}/";
    listOperation: "classes_list";
    detailOperation: "classes_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedCharacterClassList"];
    itemResponse: components["schemas"]["CharacterClass"];
  };
  sizes: {
    listPath: "/v2/sizes/";
    detailPath: "/v2/sizes/{key}/";
    listOperation: "sizes_list";
    detailOperation: "sizes_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedSizeList"];
    itemResponse: components["schemas"]["Size"];
  };
  itemrarities: {
    listPath: "/v2/itemrarities/";
    detailPath: "/v2/itemrarities/{key}/";
    listOperation: "itemrarities_list";
    detailOperation: "itemrarities_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedItemRarityList"];
    itemResponse: components["schemas"]["ItemRarity"];
  };
  environments: {
    listPath: "/v2/environments/";
    detailPath: "/v2/environments/{key}/";
    listOperation: "environments_list";
    detailOperation: "environments_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedEnvironmentList"];
    itemResponse: components["schemas"]["Environment"];
  };
  abilities: {
    listPath: "/v2/abilities/";
    detailPath: "/v2/abilities/{key}/";
    listOperation: "abilities_list";
    detailOperation: "abilities_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedAbilityList"];
    itemResponse: components["schemas"]["Ability"];
  };
  skills: {
    listPath: "/v2/skills/";
    detailPath: "/v2/skills/{key}/";
    listOperation: "skills_list";
    detailOperation: "skills_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedSkillList"];
    itemResponse: components["schemas"]["Skill"];
  };
  rules: {
    listPath: "/v2/rules/";
    detailPath: "/v2/rules/{key}/";
    listOperation: "rules_list";
    detailOperation: "rules_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedRuleList"];
    itemResponse: components["schemas"]["Rule"];
  };
  rulesets: {
    listPath: "/v2/rulesets/";
    detailPath: "/v2/rulesets/{key}/";
    listOperation: "rulesets_list";
    detailOperation: "rulesets_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedRuleSetList"];
    itemResponse: components["schemas"]["RuleSet"];
  };
  images: {
    listPath: "/v2/images/";
    detailPath: "/v2/images/{key}/";
    listOperation: "images_list";
    detailOperation: "images_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedImageList"];
    itemResponse: components["schemas"]["Image"];
  };
  weaponproperties: {
    listPath: "/v2/weaponproperties/";
    detailPath: "/v2/weaponproperties/{key}/";
    listOperation: "weaponproperties_list";
    detailOperation: "weaponproperties_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedWeaponPropertyList"];
    itemResponse: components["schemas"]["WeaponProperty"];
  };
  services: {
    listPath: "/v2/services/";
    detailPath: "/v2/services/{key}/";
    listOperation: "services_list";
    detailOperation: "services_retrieve";
    idKey: "key";
    listResponse: components["schemas"]["PaginatedServiceList"];
    itemResponse: components["schemas"]["Service"];
  };
  enums: {
    listPath: "/v2/enums/";
    listOperation: "enums_list";
    listResponse: EnumListResponse;
  };
  search: {
    listPath: "/v2/search/";
    detailPath: "/v2/search/{id}/";
    listOperation: "search_list";
    detailOperation: "search_retrieve";
    idKey: "id";
    listResponse: components["schemas"]["PaginatedSearchResultList"];
    itemResponse: components["schemas"]["SearchResult"];
  };
};

export type Open5eCollectionKey = keyof Open5eCollectionMap;
export type Open5eListPath =
  Open5eCollectionMap[Open5eCollectionKey]["listPath"];
export type Open5eDetailPath = {
  [K in Open5eCollectionKey]: Open5eCollectionMap[K] extends {
    detailPath: infer P;
  }
    ? P
    : never;
}[Open5eCollectionKey];
export type Open5eCollection = Open5eCollectionMap[Open5eCollectionKey];
export type Open5eCollectionResponse<K extends Open5eCollectionKey> =
  Open5eCollectionMap[K]["listResponse"];
export type Open5eCollectionItem<K extends Open5eCollectionKey> =
  Open5eCollectionMap[K] extends { itemResponse: infer Item } ? Item : never;

export type Open5ePersistedRecord<T> = {
  id: string;
  fetchedAt: string;
  sourceUrl: string;
  payload: T;
};

export type CategoryPage = {
  next?: string | null;
  results?: Record<string, unknown>[];
};

export type CollectionsPayload = Record<string, unknown[]>;

export async function fetchOpen5eCollectionsAsJson(): Promise<CollectionsPayload> {
  const BASE_URL = "https://api.open5e.com";
  const root = (await (await fetch(BASE_URL)).json()) as Record<string, string>;

  const data: CollectionsPayload = {};

  for (const [collection, startUrl] of Object.entries(root)) {
    const items: Record<string, unknown>[] = [];
    let nextUrl: string | null = startUrl;

    while (nextUrl) {
      const page = (await (await fetch(nextUrl)).json()) as CategoryPage;
      if (Array.isArray(page.results)) items.push(...page.results);
      console.log(page.results);
      nextUrl = page.next ?? null;
    }

    data[collection] = items;
  }
  return data;
}
