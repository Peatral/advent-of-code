package xyz.peatral.adventofcode.day_6;

import xyz.peatral.adventofcode.util.Util;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

public class Day6 {
    public static void main(String[] args) {
        List<Integer> positions = Arrays.stream(Util.readFile("adventofcode/day_6/input.txt").get(0).split(",")).map(Integer::parseInt).toList();
        int minPos = positions.stream().mapToInt(value -> value).min().getAsInt();
        int maxPos = positions.stream().mapToInt(value -> value).max().getAsInt();

        // Part A
        int min = IntStream.range(minPos, maxPos + 1)
                .map(position -> positions.stream()
                        .mapToInt(i -> i)
                        .map(crabPos -> Math.abs(position-crabPos))
                        .sum()
                )
                .min().getAsInt();

        System.out.println(min);

        // Part B
        min = IntStream.range(minPos, maxPos + 1)
                .map(position -> positions.stream()
                        .mapToInt(i -> i)
                        .map(crabPos -> Math.abs(position-crabPos))
                        .map(distance -> IntStream.range(1, distance + 1).sum())
                        .sum()
                )
                .min().getAsInt();

        System.out.println(min);

        // Notice the only difference is the following line in B:
        // .map(distance -> IntStream.range(1, distance + 1).sum())
        // In A I just use the distance as fuel cost, with a 1:1 ratio,
        // so a length of 3 is composed of 1 + 1 + 1 fuel cost steps.
        // So instead I can sum all numbers from 1 (first step) to the distance to go (the last step)
        // and get the actual fuel value.
        // Fancy!
    }
}
