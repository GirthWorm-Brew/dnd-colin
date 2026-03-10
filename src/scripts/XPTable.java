// A table that retrieves the amount of experience an encounter should be worth, depending on the difficulty and the player's level.
public class XPTable {

    private static final int[][] XP_TABLE = {
        {}, // Level Zero doesn't exist
        {25, 50, 75, 100}, // Level 1
        {50, 100, 150, 200}, // Level 2
        {75, 150, 225, 400}, // Level 3
        {125, 250, 375, 500}, // Level 4
        {250, 500, 750, 1100}, // Level 5
        {300, 600, 900, 1400}, // Level 6
        {350, 750, 1100, 1700}, // Level 7
        {450, 900, 1400, 2100}, // Level 8
        {550, 1100, 1600, 2400}, // Level 9
        {600, 1200, 1900, 2800}, // Level 10
        {800, 1600, 2400, 3600}, // Level 11
        {1000, 2000, 3000, 4500}, // Level 12
        {1100, 2200, 3400, 5100}, // Level 13
        {1250, 2500, 3800, 5700}, // Level 14
        {1400, 2800, 4300, 6400}, // Level 15
        {1600, 3200, 4800, 7200}, // Level 16
        {2000, 3900, 5900, 8800}, // Level 17
        {2100, 4200, 6300, 9500}, // Level 18
        {2400, 4900, 7300, 10900}, // Level 19
        {2900, 5700, 8500, 12700} // Level 20
    };

    public static int getXpThreshold(int level, EncounterDifficulties difficulty) {
        return XP_TABLE[level][difficulty.ordinal()];
    }

}