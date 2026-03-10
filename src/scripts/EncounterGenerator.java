import java.util.*;

public class EncounterGenerator {

    private static final Random random = new Random();

    //Implements official DMG monster XP multiplier.
    public static double getMultiplier(int monsterCount) {
        if (monsterCount == 1) return 1.0;
        if (monsterCount == 2) return 1.5;
        if (monsterCount <= 6) return 2.0;
        if (monsterCount <= 10) return 2.5;
        if (monsterCount <= 14) return 3.0;
        return 4.0;
    }

    public static Map<ChallengeRating, Integer> generateEncounter(int targetXP, int uniqueMonsterLimit) {

        // Maps out the CRs to keep track of the quantity of monsters at that CR.
        Map<ChallengeRating, Integer> encounter = new HashMap<>();
        ChallengeRating[] allCRs = ChallengeRating.values();

        int rawXP = 0;
        int monsterCount = 0;

        // Stops the loop from running forever.
        int attempts = 0;
        int maxAttempts = 1000;

        while (attempts < maxAttempts) {

            attempts++;

            // Current adjusted XP.
            int adjustedXP = (int)(rawXP * getMultiplier(monsterCount));

            // Remaning XP in the budget.
            int remainingXP = targetXP - adjustedXP;

            if (remainingXP <= 0)
                break;

            // Predicts the multiplier after adding another monster.
            double nextMultiplier = getMultiplier(monsterCount + 1);
            int maxCandidateXP = (int)(remainingXP / nextMultiplier);

            List<ChallengeRating> candidates = new ArrayList<>();

            // Adds all valid CRs to a pool they can be chosen from.
            for (ChallengeRating cr : allCRs) {

                int xp = cr.getXp();

                // Avoids overcosted monsters to account for the quantity multiplier above.
                if (xp > maxCandidateXP * 0.5) {
                    continue;
                }

                // Avoids CR) monster spam.
                if (cr == ChallengeRating.CR0 && remainingXP > 50)
                    continue;

                // Avoids many small monsters being added to fill space.
                if (xp < maxCandidateXP * 0.05)
                    continue;

                candidates.add(cr);
            }

            // If there aren't any valid monsters, stops the loop.
            if (candidates.isEmpty())
                break;

            // Randomly chooses monsters from the valid pool generated above.
            ChallengeRating chosen = candidates.get(random.nextInt(candidates.size()));

            // Checks to see if the monster chosen is unique.
            boolean isNewType = !encounter.containsKey(chosen);

            if (isNewType && encounter.size() >= uniqueMonsterLimit)
                continue;

            encounter.put(chosen, encounter.getOrDefault(chosen, 0) + 1);

            rawXP += chosen.getXp();
            monsterCount++;
        }

        return encounter;
    }

    // After the encounter has been generated, gives the total adjusted XP for the encounter.
    public static int calculateAdjustedXP(Map<ChallengeRating, Integer> encounter) {

        int rawXP = 0;
        int monsterCount = 0;

        for (Map.Entry<ChallengeRating, Integer> entry : encounter.entrySet()) {

            ChallengeRating cr = entry.getKey();
            int count = entry.getValue();

            rawXP += cr.getXp() * count;
            monsterCount += count;
        }

        return (int)(rawXP * getMultiplier(monsterCount));
    }
}