package xyz.peatral.adventofcode.day_10;

import xyz.peatral.adventofcode.util.Util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day10 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_10/input.txt");

        int width = input.get(0).length();
        int height = input.size();


        // Part A
        List<Octopus> octopie = getOctopie(input);

        int flashes = IntStream.range(0, 100)
                .map(round -> round(octopie, width, height))
                .sum();

        System.out.println(flashes);

        // Part B
        List<Octopus> octopieB = getOctopie(input);

        boolean found = false;
        int round = 0;
        while (!found) {
            if (round(octopieB, width, height) == octopieB.size()) {
                found = true;
            }
            round++;
        }

        System.out.println(round);
    }

    public static int round(List<Octopus> octopie, int width, int height) {
        int count = 0;
        octopie.stream()
                .peek(Octopus::resetFlashed)
                .forEach(Octopus::incrementEnergy);

        while (stillFlashes(octopie)) {
            count += flash(octopie, width, height);
        }
        return count;
    }

    public static boolean stillFlashes(List<Octopus> octopie) {
        return octopie.stream()
                .filter(Octopus::hasToFlash)
                .anyMatch(octopus -> !octopus.hasFlashed());
    }
    
    public static int flash(List<Octopus> octopie, int width, int height) {
        List<Integer> flashing = IntStream.range(0, octopie.size())
                .filter(idx -> octopie.get(idx).hasToFlash())
                .filter(idx -> !octopie.get(idx).hasFlashed())
                .peek(idx -> octopie.get(idx).flash())
                .boxed()
                .collect(Collectors.toList());

        flashing.stream()
                .flatMap(idx -> getSurroundingOctopus(idx, width, height).stream())
                .filter(idx -> !octopie.get(idx).hasFlashed())
                .forEach(idx -> octopie.get(idx).incrementEnergy());

        return flashing.size();
    }

    public static List<Octopus> getOctopie(List<String> input) {
        return input.stream()
                .flatMap(s -> Arrays.stream(s.split("")))
                .map(Integer::parseInt)
                .map(Octopus::new)
                .toList();
    }

    public static List<Integer> getSurroundingOctopus(int idx, int width, int height) {
        List<Integer> list = new ArrayList<>();
        for (int y = Math.max(0, idxToY(idx, width) - 1); y < Math.min(idxToY(idx, width) + 2, height); y++) {
            for (int x = Math.max(0, idxToX(idx, width) - 1); x < Math.min(idxToX(idx, width) + 2, width); x++) {
                int neighborIdx = XYtoIdx(x, y, width);
                if (neighborIdx != idx) {
                    list.add(neighborIdx);
                }
            }
        }
        return list;
    }

    public static int idxToX(int idx, int width) {
        return idx % width;
    }

    public static int idxToY(int idx, int width) {
        return idx / width;
    }

    public static int XYtoIdx(int x, int y, int width) {
        return x + y * width;
    }

    public static void printOctopie(List<Octopus> octopie, int width, int height) {
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                System.out.print(octopie.get(XYtoIdx(x, y, width)).getEnergyLevel());
            }
            System.out.println("");
        }
    }
}
