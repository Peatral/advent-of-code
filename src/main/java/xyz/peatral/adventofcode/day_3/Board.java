package xyz.peatral.adventofcode.day_3;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Board {
    public static final int BOARD_SIZE = 5;
    private final List<BoardEntry> entries;

    public Board(Stream<BoardEntry> stream) {
        this(stream.collect(Collectors.toList()));
    }

    public Board(List<BoardEntry> list) {
        entries = list;
    }

    public BoardEntry getEntry(int x, int y) {
        return entries.get(x + BOARD_SIZE * y);
    }

    public void markNumbers(int number) {
        entries.stream()
                .filter(e -> number == e.getNumber())
                .forEach(BoardEntry::mark);
    }

    public int getUnmarkedNumberSum() {
        return entries.stream()
                .filter(boardEntry -> !boardEntry.isMarked())
                .map(BoardEntry::getNumber)
                .mapToInt(Integer::intValue)
                .sum();

    }

    public boolean isFinished() {
        boolean rows = IntStream.range(0, BOARD_SIZE).mapToObj(y -> entries
                .subList(y * BOARD_SIZE, y * BOARD_SIZE + BOARD_SIZE)
                .stream()
                .filter(BoardEntry::isMarked)
                .count() == BOARD_SIZE)
                .anyMatch(b -> b);

        boolean cols = IntStream.range(0, BOARD_SIZE)
                .mapToObj(x -> IntStream.range(0, entries.size())
                        .filter(index -> (index + BOARD_SIZE - x) % BOARD_SIZE == 0)
                        .mapToObj(entries::get)
                        .filter(BoardEntry::isMarked)
                        .count() == BOARD_SIZE
                ).anyMatch(b -> b);

        return rows || cols;
    }

    @Override
    public String toString() {
        StringBuilder s = new StringBuilder();
        int c = 0;
        for (BoardEntry e : entries) {
            s.append(String.format("%02d ", e.getNumber()));
            c++;
            if (c == BOARD_SIZE) {
                s.append("\n");
            }
            c %= BOARD_SIZE;

        }
        return s.toString();
    }
}
