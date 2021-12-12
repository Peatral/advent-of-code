package xyz.peatral.adventofcode.day_11;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CaveMap {
    /**
     * A list of all double edges in the graph
     */
    private List<Edge> connections;
    /**
     * A map of all directed edges with the node they blong to
     */
    private Map<String, List<String>> connectionMap;
    /**
     * A list of all nodes in the graph
     */
    private Map<String, Node> caves;

    private TreeNode root;

    /**
     * Builds a graph from a list of edges
     *
     * @param connections The edges
     */
    public CaveMap(List<Edge> connections) {
        this(connections, connections.stream()
                .flatMap(edge -> edge.getNodes().stream())
                .distinct()
                .collect(Collectors.toMap(Function.identity(), Node::new, (a, b) -> a)));
    }

    /**
     * Builds a graph from edges and nodes
     * Edges with missing nodes don't get discarded
     *
     * @param connections The edges
     * @param caves The nodes
     */
    private CaveMap(List<Edge> connections, Map<String, Node> caves) {
        this.connections = connections;
        this.caves = caves;
        this.connectionMap = caves.keySet()
                .stream()
                .collect(Collectors.toMap(Function.identity(), this::getAllNextCaves, (a, b) -> Stream.of(a, b)
                        .flatMap(List::stream)
                        .toList())
                );
    }

    /**
     * Get all nodes you can visit from the specified node in the Graph
     * @param cave The start node
     * @return All nodes you can visit
     */
    private List<String> getAllNextCaves(String cave) {
        return connections.stream().filter(e -> e.getNodes().contains(cave)).map(e -> e.other(cave)).collect(Collectors.toList());
    }

    /**
     * Solves all paths and returns the amount of paths which conform the rules.
     * This is done by generating a tree holding all available paths.
     * This gets internally stored.
     * The amount of valid paths is calculated by the amount of all valid endpoints.
     *
     * @param allowOneTwice is a single small node allowed to be visited twice?
     * @return the amount of paths
     */
    public long solve(boolean allowOneTwice) {
        this.root = buildNodes("start", null, allowOneTwice);
        return this.root.getLeafs()
                .stream()
                .filter(leaf -> caves.get(leaf.getName()).isEnd()).count();
    }

    /**
     * Builds the tree recursivly, following the rules.
     * This is the part where a tree is used to get all paths.
     * Don't confuse "Node" (TreeNode) with "Node" (Graph node) in the following context
     *
     * @param name The name of the node to build
     * @param parent The parent of the node to build
     * @param allowOneTwice is a single small node allowed to be visited twice?
     * @return the generated node
     */
    public TreeNode buildNodes(final String name, final TreeNode parent, final boolean allowOneTwice) {
        // The current node in the tree
        TreeNode currentNode = new TreeNode(caves.get(name), parent);

        // The path leading to this node (the path also includes the node itself which is important
        // Also because of the recursive nature the path is in reverse
        List<String> path = currentNode.getPathStrings();

        // A map where the nodes and often they are visited is stored
        Map<String, Integer> pathCounter = path.stream()
                .collect(Collectors.toMap(Function.identity(), c -> 1, Integer::sum));

        // The map above but only for small nodes
        Map<String, Integer> pathCounterSmall = pathCounter.entrySet()
                .stream()
                .filter(e -> !caves.get(e.getKey()).isBig())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, Integer::sum));

        // What is the largest amount a small node has been visited?
        int repetitionSmallCave = pathCounterSmall
                .values()
                .stream()
                .mapToInt(i -> i)
                .max()
                .orElse(0);


        // Only if this is not the end, we don't want to generate further than thar
        if (!caves.get(name).isEnd()) {
            // Generate the branches of the current node
            // Big nodes are always allowed, small nodes only once or a single one twice if specified
            // The start is forbidden
            currentNode.setBranches(getAllNextCaves(name).stream()
                    .filter(cn -> !caves.get(cn).isStart())
                    .filter(cn -> !(pathCounter.containsKey(cn) && !caves.get(cn).isBig()) || (allowOneTwice && repetitionSmallCave < 2))
                    .distinct()
                    .map(cn -> buildNodes(cn, currentNode, allowOneTwice))
                    .collect(Collectors.toList()));
        }

        return currentNode;
    }

    @Override
    public String toString() {
        return caves.keySet() + "\n" + connections.toString() + "\n" + connectionMap.toString();
    }
}
