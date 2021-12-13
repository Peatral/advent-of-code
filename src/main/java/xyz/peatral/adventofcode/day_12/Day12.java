package xyz.peatral.adventofcode.day_12;

import xyz.peatral.adventofcode.util.Util;
import xyz.peatral.adventofcode.util.Vector2DInt;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Day12 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_12/input.txt");

        List<Vector2DInt> points = new ArrayList<>();
        List<String[]> directions = new ArrayList<>();

        boolean dir = false;
        for (String line : input) {
            if (line.isEmpty()) {
                dir = true;
                continue;
            }

            if (dir) {
                directions.add(line.replace("fold along ", "").split("="));
                continue;
            }

            points.add(new Vector2DInt(line));
        }

        int count = 0;
        for (String[] direction : directions) {
            int value = Integer.parseInt(direction[1]);
            switch (direction[0]) {
                case "x" -> points.stream()
                        .filter(v -> v.getX() > value)
                        .forEach(v -> v.setX(value - (v.getX() - value)));
                case "y" -> points.stream()
                        .filter(v -> v.getY() > value)
                        .forEach(v -> v.setY(value - (v.getY() - value)));
            }

            points = points.stream()
                    .distinct()
                    .collect(Collectors.toList());

            // Part A
            if (count++ < 1) {
                System.out.println(points.size());
            }
        }

        // Part B
        printBoard(points);
    }

    public static void printBoard(List<Vector2DInt> points) {
        int maxX = points.stream().mapToInt(Vector2DInt::getX).max().orElse(0);
        int maxY = points.stream().mapToInt(Vector2DInt::getY).max().orElse(0);

        StringBuilder builder = new StringBuilder();
        for (int y = 0; y <= maxY; y++) {
            for (int x = 0; x <= maxX; x++) {
                if (points.contains(new Vector2DInt(x, y))) {
                    builder.append("#");
                    continue;
                }

                builder.append(" ");
            }
            builder.append("\r\n");
        }
        System.out.println(builder);
    }
}
