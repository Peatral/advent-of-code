package xyz.peatral.adventofcode.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Util {
    public static List<String> readFile(final String fileName) {
        List<String> list = new ArrayList<>();
        BufferedReader r = new BufferedReader(new InputStreamReader(getFileAsIOStream(fileName)));
        try {
            String line;
            while ((line = r.readLine()) != null) {
                list.add(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    public static InputStream getFileAsIOStream(final String fileName) {
        InputStream ioStream = Util.class
                .getClassLoader()
                .getResourceAsStream(fileName);

        if (ioStream == null) {
            throw new IllegalArgumentException(fileName + " is not found");
        }
        return ioStream;
    }
}
