// Converts all of the possible Challenge Ratings to Experience Point values.

public enum ChallengeRating {

    CR_1_8(0.125, 25),
    CR_1_4(0.25, 50),
    CR_1_2(0.5, 100),

    CR0(0, 10),
    CR1(1, 200),
    CR2(2, 450),
    CR3(3, 700),
    CR4(4, 1100),
    CR5(5, 1800),
    CR6(6, 2300),
    CR7(7, 2900),
    CR8(8, 3900),
    CR9(9, 5000),
    CR10(10, 5900),
    CR11(11, 7200),
    CR12(12, 8400),
    CR13(13, 10000),
    CR14(14, 11500),
    CR15(15, 13000),
    CR16(16, 15000),
    CR17(17, 18000),
    CR18(18, 20000),
    CR19(19, 22000),
    CR20(20, 25000),
    CR21(21, 33000),
    CR22(22, 41000),
    CR23(23, 50000),
    CR24(24, 62000),
    CR25(25, 75000),
    CR26(26, 90000),
    CR27(27, 105000),
    CR28(28, 120000),
    CR29(29, 135000),
    CR30(30, 155000);

    private final double rating;
    private final int xp;

    ChallengeRating(double rating, int xp) {
        this.rating = rating;
        this.xp = xp;
    }

    public double getRating() {
        return rating;
    }

    public int getXp() {
        return xp;
    }

    // Special cases for the fractional CRs.
    public static ChallengeRating fromString(String input) {

        switch (input) {
            case "1/8": return CR_1_8;
            case "1/4": return CR_1_4;
            case "1/2": return CR_1_2;
            default:
                return ChallengeRating.valueOf("CR" + input);
        }
    }
}