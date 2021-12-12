package xyz.peatral.adventofcode.day_11;

import xyz.peatral.adventofcode.util.Util;

import java.util.List;

public class Day11 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_11/input.txt");

        CaveMap caveMap = new CaveMap(input.stream()
                .map(s -> s.split("-"))
                .map(s -> new Edge(s[0], s[1]))
                .toList());

        // Part A
        System.out.println(caveMap.solve(false));

        // Part B
        System.out.println(caveMap.solve(true));
    }
}
