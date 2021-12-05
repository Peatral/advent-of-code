package xyz.peatral.adventofcode.day_0;

import xyz.peatral.adventofcode.util.Util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Day0 {

    public static void main(String[] args) {
        // Part A
        System.out.println(Day0.calculateMeasurements(readInts("adventofcode/day_0/input.txt"), 1));
        // Part B
        System.out.println(Day0.calculateMeasurements(readInts("adventofcode/day_0/input.txt"), 3));
    }

    public static List<Integer> readInts(String fileName) {
        Stream<String> stream = Util.readFile(fileName).stream();
        if (stream != null) {
            return stream.map(Integer::parseInt).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    public static int calculateMeasurements(List<Integer> depths, int slideWindowSize) {
        int counter = 0;
        for (int i = slideWindowSize; i < depths.size(); i++) {
            int prev = 0;
            int next = 0;
            for (int j = 0; j < slideWindowSize; j++) {
                prev += depths.get(i - j - 1);
                next += depths.get(i - j);
            }

            if (next > prev) {
                counter++;
            }
        }
        return counter;
    }
}