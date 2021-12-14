package xyz.peatral.adventofcode.day_13;

import xyz.peatral.adventofcode.util.Util;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

public class Day13 {
    public static void main(String[] args) {
        List<String> input = Util.readFile("adventofcode/day_13/input.txt");

        String startingTemplate = input.get(0);

        Map<String, String> insertionRules = input.subList(2, input.size()).stream().map(rule -> rule.split(" -> ")).collect(Collectors.toMap(rule -> rule[0], rule -> rule[1]));

        // Part A: Naive approach (actually slower than part b with more rounds)
        String modifiedTemplate = startingTemplate;
        // Evaluate rounds
        for (int i = 0; i < 10; i++) {
            // Iterate over string
            String counter = "";
            for (String c : modifiedTemplate.split("")) {
                counter += c;

                // If we have a minimum of 1 bond
                if (counter.length() > 1) {
                    // Check if we have to apply a rule
                    for (Map.Entry<String, String> e : insertionRules.entrySet()) {
                        if (counter.toString().endsWith(e.getKey())) {
                            // apply that rule to the iterator
                            counter = counter.substring(0, counter.length() - 1) + e.getValue() + counter.substring(counter.length() - 1);
                            break;
                        }
                    }
                }
            }

            // apply the iterator to the template
            modifiedTemplate = counter;
        }

        // count occurences
        Map<String, Long> occurences = Arrays.stream(modifiedTemplate.split("")).collect(Collectors.toMap(Function.identity(), c -> 1L, Long::sum));

        long min = getMinFromMap(occurences);
        long max = getMaxFromMap(occurences);
        System.out.println(max - min);



        // Part B
        // Put all doubles in a map (abc -> a: 1, ab: 1, bc: 1, c:1)
        Map<String, Long> polymer = new HashMap<>();
        for (int i = 0; i < startingTemplate.length() - 1; i++) {
            String combo = startingTemplate.substring(i, i + 2);
            insertLong(polymer, combo, 1L);
        }
        insertLong(polymer, startingTemplate.substring(0, 1), 1);
        insertLong(polymer, startingTemplate.substring(startingTemplate.length() - 1), 1);

        // Evaluate rounds
        for (int i = 0; i < 40; i++) {
            // Store all operations on the template
            Map<String, Long> operations = new HashMap<>();
            for (Map.Entry<String, String> e : insertionRules.entrySet()) {
                if (polymer.containsKey(e.getKey())) {
                    // Create operation
                    // remove bond
                    insertLong(operations, e.getKey(), -polymer.get(e.getKey()));
                    // add 2 new bonds
                    insertLong(operations, e.getKey().split("")[0] + e.getValue(), polymer.get(e.getKey()));
                    insertLong(operations, e.getValue() + e.getKey().split("")[1], polymer.get(e.getKey()));
                }
            }

            // apply operations
            for (Map.Entry<String, Long> operation : operations.entrySet()) {
                insertLong(polymer, operation.getKey(), operation.getValue());
            }
        }

        // count all occurences
        occurences = polymer.entrySet()
                .stream()
                .flatMap(e -> Arrays.stream(e.getKey().split("")).map(c -> new AbstractMap.SimpleEntry<>(c, e.getValue())))
                .collect(Collectors.toMap(AbstractMap.SimpleEntry::getKey, AbstractMap.SimpleEntry::getValue, Long::sum));

        // divide all occurences by 2 because the are doubled
        // (abc -> a: 1, ab: 1, bc: 1, c: 1 -> a: 2, b: 2, c: 2 -> a: 1, b: 1, c: 1)
        for (String key : occurences.keySet()) {
            occurences.put(key, occurences.get(key) / 2);
        }

        min = getMinFromMap(occurences);
        max = getMaxFromMap(occurences);
        System.out.println(max - min);


        // Today it is time again for a optimization problem
        // As you can tell I implemented both approaches, the naive and the optimized one
        // The naive implementation is actually quite the amount slower than the second,
        // although it only computes a fourth of the rounds (and therefore waaaaay less operations)
        // The naive one works like you would expect it to, apply the operations on the string
        // and count the occurences
        // The optimized one only counts the occurences of the bonds
        // (and the first and last element, I could also add 1 where I counted an odd amount before dividing it by 2, but that's not important)
        // When doing an operation you remove the original bond (because it was split)
        // and add the 2 new ones that were created
        // Doing this for every bond yields the right amount of bonds
        // Counting it I have to divide everything by 2 because I look at the bonds I have every element doubled
        // (e.g. ab makes up the bonds a and b as start and end and ab as the middle. 1 a, 1 b, 1 ab gives me 2 as and bs)
        // The second approach is only possible because we aren't actually interested in the finished polymer

    }

    public static void insertLong(Map<String, Long> map, String key, long value) {
        if (map.containsKey(key)) {
            map.put(key, map.get(key) + value);
            return;
        }

        map.put(key, value);
    }

    public static LongStream longStreamFromMap(Map<String, Long> map) {
        return map.values().stream().mapToLong(l -> l);
    }

    public static long getMinFromMap(Map<String, Long> map) {
        return longStreamFromMap(map).min().orElse(0);
    }

    public static long getMaxFromMap(Map<String, Long> map) {
        return longStreamFromMap(map).max().orElse(0);
    }
}
