package xyz.peatral.adventofcode.day_11;

public class Node {
    private boolean big;

    private String name;

    private boolean end;
    private boolean start;

    public Node(String name) {
        this(name.toUpperCase().equals(name), name, name.equals("end"), name.equals("start"));
    }

    public Node(boolean big, String name, boolean end, boolean start) {
        this.big = big;
        this.name = name;
        this.end = end;
        this.start = start;
    }

    public boolean isBig() {
        return big;
    }

    public String getName() {
        return name;
    }

    public boolean isEnd() {
        return end;
    }

    public boolean isStart() {
        return start;
    }

    @Override
    public String toString() {
        return name;
    }
}
