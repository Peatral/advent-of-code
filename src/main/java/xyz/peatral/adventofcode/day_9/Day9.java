package xyz.peatral.adventofcode.day_9;

import xyz.peatral.adventofcode.util.Util;

import java.util.List;

public class Day9 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_9/input.txt");

        // Part A
        long solutionA = input.stream()
                .map(s -> s.split(""))
                .mapToLong(s -> {
                    String line = "";
                    long score = 0;
                    for (int i = 0; i < s.length; i++) {
                        String currChar = s[i];
                        line += currChar;
                        Bracket bracket = Bracket.getFromClosing(currChar);
                        if (line.length() > 1 && bracket != null) {
                            String prevChar = line.substring(line.length() - 2, line.length() -1);
                            if (bracket.getOpening().equals(prevChar)) {
                                line = line.substring(0, line.length() - 2);
                            } else {
                                score = bracket.getScore();
                                break;
                            }
                        }
                    }
                    return score;
                })
                .sum();

        System.out.println(solutionA);

        // Part B
        long[] bScores = input.stream()
                .map(s -> s.split(""))
                .map(s -> {
                    String line = "";
                    for (int i = 0; i < s.length; i++) {
                        String currChar = s[i];
                        line += currChar;
                        Bracket bracket = Bracket.getFromClosing(currChar);
                        if (line.length() > 1 && bracket != null) {
                            String prevChar = line.substring(line.length() - 2, line.length() -1);
                            if (bracket.getOpening().equals(prevChar)) {
                                line = line.substring(0, line.length() - 2);
                            } else {
                                return "";
                            }
                        }
                    }
                    return line;
                })
                .filter(s -> !s.isEmpty())
                .map(s -> {
                    String end = "";
                    for (int i = s.length() - 1; i >= 0; i--) {
                        end += Bracket.getFromOpening(s.substring(i, i + 1)).getClosing();
                    }
                    return end.split("");
                })
                .mapToLong(s -> {
                    long score = 0;
                    for (String cls : s) {
                        score = score * 5 + Bracket.getFromClosing(cls).getAutocompleteScore();
                    }
                    return score;
                })
                .sorted()
                .toArray();

        int center = bScores.length / 2;
        long solutionB = bScores[center];

        System.out.println(solutionB);

        // Ok today we have code duplication, I may fix this later when I got time.
        // We iterate over the strings, append the last character, if we get an empty chunk we remove the whole chunk.
        // This lets the incomplete chunks be leftover / makes it easy to check when we get a non-matching closing bracket.
        // In part b I then generate the closing part by reverse iterating over the leftovers and get the closing bracket.
        // In the end I get the middle score and voilá.
    }
}
