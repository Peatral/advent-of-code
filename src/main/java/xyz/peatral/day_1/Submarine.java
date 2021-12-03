package xyz.peatral.day_1;

public class Submarine {
    private int horizontalPosition;
    private int depth;
    private int aim = 0;

    public Submarine() {
        this(0, 0);
    }

    public Submarine(int horizontalPosition, int depth) {
        this.horizontalPosition = horizontalPosition;
        this.depth = depth;
    }

    public void executeFunction(String command) {
        String[] s = command.split(" ");
        String cmd = s[0];
        int value = Integer.parseInt(s[1]);

        switch (cmd) {
            case "forward" -> forward(value);
            case "up" -> up(value);
            case "down" -> down(value);
            default -> {
            }
        }
    }

    public void forward(int i) {
        horizontalPosition += i;
        depth += aim * i;
    }

    public void up(int i) {
        aim -= i;
    }

    public void down(int i) {
        aim += i;
    }

    public int getHorizontalPosition() {
        return horizontalPosition;
    }

    public int getDepth() {
        return depth;
    }
}
