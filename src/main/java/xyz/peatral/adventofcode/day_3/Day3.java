package xyz.peatral.adventofcode.day_3;

import xyz.peatral.adventofcode.util.Util;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day3 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_3/input.txt");
        List<Integer> drawsList = Arrays.stream(input.get(0).split(",")).map(Integer::parseInt).collect(Collectors.toList());
        input.remove(0);
        input.remove(0);

        Map<Integer, Board> boards = readFromStrings(input);

        // A
        for (int round : drawsList) {
            boards.values().forEach(board -> board.markNumbers(round));

            Map<Integer, Board> winCheck = getWinningBoards(boards);
            if (winCheck.size() == 1) {
                winCheck.forEach((key, value) -> {
                    int score = value.getUnmarkedNumberSum() * round;
                    System.out.println(score);
                    System.out.println(key);
                });
                break;
            }
        }

        boards = readFromStrings(input);

        // B
        for (int round : drawsList) {
            boards.values().forEach(board -> board.markNumbers(round));

            Map<Integer, Board> winCheck = getWinningBoards(boards);
            if (winCheck.size() == 1 && boards.size() == 1) {
                winCheck.forEach((key, value) -> {
                    int score = value.getUnmarkedNumberSum() * round;
                    System.out.println(score);
                    System.out.println(key);
                });
                break;
            }

            boards = boards.entrySet().stream().filter(e -> !e.getValue().isFinished()).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        }
    }

    public static Map<Integer, Board> getWinningBoards(Map<Integer, Board> boards) {
        return boards.entrySet()
                .stream()
                .filter(e -> e.getValue().isFinished())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }

    public static Map<Integer, Board> readFromStrings(List<String> strings) {
        return IntStream.range(0, strings.size())
                .filter(i -> i % 6 == 0)
                .mapToObj(i -> new AbstractMap.SimpleEntry<>(i / 6, new Board(
                        IntStream.range(0, 5)
                                .mapToObj(y -> Arrays.stream(strings.get(i + y).split(" "))
                                        .filter(s -> !s.isBlank())
                                        .map(rowString -> new BoardEntry(Integer.parseInt(rowString.strip())))
                                )
                                .flatMap(boardEntryStream -> boardEntryStream)
                )))
                .collect(Collectors.toMap(AbstractMap.SimpleEntry::getKey, AbstractMap.SimpleEntry::getValue));
    }
}
