import { creaturesList } from "../open5e/sdk.gen";
import { Creature, PaginatedCreatureList } from "../open5e/types.gen";

// Challenge Ratings
// Takes challenge rating of monster and maps to number
enum ChallengeRating {
  CR_1_8 = 1 / 8,
  CR_1_4 = 1 / 4,
  CR_1_2 = 1 / 2,

  CR0 = 0,
  CR1 = 1,
  CR2 = 2,
  CR3 = 3,
  CR4 = 4,
  CR5 = 5,
  CR6 = 6,
  CR7 = 7,
  CR8 = 8,
  CR9 = 9,
  CR10 = 10,
  CR11 = 11,
  CR12 = 12,
  CR13 = 13,
  CR14 = 14,
  CR15 = 15,
  CR16 = 16,
  CR17 = 17,
  CR18 = 18,
  CR19 = 19,
  CR20 = 20,
  CR21 = 21,
  CR22 = 22,
  CR23 = 23,
  CR24 = 24,
  CR25 = 25,
  CR26 = 26,
  CR27 = 27,
  CR28 = 28,
  CR29 = 29,
  CR30 = 30,
}
const ONE_EIGTH = 1 / 8;

// CR Conversion
// Keys challenge rating to xp amount
const CR_XP = {
  ONE_EIGTH: 25,
  0.25: 50,
  0.5: 100,
  0: 10,
  1: 200,
  2: 450,
  3: 700,
  4: 1100,
  5: 1800,
  6: 2300,
  7: 2900,
  8: 3900,
  9: 5000,
  10: 5900,
  11: 7200,
  12: 8400,
  13: 10000,
  14: 11500,
  15: 13000,
  16: 15000,
  17: 18000,
  18: 20000,
  19: 22000,
  20: 25000,
  21: 33000,
  22: 41000,
  23: 50000,
  24: 62000,
  25: 75000,
  26: 90000,
  27: 105000,
  28: 120000,
  29: 135000,
  30: 155000,
};

// XP Thresholds [Easy, Medium, Hard, Deadly]
const XP_TABLE: Record<number, number[]> = {
  1: [25, 50, 75, 100],
  2: [50, 100, 150, 200],
  3: [75, 150, 225, 400],
  4: [125, 250, 375, 500],
  5: [250, 500, 750, 1100],
  6: [300, 600, 900, 1400],
  7: [350, 750, 1100, 1700],
  8: [450, 900, 1400, 2100],
  9: [550, 1100, 1600, 2400],
  10: [600, 1200, 1900, 2800],
  11: [800, 1600, 2400, 3600],
  12: [1000, 2000, 3000, 4500],
  13: [1100, 2200, 3400, 5100],
  14: [1250, 2500, 3800, 5700],
  15: [1400, 2800, 4300, 6400],
  16: [1600, 3200, 4800, 7200],
  17: [2000, 3900, 5900, 8800],
  18: [2100, 4200, 6300, 9500],
  19: [2400, 4900, 7300, 10900],
  20: [2800, 5700, 8500, 12700],
};

async function getMonsterList(): Promise<Creature[]> {
  let page = 1;
  let next: string | null | undefined = "";
  let creatureList: Creature[] = [];

  while (next != null || next != undefined) {
    const res = await creaturesList({
      query: {
        page: page,
      },
    });
    next = res.data?.next;
    page++;
    if (res.data === undefined) {
      break;
    }

    creatureList.push(...res.data.results);
  }
  return creatureList;
}

// XP Multiplier
function getMultiplier(count: number): number {
  if (count === 1) return 1;
  if (count === 2) return 1.5;
  if (count <= 6) return 2;
  if (count <= 10) return 2.5;
  return 3;
}

function generatePartyXpDifficulties(
  levels: [...lvl: number[]],
  difficulty: string,
): number {
  let totalXP = 0;
  const diffIndex = ["easy", "medium", "hard", "deadly"].indexOf(difficulty);
  for (const lvl in levels) {
    totalXP += XP_TABLE[lvl][diffIndex];
  }
  return totalXP;
}

async function genAPIEncounter(
  targetXP: number,
  uniqueLimit: number,
  monsterCount: number,
): PaginatedCreatureList {
  return res.data as PaginatedCreatureList;
}

// Encounter Generator
export default function generateEncounter(
  targetXP: number,
  uniqueLimit: number,
) {
  const encounter: Record<string, number> = {};
  const allCRs = Object.values(ChallengeRating);

  let rawXP = 0;
  let monsterCount = 0;

  let attempts = 0;

  while (attempts < 1000) {
    attempts++;

    const adjustedXP = rawXP * getMultiplier(monsterCount);
    const remainingXP = targetXP - adjustedXP;

    if (remainingXP <= 0) break;

    const nextMultiplier = getMultiplier(monsterCount + 1);
    const maxCandidateXP = remainingXP / nextMultiplier;

    const candidates = allCRs.filter((cr) => {
      const xp = CR_XP[cr];

      if (xp > maxCandidateXP * 0.5) return false;
      if (cr === "0" && remainingXP > 50) return false;
      if (xp < maxCandidateXP * 0.05) return false;

      return true;
    });

    if (candidates.length === 0) break;

    const chosen = candidates[Math.floor(Math.random() * candidates.length)];
    const isNew = !(chosen in encounter);

    if (isNew && Object.keys(encounter).length >= uniqueLimit) continue;

    encounter[chosen] = (encounter[chosen] || 0) + 1;

    rawXP += CR_XP[chosen];
    monsterCount++;
  }

  return encounter;
}

// Calculates Adjusted XP
function calculateAdjustedXP(encounter: Record<string, number>): number {
  let rawXP = 0;
  let count = 0;

  for (const cr in encounter) {
    rawXP += CR_XP[cr as ChallengeRating] * encounter[cr];
    count += encounter[cr];
  }

  return rawXP * getMultiplier(count);
}

// Handle Form
document.getElementById("encounterForm")!.addEventListener("submit", (e) => {
  e.preventDefault();

  const levels = (document.getElementById("levels") as HTMLInputElement).value
    .split(",")
    .map((n) => parseInt(n.trim()));

  const difficulty = (
    document.getElementById("difficulty") as HTMLSelectElement
  ).value;
  const unique = parseInt(
    (document.getElementById("unique") as HTMLInputElement).value,
  );

  // Difficulty index: Easy=0, Medium=1, Hard=2, Deadly=3
  const diffIndex = ["easy", "medium", "hard", "deadly"].indexOf(difficulty);

  let totalXP = 0;
  for (const lvl of levels) {
    totalXP += XP_TABLE[lvl][diffIndex];
  }

  const encounter = generateEncounter(totalXP, unique);
  const adjustedXP = calculateAdjustedXP(encounter);

  const output = document.getElementById("output")!;
  output.innerHTML = "<h3>Encounter:</h3>";

  for (const cr in encounter) {
    output.innerHTML += `<p>${encounter[cr]} monster(s) of CR ${cr} (${CR_XP[cr as ChallengeRating]} XP)</p>`;
  }

  output.innerHTML += `<h3>Adjusted XP: ${adjustedXP}</h3>`;
});
