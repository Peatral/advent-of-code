package xyz.peatral.adventofcode.day_4;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Line2DInt {
    private Vector2DInt a;
    private Vector2DInt b;

    public Line2DInt(String[] coords) {
        this(new Vector2DInt(coords[0]), new Vector2DInt(coords[1]));
    }

    public Line2DInt(Vector2DInt a, Vector2DInt b) {
        this.a = a;
        this.b = b;
    }

    public Vector2DInt getA() {
        return a;
    }

    public void setA(Vector2DInt a) {
        this.a = a;
    }

    public Vector2DInt getB() {
        return b;
    }

    public void setB(Vector2DInt b) {
        this.b = b;
    }

    public boolean isStraight() {
        return a.getX() == b.getX() || a.getY() == b.getY();
    }

    public boolean isDiagonal() {
        return Math.abs(a.getX() - b.getX()) == Math.abs(a.getY() - b.getY());
    }

    public List<Vector2DInt> getAllPoints() {
        List<Vector2DInt> list = new ArrayList<>();

        if (a.getX() == b.getX()) {
            int x = a.getX();
            int maxY = Math.max(a.getY(), b.getY());
            int minY = Math.min(a.getY(), b.getY()) + 1;

            list.add(a);
            list.add(b);

            if (minY == maxY) {
                return list;
            }
            list.addAll(IntStream.range(minY, maxY).mapToObj(y -> new Vector2DInt(x, y)).toList());
            return list;
        }

        if (a.getY() == b.getY()) {
            int y = a.getY();
            int maxX = Math.max(a.getX(), b.getX());
            int minX = Math.min(a.getX(), b.getX()) + 1;

            list.add(a);
            list.add(b);

            if (minX == maxX) {
                return list;
            }
            list.addAll(IntStream.range(minX, maxX).mapToObj(x -> new Vector2DInt(x, y)).toList());
            return list;
        }

        if (isDiagonal()) {
            int startX = a.getX();
            int startY = a.getY();
            int endX = b.getX();
            int endY = b.getY();

            int factorX = startX > endX ? -1 : 1;
            int factorY = startY > endY ? -1 : 1;

            list.add(b);

            for (int x = startX; x != endX; x += factorX) {
                for (int y = startY; y != endY; y += factorY) {
                    if (Math.abs(x - startX) == Math.abs(y - startY)) {
                        list.add(new Vector2DInt(x, y));
                    }
                }
            }
            return list;
        }

        return list;
    }
}
