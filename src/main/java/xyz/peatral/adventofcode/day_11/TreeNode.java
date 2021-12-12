package xyz.peatral.adventofcode.day_11;

import java.util.ArrayList;
import java.util.List;

public class TreeNode {
    private Node value;
    private TreeNode parent;
    private List<TreeNode> branches;

    public TreeNode(Node value, List<TreeNode> branches, TreeNode parent) {
        this.value = value;
        this.branches = branches;
        this.parent = parent;
    }

    public TreeNode(Node value, TreeNode parent) {
        this(value, new ArrayList<>(), parent);
    }

    public List<String> getPathStrings() {
        return getPath().stream().map(node -> node.value.getName()).toList();
    }

    public List<TreeNode> getPath() {
        List<TreeNode> path = new ArrayList<>();
        TreeNode next = this;
        while (next != null) {
            path.add(next);
            next = next.parent;
        }
        return path;
    }

    public void setBranches(List<TreeNode> branches) {
        this.branches = branches;
    }

    public boolean isLeaf() {
        return branches.isEmpty();
    }

    public String getName() {
        return value.getName();
    }

    public List<TreeNode> getLeafs() {
        List<TreeNode> leafs = new ArrayList<>();
        if (isLeaf()) {
            leafs.add(this);
            return leafs;
        }
        branches.forEach(branch -> leafs.addAll(branch.getLeafs()));
        return leafs;
    }

    @Override
    public String toString() {
        return getName();
    }
}
