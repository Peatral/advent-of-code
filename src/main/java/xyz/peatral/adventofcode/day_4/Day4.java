package xyz.peatral.adventofcode.day_4;

import xyz.peatral.adventofcode.util.Util;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Day4 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_4/input.txt");

        // Part A
        long solutionA = input.stream()
                .map(line -> line.split(" -> "))
                .map(Line2DInt::new)
                .filter(Line2DInt::isStraight)
                .flatMap(line -> line.getAllPoints().stream())
                .collect(Collectors.toMap(Function.identity(), v -> 1L, Long::sum))
                .entrySet()
                .stream()
                .filter(e -> e.getValue() > 1L)
                .count();

        System.out.println(solutionA);

        // Part B
        long solutionB = input.stream()
                .map(line -> line.split(" -> "))
                .map(Line2DInt::new)
                .flatMap(line -> line.getAllPoints().stream())
                .collect(Collectors.toMap(Function.identity(), v -> 1L, Long::sum))
                .entrySet()
                .stream()
                .filter(e -> e.getValue() > 1L)
                .count();

        System.out.println(solutionB);

        // Notice that the only difference is, that part a has this  line :
        // .filter(Line2DInt::isStraight)
        // this remove all diagonal lines
    }
}
