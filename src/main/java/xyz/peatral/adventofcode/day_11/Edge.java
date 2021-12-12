package xyz.peatral.adventofcode.day_11;

import java.util.List;

public class Edge {
    private String a;
    private String b;

    public Edge(String a, String b) {
        this.a = a;
        this.b = b;
    }

    public String getA() {
        return a;
    }

    public String getB() {
        return b;
    }

    public List<String> getNodes() {
        return List.of(a, b);
    }

    public String other(String x) {
        if (x.equals(a)) {
            return b;
        } else if (x.equals(b)) {
            return a;
        } else {
            return "";
        }
    }

    @Override
    public String toString() {
        return a + " <-> " + b;
    }
}
