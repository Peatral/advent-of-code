package xyz.peatral.adventofcode.day_9;

public enum Bracket {
    ROUND(3, "(", ")", 1),
    SQUARE(57, "[", "]", 2),
    BRACE(1197, "{", "}", 3),
    DIAMOND(25137, "<", ">", 4);

    private long score;
    private String opening;
    private String closing;
    private long autocompleteScore;

    Bracket(long score, String opening, String closing, long autocompleteScore) {
        this.score = score;
        this.opening = opening;
        this.closing = closing;
        this.autocompleteScore = autocompleteScore;
    }

    public long getScore() {
        return score;
    }

    public String getOpening() {
        return opening;
    }

    public String getClosing() {
        return closing;
    }

    public long getAutocompleteScore() {
        return autocompleteScore;
    }

    public String getEmptyChunk() {
        return opening + closing;
    }

    public static Bracket getFromOpening(String opening) {
        for (Bracket b : values()) {
            if (b.getOpening().equals(opening))
                return b;
        }

        return null;
    }

    public static Bracket getFromClosing(String closing) {
        for (Bracket b : values()) {
            if (b.getClosing().equals(closing))
                return b;
        }

        return null;
    }
}
