import { useEffect, useMemo, useState } from "react";
import HandbookPage from "./HandbookPage";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { useParams } from "react-router";
import { CharacterClass, ClassFeature } from "../../modules/open5e/types.gen";
import { classesRetrieve } from "../../modules/open5e/sdk.gen";
import { useHandbookData } from "./useHandbookData";

async function parseMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

const PLACEHOLDER_DESCS = new Set(["[Column data]", "[column data]"]);

function hasRealDesc(desc: string | undefined): desc is string {
  return !!desc && !PLACEHOLDER_DESCS.has(desc.trim());
}

function MarkdownBlock({
  source,
  className,
}: {
  source: string | undefined;
  className?: string;
}) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    if (!source) {
      setHtml("");
      return;
    }
    let cancelled = false;
    parseMarkdown(source).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (!html) return null;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

function ProgressionTable({
  columnFeatures,
  levelFeatures,
  maxLevel,
}: {
  columnFeatures: ClassFeature[];
  levelFeatures: ClassFeature[];
  maxLevel: number;
}) {
  const columns = useMemo(
    () =>
      columnFeatures.map((f) => ({
        name: f.name,
        byLevel: new Map(
          (f.data_for_class_table ?? []).map((i) => [i.level, i.column_value]),
        ),
      })),
    [columnFeatures],
  );

  const featuresByLevel = useMemo(() => {
    const map = new Map<number, string[]>();
    for (const f of levelFeatures) {
      for (const { level } of f.gained_at ?? []) {
        const list = map.get(level) ?? [];
        list.push(f.name);
        map.set(level, list);
      }
    }
    return map;
  }, [levelFeatures]);

  const levels = Array.from({ length: maxLevel }, (_, i) => i + 1);

  return (
    <table className="wide classProgression">
      <thead>
        <tr>
          <th>Level</th>
          {columns.map((c) => (
            <th key={c.name}>{c.name}</th>
          ))}
          <th>Features</th>
        </tr>
      </thead>
      <tbody>
        {levels.map((level) => (
          <tr key={level}>
            <td>
              <strong>{level}</strong>
            </td>
            {columns.map((c) => (
              <td key={c.name}>{c.byLevel.get(level) ?? "—"}</td>
            ))}
            <td>{featuresByLevel.get(level)?.join(", ") ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FeatureBlock({ feature }: { feature: ClassFeature }) {
  const gainedAt = feature.gained_at ?? [];
  const detailed = gainedAt.filter((g) => g.detail);
  return (
    <section className="classFeature">
      <h5>{feature.name}</h5>
      <hr />
      {gainedAt.length > 0 ? (
        <p className="featureLevels">
          <em>
            Gained at level
            {gainedAt.length > 1 ? "s " : " "}
            {gainedAt
              .map((g) => g.level)
              .sort((a, b) => a - b)
              .join(", ")}
          </em>
        </p>
      ) : null}
      {hasRealDesc(feature.desc) ? (
        <MarkdownBlock source={feature.desc} />
      ) : null}
      {detailed.length > 0 ? (
        <ul>
          {detailed.map((g, i) => (
            <li key={i}>
              <strong>Level {g.level}:</strong> {g.detail}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function FeatureSection({
  title,
  features,
}: {
  title: string;
  features: ClassFeature[];
}) {
  const renderable = features.filter(
    (f) =>
      hasRealDesc(f.desc) ||
      (f.gained_at ?? []).some((g) => g.detail),
  );
  if (renderable.length === 0) return null;
  return (
    <div className="featureGroup">
      <h4>{title}</h4>
      {renderable.map((f) => (
        <FeatureBlock key={f.key} feature={f} />
      ))}
    </div>
  );
}

export default function ClassPage() {
  const { stub } = useParams<{ stub: string }>();
  const { data: charClass, loading } = useHandbookData(
    stub,
    classesRetrieve,
    (data): data is CharacterClass =>
      (data as CharacterClass)?.name !== undefined,
  );

  if (loading) {
    return (
      <div>
        <p>...loading</p>
      </div>
    );
  }

  if (!charClass) {
    return (
      <div>
        <p>Class not found</p>
      </div>
    );
  }

  const features = charClass.features;

  const columnFeatures = features.filter(
    (f) => (f.data_for_class_table ?? []).length > 0,
  );
  const levelFeatures = features.filter(
    (f) =>
      (f.gained_at ?? []).length > 0 &&
      (f.data_for_class_table ?? []).length === 0,
  );
  const proficiencyFeatures = features.filter(
    (f) =>
      f.feature_type === "PROFICIENCIES" ||
      f.feature_type === "CORE_TRAITS_TABLE",
  );
  const equipmentFeatures = features.filter(
    (f) => f.feature_type === "STARTING_EQUIPMENT",
  );
  const optionFeatures = features.filter(
    (f) => f.feature_type === "CLASS_FEATURE_OPTION_LIST",
  );

  const allLevels = [
    ...columnFeatures.flatMap((f) =>
      (f.data_for_class_table ?? []).map((i) => i.level),
    ),
    ...levelFeatures.flatMap((f) =>
      (f.gained_at ?? []).map((g) => g.level),
    ),
  ];
  const maxLevel = allLevels.length > 0 ? Math.max(...allLevels, 20) : 20;

  const hp = charClass.hit_points;

  return (
    <HandbookPage modifier="soft">
      <h1>Class</h1>
      <div className="columnWrapper" id="p2" data-index="1">
        <h2>{charClass.name}</h2>
        {charClass.subclass_of ? (
          <p className="subclassOf">
            <em>Subclass of {charClass.subclass_of.name}</em>
          </p>
        ) : null}

        <dl className="classSummary">
          {charClass.hit_dice ? (
            <>
              <dt>
                <strong>Hit Dice</strong>
              </dt>
              <dd>{charClass.hit_dice}</dd>
            </>
          ) : null}
          <dt>
            <strong>Hit Points at 1st Level</strong>
          </dt>
          <dd>{hp.hit_points_at_1st_level}</dd>
          <dt>
            <strong>Hit Points at Higher Levels</strong>
          </dt>
          <dd>{hp.hit_points_at_higher_levels}</dd>
          {charClass.caster_type && charClass.caster_type !== "NONE" ? (
            <>
              <dt>
                <strong>Caster Type</strong>
              </dt>
              <dd>{charClass.caster_type}</dd>
            </>
          ) : null}
          {charClass.primary_abilities &&
          charClass.primary_abilities.length > 0 ? (
            <>
              <dt>
                <strong>Primary Abilities</strong>
              </dt>
              <dd>{charClass.primary_abilities.join(", ")}</dd>
            </>
          ) : null}
          {charClass.saving_throws.length > 0 ? (
            <>
              <dt>
                <strong>Saving Throws</strong>
              </dt>
              <dd>
                {charClass.saving_throws.map((s) => s.name).join(", ")}
              </dd>
            </>
          ) : null}
        </dl>

        {hasRealDesc(charClass.desc) ? (
          <MarkdownBlock
            source={charClass.desc}
            className="classDescription wide"
          />
        ) : null}

        {columnFeatures.length > 0 || levelFeatures.length > 0 ? (
          <div className="featureGroup">
            <h4>{charClass.name} Features</h4>
            <ProgressionTable
              columnFeatures={columnFeatures}
              levelFeatures={levelFeatures}
              maxLevel={maxLevel}
            />
          </div>
        ) : null}

        <FeatureSection title="Proficiencies" features={proficiencyFeatures} />
        <FeatureSection
          title="Starting Equipment"
          features={equipmentFeatures}
        />
        <FeatureSection title="Class Features" features={levelFeatures} />
        <FeatureSection title="Feature Options" features={optionFeatures} />
      </div>
      <div className="footnote">
        <p>{charClass.document.name}</p>
      </div>
      <div className="pageNumber auto"></div>
    </HandbookPage>
  );
}
