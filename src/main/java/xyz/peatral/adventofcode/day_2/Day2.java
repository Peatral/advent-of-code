package xyz.peatral.adventofcode.day_2;

public class Day2 {
    public static void main(String[] args) {
        int[][] counter = new int[] {
            new int[2],
            new int[2],
            new int[2],
            new int[2],

            new int[2],
            new int[2],
            new int[2],
            new int[2],

            new int[2],
            new int[2],
            new int[2],
            new int[2]
        }
        Util.readFile("adventofcode/day_2/input.txt").forEach(s -> {
            for (int i = 0; i < 12; i++) {
                if (s.charAt(i) == '0') {
                    counter[i][0] += 1;
                } else if (s.charAt(i) == '1') {
                    counter[i][1] += 1;
                }
            }
        });
    }
}