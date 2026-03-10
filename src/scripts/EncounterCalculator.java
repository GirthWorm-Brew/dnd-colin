// Driver Class that gets user input to determine how an encounter should be built.
import java.util.*;

public class EncounterCalculator {
  
    public static void main(String[] args) {

        EncounterDifficulties difficulty = null;
        Scanner scan = new Scanner(System.in);
        
        // Asks for the number of players in the party.
        System.out.println("How many players are in your party?");
        int playerCount = Integer.parseInt(scan.nextLine());
        int playerLevels[] = new int[playerCount];

        // Asks for the level of each player.
        for (int i = 0 ; i < playerCount ; i++) {

            System.out.println("Enter level for player " + (i + 1) + ":");
            playerLevels[i] = Integer.parseInt(scan.nextLine());
        }
        
        // Asks for a difficulty rating.
        System.out.println("What difficulty would you like your encounter? Easy, Medium, Hard, or Deadly?");
        String chosenDifficulty = scan.nextLine().toUpperCase();
        difficulty = EncounterDifficulties.valueOf(chosenDifficulty);
        System.out.println("You chose: " + chosenDifficulty);

        // Sums the total experience alloted for the party's level and the difficulty chosen.
        int totalXp = 0;
        for (int level : playerLevels) {
            totalXp += XPTable.getXpThreshold(level, difficulty);
        }

        System.out.println("Total XP for " + difficulty + " encounter: " + totalXp);

        // Asks for the amount of unique monsters in the encounter.
        System.out.println("\nEnter the number of unique monsters you would like in the encounter: ");
        int uniqueMonsterCount = Integer.parseInt(scan.nextLine());

        // Generates the encounter.
        Map<ChallengeRating, Integer> encounter = EncounterGenerator.generateEncounter(totalXp, uniqueMonsterCount);

        System.out.println("\nGenerated Encounter:");

        // Prints the monsters generated in the encounter, including their CRs and the quantity of each.
        for (Map.Entry<ChallengeRating, Integer> entry : encounter.entrySet()) {

            ChallengeRating cr = entry.getKey();
            int count = entry.getValue();

            System.out.println(count + " monster(s) of " + cr + " (" + cr.getXp() + " XP each)");

        }

        // Calculates and prints the adjusted XP.

        int adjustedXP = EncounterGenerator.calculateAdjustedXP(encounter);

        System.out.println("\nAdjusted XP: " + adjustedXP);

        scan.close();
    }
}