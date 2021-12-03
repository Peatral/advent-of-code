package xyz.peatral.adventofcode.day_2;

import xyz.peatral.adventofcode.util.Util;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Day2 {
    public static void main(String[] args) {
        List<String> binary = Util.readFile("adventofcode/day_2/input.txt");

        // Part A
        int[] mostCommonBasic = getMostCommonBits(binary);
        String gamma = "";
        String epsilon = "";

        for (int i = 0; i < 12; i++) {
            if (mostCommonBasic[i] == 0) {
                gamma += "0";
                epsilon += "1";
            } else {
                gamma += "1";
                epsilon += "0";
            }
        }

        int powerconsumption = Integer.parseInt(gamma, 2) * Integer.parseInt(epsilon, 2);
        System.out.println(powerconsumption);

        // Part B
        // oxygen generator rating, most common
        List<String> filteredBinaryMost = new ArrayList<>(binary);
        for (int i = 0; i < 12 && filteredBinaryMost.size() > 1; i++) {
            int finalI = i;
            int[] mostCommon = getMostCommonBits(filteredBinaryMost);
            filteredBinaryMost = filteredBinaryMost.stream().filter(s -> Integer.parseInt(s.substring(finalI, finalI + 1)) == mostCommon[finalI]).collect(Collectors.toList());
        }
        int oxygenGeneratorRating = Integer.parseInt(filteredBinaryMost.get(0), 2);


        // CO2 scrubber rating, least common
        List<String> filteredBinaryLeast = new ArrayList<>(binary);
        for (int i = 0; i < 12 && filteredBinaryLeast.size() > 1; i++) {
            int finalI = i;
            int[] leastCommon = getLeastCommonBits(filteredBinaryLeast);
            filteredBinaryLeast = filteredBinaryLeast.stream().filter(s -> Integer.parseInt(s.substring(finalI, finalI + 1)) == leastCommon[finalI]).collect(Collectors.toList());
        }
        int co2ScrubberRating = Integer.parseInt(filteredBinaryLeast.get(0), 2);

        int lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

        System.out.println(lifeSupportRating);
    }

    public static int[] getMostCommonBits(List<String> binary) {
        int[][] counter = countBits(binary);

        int[] mostCommon = new int[12];

        for (int i = 0; i < 12; i++) {
            if (counter[i][0] > counter[i][1]) {
                mostCommon[i] = 0;
            } else {
                // 1 > 0, 1 == 0
                mostCommon[i] = 1;
            }
        }

        return mostCommon;
    }

    public static int[] getLeastCommonBits(List<String> binary) {
        int[][] counter = countBits(binary);

        int[] leastCommon = new int[12];

        for (int i = 0; i < 12; i++) {
            if (counter[i][1] < counter[i][0]) {
                // 1 < 0
                leastCommon[i] = 1;
            } else {
                // 0 < 1, 1 == 0
                leastCommon[i] = 0;
            }
        }

        return leastCommon;
    }

    public static int[][] countBits(List<String> binary) {
        int[][] counter = new int[][]{
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
        };

        binary.forEach(s -> {
            for (int i = 0; i < 12; i++) {
                if (s.charAt(i) == '0') {
                    counter[i][0] += 1;
                } else if (s.charAt(i) == '1') {
                    counter[i][1] += 1;
                }
            }
        });

        return counter;
    }
}