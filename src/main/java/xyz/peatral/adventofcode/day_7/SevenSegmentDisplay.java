package xyz.peatral.adventofcode.day_7;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SevenSegmentDisplay {
    private Map<String, String> mapping;

    public SevenSegmentDisplay() {
    }

    public void generateMapping(String... codeList) {

        // Count occurence of each character
        Map<String, Integer> charCounter = Arrays.stream(codeList)
                .flatMap(s -> Stream.of(s.split("")))
                .collect(Collectors.toMap(Function.identity(), s -> 1, Integer::sum));

        // Find the ones that can be identified by the amount of time they appear
        String b = getFromMapIntValue(charCounter, 6);
        String e = getFromMapIntValue(charCounter, 4);
        String f = getFromMapIntValue(charCounter, 9);

        // Find the unique digits by length
        String one = getStringByLength(2, codeList);
        String four = getStringByLength(4, codeList);
        String seven = getStringByLength(3, codeList);
        String eight = getStringByLength(7, codeList);

        // Find the different possibilities
        // One tells us what c and could be
        String cf = one;
        // Seven only has one more than one, so removing those we know what a is
        String a = seven.replaceAll("[" + cf + "]", "");
        // Removing those from we "know" we get the possibilities for b and d
        String bd = four.replaceAll("[" + cf + "]", "");
        // With what we currently know we can remove that from the eight code and get possibilities for e and g
        String eg = eight.replaceAll("[" + a + bd + cf + "]", "");

        // Because we could find the ones with unique amounts of appearance overall, we can find the remaining real ones
        String g = eg.replaceAll(e, "");
        String d = bd.replaceAll(b, "");
        String c = cf.replaceAll(f, "");

        // map the fakes to the reals
        this.mapping = new HashMap<>();
        this.mapping.put(a, "a");
        this.mapping.put(b, "b");
        this.mapping.put(c, "c");
        this.mapping.put(d, "d");
        this.mapping.put(e, "e");
        this.mapping.put(f, "f");
        this.mapping.put(g, "g");
    }

    private String getFromMapIntValue(Map<String, Integer> map, int value) {
        return map.entrySet().stream().filter(entry -> entry.getValue() == value).findFirst().get().getKey();
    }

    private String getStringByLength(int length, String... strings) {
        return Arrays.stream(strings).filter(s -> s.length() == length).findFirst().get();
    }

    public static int solve(String[] faultyCodes, String[] outputs) {
        SevenSegmentDisplay display = new SevenSegmentDisplay();
        display.generateMapping(faultyCodes);
        return display.decodeAndGetNumber(outputs);
    }

    public int decodeAndGetNumber(String... faultyCodes) {
        return getNumberFromCodes(Arrays.stream(faultyCodes)
                .map(this::convertToReal)
                .map(SevenSegmentDisplay::sortInput)
                .toArray(String[]::new));
    }

    private static int getNumberFromCodes(String... digitCodes) {
        return Integer.parseInt(Arrays.stream(digitCodes)
                .map(code -> String.valueOf(Digit.getFromCode(code).getDigit()))
                .collect(Collectors.joining()));
    }

    private String convertToReal(String code) {
        return Stream.of(code.split(""))
                .map(s -> mapping.get(s))
                .collect(Collectors.joining());
    }

    public static String sortInput(String input) {
        return Stream.of(input.split(""))
                .sorted()
                .collect(Collectors.joining());
    }

    public enum Digit {
        ZERO(0, "abcefg"),
        ONE(1, "cf"),           // Easy
        TWO(2, "acdeg"),
        THREE(3, "acdfg"),
        FOUR(4, "bcdf"),        // Easy
        FIVE(5, "abdfg"),
        SIX(6, "abdefg"),
        SEVEN(7, "acf"),        // Easy
        EIGHT(8, "abcdefg"),    // Easy
        NINE(9, "abcdfg");

        private int digit;
        private String code;

        Digit(int digit, String code) {
            this.digit = digit;
            this.code = code;
        }

        public int getDigit() {
            return digit;
        }

        public String getCode() {
            return code;
        }

        public static Digit getFromCode(String code) {
            for (Digit digit : values()) {
                if (digit.getCode().equals(code)) {
                    return digit;
                }
            }
            return null;
        }
    }
}
