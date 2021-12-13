package xyz.peatral.adventofcode.util;

import java.util.Objects;

public class Vector2DInt {
    private int x;
    private int y;

    public Vector2DInt(String coords) {
        this(coords.split(","));
    }

    public Vector2DInt(String[] coords) {
        this(coords[0], coords[1]);
    }

    public Vector2DInt(String x, String y) {
        this(Integer.parseInt(x), Integer.parseInt(y));
    }

    public Vector2DInt(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Vector2DInt vec = (Vector2DInt) obj;
        return this.x == vec.x && this.y == vec.y;
    }

    @Override
    public String toString() {
        return String.format("{%1$d, %2$d}", x, y);
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y);
    }
}
