package Lab_7;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

/**
 * p7
 */
public class P7 {

    public static void main(String[] args) {
        Node graphRootNode = null;
        P7 obj = new P7();
        try {
            graphRootNode = obj.getGraph();
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Somthing went wrong ");
        }
        display(graphRootNode);
        display(graphRootNode);

    }

    private int min_max(Node graph, boolean isMin) {
        Queue<Node> tmpQue = graph.getChildNodes();
        int returnValue = -1;
        Node tmpNode = null;
        if (tmpQue == null) {
            returnValue = graph.getCost();
            graph.setTempCost(returnValue);
        } else if (graph.getTmpCost() != -1) {
            while (!tmpQue.isEmpty()) {
                min_max(tmpQue.remove(), isMin);
            }
        } else {
            if (isMin) {
                tmpNode = getMin(tmpQue);
                returnValue = tmpNode.getTmpCost();
            } else {
                tmpNode = getMax(tmpQue);
                returnValue = tmpNode.getTmpCost();
            }
        }
        return returnValue;
    }

    private Node getMin(Queue<Node> tmp) {
        Node ansNode = null;
        Node tmpNode = null;
        int tmpValue = -1;
        int minValue = Integer.MAX_VALUE;
        do {
            tmpNode = tmp.remove();
            tmpValue = tmpNode.getTmpCost();
            if (minValue > tmpValue) {
                minValue = tmpValue;
                if (ansNode != null) {
                    ansNode.setAnswer(false);
                }
                ansNode = tmpNode;
                ansNode.setAnswer(true);
            }
        } while (!tmp.isEmpty());
        ansNode.setTempCost(minValue);
        return ansNode;
    }

    private Node getMax(Queue<Node> tmp) {
        Node ansNode = null;
        Node tmpNode = null;
        int tmpValue = -1;
        int maxValue = Integer.MIN_VALUE;
        do {
            tmpNode = tmp.remove();
            tmpValue = tmpNode.getTmpCost();
            if (maxValue < tmpValue) {
                maxValue = tmpValue;
                if (ansNode != null) {
                    ansNode.setAnswer(false);
                }
                ansNode = tmpNode;
                ansNode.setAnswer(true);
            }
        } while (!tmp.isEmpty());
        ansNode.setTempCost(maxValue);
        return ansNode;
    }

    // private Node getMin(Node n, boolean isLeaf) {
    // int ans = Integer.MAX_VALUE;
    // Node ansNode = null;
    // Queue<Node> tmpQue = n.getChildNodes();
    // Node tmp;
    // Node lastTmp = null;
    // int tmpCost;
    // if (tmpQue != null && !tmpQue.isEmpty()) {
    // tmp = tmpQue.remove();
    // tmpCost = isLeaf ? tmp.getCost() : tmp.getTmpCost();
    // if (tmpCost < ans) {
    // ans = tmpCost;
    // if (ansNode != null) {
    // ansNode.setAnswer(false);
    // }
    // ansNode = tmp;
    // ansNode.setAnswer(true);
    // }
    // }
    // n.setTempCost(ans);
    // ansNode.setTempCost(ans);
    // return ansNode;
    // }

    // private Node getMax(Node n, boolean isLeaf) {
    // int ans = Integer.MIN_VALUE;
    // Node ansNode = null;
    // Queue<Node> tmpQue = n.getChildNodes();
    // Node tmp;
    // Node lastTmp = null;
    // int tmpCost;
    // if (tmpQue != null && !tmpQue.isEmpty()) {
    // tmp = tmpQue.remove();
    // tmpCost = isLeaf ? tmp.getCost() : tmp.getTmpCost();
    // if (tmpCost > ans) {
    // ans = tmpCost;
    // if (ansNode != null) {
    // ansNode.setAnswer(false);
    // }
    // ansNode = tmp;
    // ansNode.setAnswer(true);
    // }
    // }
    // n.setTempCost(ans);
    // ansNode.setTempCost(ans);
    // return ansNode;
    // }

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
        Queue<Node> subQue = null;
        que.add(start);
        Node traker = null;
        while (que != null && !que.isEmpty()) {
            traker = que.remove();
            System.out.println("Node : " + traker.getName());
            // System.out.println("Parent Name : " + traker.getParent() == null ? "Root" :
            // traker.getParent().getName());
            System.out.println("Node Level : " + traker.getLevel());
            subQue = traker.getChildNodes();
            while (subQue != null && !subQue.isEmpty()) {
                que.add(subQue.remove());
            }
        }
    }
}

class Node {
    int cost;
    int tempCost = -1;
    int level;
    boolean isAns = false;
    private char name;
    private Node parent;
    private Queue<Node> childNodes = null;
    Node correctNode = null;

    Node(Node parent, int cost, char n, int l) {
        this.parent = parent;
        this.cost = cost;
        this.name = n;
        this.level = l;
    }

    int getLevel() {
        return this.level;
    }

    void addChild(Node child) {
        if (this.childNodes == null) {
            this.childNodes = new LinkedList<Node>();
        }
        this.childNodes.add(child);
    }

    Queue<Node> getChildNodes() {
        return this.childNodes;
    }

    char getName() {
        return this.name;
    }

    void setCost(int cost) {
        this.cost = cost;
    }

    int getCost() {
        return this.cost;
    }

    void setCorrenctNode(Node node) {
        this.correctNode = node;
    }

    void setTempCost(int tmpCost) {
        this.tempCost = tmpCost;
    }

    int getTmpCost() {
        return this.tempCost;
    }

    Node getParent() {
        return this.parent;
    }

    void setAnswer(boolean isAns) {
        this.isAns = isAns;
    }

    boolean isAns() {
        return this.isAns;
    }
}