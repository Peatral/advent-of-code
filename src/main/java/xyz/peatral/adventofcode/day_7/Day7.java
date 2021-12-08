package xyz.peatral.adventofcode.day_7;

import xyz.peatral.adventofcode.util.Util;

import java.util.Arrays;
import java.util.List;

public class Day7 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_7/input.txt");

        long solutionA = input.stream()
                .flatMap(s -> Arrays.stream(
                        s.split("\\|")[1]
                                .strip()
                                .split(" ")
                ))
                .filter(s -> s.length() == 2
                || s.length() == 3
                || s.length() == 4
                || s.length() == 7)
                .count();

        System.out.println(solutionA);

        long solutionB = input.stream()
                .map(s -> new String[][] {
                        s.split("\\|")[0]
                                .strip()
                                .split(" "),
                        s.split("\\|")[1]
                                .strip()
                                .split(" ")
                })
                .map(s -> SevenSegmentDisplay.solve(s[0], s[1]))
                .mapToLong(i -> i)
                .sum();

        System.out.println(solutionB);
    }
}
