package xyz.peatral.adventofcode.day_8;

import xyz.peatral.adventofcode.util.Util;

import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Day8 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_8/input.txt");

        int height = input.size();
        int width = input.get(0).length();

        String[] inputArray = String.join("", input).split("");

        List<Point> points = IntStream.range(0, width * height)
                .mapToObj(val -> new Point(val, Integer.parseInt(inputArray[val])))
                .toList();

        // Part A
        int riskSum = getLowPoints(points, width, height)
                .mapToInt(Point::getRiskLevel)
                .sum();

        System.out.println(riskSum);

        // Part B
        long basinValue = getLowPoints(points, width, height)
                .mapToLong(p -> p.getBasinSize(points, width, height))
                .map(operand -> ~operand).sorted().map(operand -> ~operand)
                .limit(3)
                .reduce(1, (a, b) -> a * b);

        System.out.println(basinValue);

        // It is not perfect but works, technically each point saves the index it is at in the points list (which is weird)
        // but i guess it works. I could have extracted the board into a seperate class and then pass it instead of the points
        // and width and height but ok.

        // Also notice at part b how i negate the values before sorting to reverse the order
        // The tilde is there instead of a minus because of Integer.MIN_VALUE although that won't happen
        // (bitwise complement vs minus)
    }

    public static Stream<Point> getLowPoints(List<Point> points, int width, int height) {
        return points.stream()
                .filter(point -> point.getNeighbours(width, height)
                        .stream()
                        .map(points::get)
                        .noneMatch(neighbor -> neighbor.getHeight() <= point.getHeight())
                );
    }
}
