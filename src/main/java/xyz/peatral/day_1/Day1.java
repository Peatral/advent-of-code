package xyz.peatral.day_1;

import xyz.peatral.util.Util;

public class Day1 {
    public static void main(String[] args) {
        Submarine submarine = new Submarine();

        Util.readFile("day_1/input.txt").forEach(submarine::executeFunction);

        System.out.printf("Submarine is at %1$d, %2$d (%3$d)%n", submarine.getHorizontalPosition(), submarine.getDepth(), submarine.getHorizontalPosition() * submarine.getDepth());
    }
}
