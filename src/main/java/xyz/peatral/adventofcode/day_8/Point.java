package xyz.peatral.adventofcode.day_8;

import java.util.ArrayList;
import java.util.List;

public class Point {
    private int id;
    private int height;

    public Point(int id, int height) {
        this.id = id;
        this.height = height;
    }

    public int getHeight() {
        return height;
    }

    public int getRiskLevel() {
        return height + 1;
    }

    public List<Integer> getNeighbours(int width, int height) {
        List<Integer> list = new ArrayList<>();
        if (id - width >= 0) {
            list.add(id - width);
        }
        if (id % width > 0 && id - 1 >= 0) {
            list.add(id - 1);
        }
        if (id % width < width - 1 && id + 1 < width * height) {
            list.add(id + 1);
        }
        if (id + width < width * height) {
            list.add(id + width);
        }
        return list;
    }

    public long getBasinSize(List<Point> points, int width, int height) {
        return getBasinPoints(points, new ArrayList<>(), width, height).stream().map(points::get).count();
    }

    public List<Integer> getBasinPoints(List<Point> points, List<Integer> basinPoints, int width, int height) {
        basinPoints.add(id);

        getNeighbours(width, height).stream()
                .filter(i -> !basinPoints.contains(i))
                .map(points::get)
                .filter(point -> point.getHeight() < 9)
                .forEach(point -> basinPoints.addAll(
                        point.getBasinPoints(points, basinPoints, width, height)
                                .stream()
                                .filter(i -> !basinPoints.contains(i))
                                .toList()
                ));
        return basinPoints;
    }










}
