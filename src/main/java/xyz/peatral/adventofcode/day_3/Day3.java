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

        List<Board> boards = readFromStrings(input);

        // A
        for (int round : drawsList) {
            boards.forEach(board -> board.markNumbers(round));

            List<Board> winCheck = getWinningBoards(boards);
            if (winCheck.size() == 1) {
                winCheck.forEach(board -> {
                    int score = board.getUnmarkedNumberSum() * round;
                    System.out.println(score);
                });
                break;
            }
        }

        boards = readFromStrings(input);

        // B
        for (int round : drawsList) {
            boards.forEach(board -> board.markNumbers(round));

            List<Board> winCheck = getWinningBoards(boards);
            if (winCheck.size() == 1 && boards.size() == 1) {
                winCheck.forEach(board -> {
                    int score = board.getUnmarkedNumberSum() * round;
                    System.out.println(score);
                });
                break;
            }

            boards = boards.stream().filter(board -> !board.isFinished()).collect(Collectors.toList());
        }
    }

    public static List<Board> getWinningBoards(List<Board> boards) {
        return boards.stream()
                .filter(Board::isFinished)
                .collect(Collectors.toList());
    }

    public static List<Board> readFromStrings(List<String> strings) {
        return IntStream.range(0, strings.size())
                .filter(i -> i % 6 == 0)
                .mapToObj(i -> new Board(
                        IntStream.range(0, 5)
                                .mapToObj(y -> Arrays.stream(strings.get(i + y).split(" "))
                                        .filter(s -> !s.isBlank())
                                        .map(rowString -> new BoardEntry(Integer.parseInt(rowString.strip())))
                                )
                                .flatMap(boardEntryStream -> boardEntryStream)
                ))
                .collect(Collectors.toList());
    }
}
