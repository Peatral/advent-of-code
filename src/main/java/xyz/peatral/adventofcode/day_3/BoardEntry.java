package xyz.peatral.adventofcode.day_3;

public class BoardEntry {
    private int number;
    private boolean marked = false;

    public BoardEntry(int number) {
        this.number = number;
    }

    public int getNumber() {
        return number;
    }

    public boolean isMarked() {
        return marked;
    }

    public void setMarked(boolean marked) {
        this.marked = marked;
    }

    public void mark() {
        setMarked(true);
    }
}
