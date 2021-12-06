package xyz.peatral.adventofcode.day_5;

import xyz.peatral.adventofcode.util.Util;

import java.util.Arrays;
import java.util.stream.LongStream;

public class Day5 {
    public static void main(String[] args) {
        // Part A
        System.out.println(LongStream.of(runPopulation(readFishFromFile("adventofcode/day_5/input.txt"), 80)).sum());

        // Part B
        System.out.println(LongStream.of(runPopulation(readFishFromFile("adventofcode/day_5/input.txt"), 256)).sum());
    }

    public static long[] runPopulation(long[] fishes, int days) {
        for (int day = 0; day < days; day++) {
            long reproducingFish = fishes[0];
            System.arraycopy(fishes, 1, fishes, 0, 8);
            fishes[6] += reproducingFish;
            fishes[8] = reproducingFish;
        }
        return fishes;
    }

    public static long[] readFishFromFile(String fileName) {
        long[] fishes = new long[9];
        Arrays.stream(Util.readFile(fileName)
                        .get(0)
                        .split(","))
                .map(Integer::parseInt)
                .forEach(i -> fishes[i]++);
        return fishes;
    }
}
