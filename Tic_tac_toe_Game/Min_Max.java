package Lab_7;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

/**
 * P7_TRY_1
 */
public class Min_Max {
    public static void main(String[] args) {
        Node graphRootNode = null;
        Min_Max obj = new Min_Max();
        try {
            graphRootNode = obj.getGraph();
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Somthing went wrong ");
        }

        int cost = obj.min_max(graphRootNode, false);
        System.out.println("====================================================");
        System.out.println("Total Win Cost :- " + cost);
        obj.getPath(graphRootNode);
        System.out.println("====================================================");
        display(graphRootNode);

    }

    private int min_max(Node graph, boolean isMin) {
        LinkedList<Node> tmpQue = graph.getChild();
        int returnValue;
        int tmpResult;
        Node tmpNode;
        Node trackerNode;
        if (isMin) {
            returnValue = Integer.MAX_VALUE;
        } else {
            returnValue = Integer.MIN_VALUE;
        }
        int size = tmpQue.size();
        if (size == 0) {
            // System.out.println("return count at level " + graph.getLevel());
            returnValue = graph.getCost();
            graph.setTempCost(returnValue);
            graph.setAns(true);
        } else {
            if (isMin) {
                isMin = !isMin;
                // System.out.println("get on Min count at level " + graph.getLevel());
                trackerNode = tmpQue.get(0);
                for (int i = 0; i < size; i++) {
                    tmpNode = tmpQue.get(i);
                    tmpResult = min_max(tmpNode, isMin) + graph.getCost();
                    if (returnValue > tmpResult) {
                        returnValue = tmpResult;
                        trackerNode.setAns(false);
                        trackerNode = tmpNode;
                        tmpNode.setAns(true);
                    }
                }
                graph.setNextNode(trackerNode);
                // System.out.println("=================================================");
                // System.out.println("Min value count " + returnValue + " at level " +
                // graph.getLevel());
            } else {
                isMin = !isMin;
                // System.out.println("get on max count at level " + graph.getLevel());
                trackerNode = tmpQue.get(0);
                for (int i = 0; i < size; i++) {
                    tmpNode = tmpQue.get(i);
                    tmpResult = min_max(tmpNode, isMin) + graph.getCost();
                    if (returnValue < tmpResult) {
                        returnValue = tmpResult;
                        trackerNode.setAns(false);
                        trackerNode = tmpNode;
                        tmpNode.setAns(true);
                    }
                }
                graph.setNextNode(trackerNode);
                // System.out.println("=================================================");
                // System.out.println("Max value count " + returnValue + " at level " +
                // graph.getLevel());

            }
        }
        return returnValue;
    }

    static Node getGraph() throws Exception {
        char name = 'A';
        char tmpName = 'A';
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        Queue<Node> trackQueue = new LinkedList<Node>();
        int number_of_levele = 0;
        Node master = new Node(null, 0, name, 0);
        trackQueue.add(master);
        Node traveseNode;

        System.out.print("Enter Number oF Level in graph :- ");
        number_of_levele = Integer.parseInt(br.readLine());
        int i = 0, level = 0;
        int tmpCost;
        while (!trackQueue.isEmpty()) {
            // while (level <= number_of_levele) {

            traveseNode = trackQueue.remove();
            name = traveseNode.getName();
            level = traveseNode.getLevel() + 1;
            // get Number of Child for node
            if (level <= number_of_levele) {
                System.out.println("=============================================================");
                System.out.print("Enter Number of Child of " + name + " Node :- ");
                i = Integer.parseInt(br.readLine());

                // get Child Node for perticuler node
                while (i > 0) {
                    tmpName++;
                    System.out.print("Enter value to travel from Node " + name + " to " + tmpName + " :- ");
                    tmpCost = Integer.parseInt(br.readLine());
                    Node tmp = new Node(traveseNode, tmpCost, tmpName, level);
                    traveseNode.addChild(tmp);
                    trackQueue.add(tmp);
                    i--;
                }
                // keep track of Level
                name++;
            }

        }
        br.close();
        return master;
    }

    static void display(Node start) {
        Queue<Node> que = new LinkedList<Node>();
        LinkedList<Node> childeList = null;
        int size;
        que.add(start);
        Node traker = null;
        while (que != null && !que.isEmpty()) {
            traker = que.remove();
            // System.out.println("Node : " + traker.getName());
            // System.out.println("Node cost : " + traker.getCost());
            // System.out.println("Node Level : " + traker.getLevel());
            childeList = traker.getChild();
            size = childeList.size();
            for (int i = 0; i < size; i++) {
                que.add(childeList.get(i));
            }
        }
    }

    void getPath(Node start) {
        System.out.print("\nStart ->");
        while (start.getNextNode() != null) {
            System.out.print(start.getName() + " -> ");
            start = start.getNextNode();
        }
        System.out.print(start.getName() + " -> End\n");
    }

}

class Node {
    int cost = -1;
    int tempCost = -1;
    int level;
    boolean isAns = false;
    private char name;
    private Node parent;
    private LinkedList<Node> child = new LinkedList<Node>();
    Node nextNode = null;

    Node(Node parent, int cost, char n, int l) {
        this.parent = parent;
        this.cost = cost;
        this.name = n;
        this.level = l;
    }

    public Node getParent() {
        return parent;
    }

    public int getCost() {
        return cost;
    }

    public char getName() {
        return name;
    }

    public LinkedList<Node> getChild() {
        return child;
    }

    public void addChild(Node n) {
        this.child.add(n);
    }

    public int getLevel() {
        return level;
    }

    public void setAns(boolean isAns) {
        this.isAns = isAns;
    }

    public boolean isAns() {
        return isAns;
    }

    public int getTempCost() {
        return tempCost;
    }

    public void setTempCost(int tempCost) {
        this.tempCost = tempCost;
    }

    public Node getNextNode() {
        return nextNode;
    }

    public void setNextNode(Node nextNode) {
        this.nextNode = nextNode;
    }
}
