package Lab_7;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * TIC_TAC_TOE
 */
public class TIC_TAC_TOE {

    BufferedReader br;

    TIC_TAC_TOE() {
        this.br = new BufferedReader(new InputStreamReader(System.in));
    }

    public static void main(String[] args) throws Exception {
        TIC_TAC_TOE obj = new TIC_TAC_TOE();
        obj.play();
    }

    void play() {

        int board[] = new int[9];
        // printBord(board, true);
        System.out.println("System O and User X");
        printBord(board, true);
        int player = 1;
        for (int i = 0; i < 9; i++) {
            if (anylizeBoard(board) != 0) {
                break;
            }
            if ((i + player) % 2 == 0) {
                System.out.println("======================================================");
                System.out.println("System's Turn ");
                compTurn(board);
            } else {
                System.out.println("======================================================");
                System.out.println("User's Turn ");
                getUserInput(board);
            }
            printBord(board, false);
        }
        printBord(board, false);
        int x = anylizeBoard(board);
        if (x == 0) {
            System.out.println("\n\n======================================================");
            System.out.println("Match drow");
            System.out.println("======================================================");
        } else if (x == 1) {
            System.out.println("\n\n======================================================");
            System.out.println("System(O) wins!!!!!! and User(X) loose!!!!");
            System.out.println("======================================================");
        } else {
            System.out.println("\n\n======================================================");
            System.out.println("User(X) wins!!!!!! and System(O) loose!!!!");
            System.out.println("======================================================");
        }
    }

    int anylizeBoard(int b[]) {
        int ans = 0;
        int win[][] = {
                { 0, 1, 2 },
                { 3, 4, 5 },
                { 6, 7, 8 },
                { 0, 3, 6 },
                { 1, 4, 7 },
                { 2, 5, 8 },
                { 0, 4, 8 },
                { 2, 4, 6 }
        };

        for (int i = 0; i < 8; i++) {
            if (b[win[i][0]] != 0 && b[win[i][0]] == b[win[i][1]] && b[win[i][0]] == b[win[i][2]]) {
                ans = b[win[i][2]];
                break;
            }
        }
        return ans;

    }

    int min_max(int board[], int player) {
        int x = anylizeBoard(board);
        if (x != 0) {
            return x * player;
        }
        int pos = -1;
        int value = -2;
        int score = 0;
        for (int i = 0; i < 9; i++) {
            if (board[i] == 0) {
                board[i] = player;
                score = -min_max(board, player * -1);
                if (score > value) {
                    value = score;
                    pos = i;
                }
                board[i] = 0;
            }
        }
        if (pos == -1) {
            return 0;
        }
        return value;
    }

    void compTurn(int b[]) {
        int pos = -1;
        int value = -2;
        int score;
        for (int i = 0; i < 9; i++) {
            if (b[i] == 0) {
                b[i] = 1;
                score = -min_max(b, -1);
                b[i] = 0;
                if (score > value) {
                    value = score;
                    pos = i;
                }
            }
        }
        b[pos] = 1;
    }

    void printBord(int board[], boolean mark) {
        System.out.println("======================================================");
        for (int i = 0; i < 9; i++) {
            if (i > 0 && (i % 3) == 0) {
                System.out.print("\n");
            }
            if (board[i] == 0) {
                System.out.print(mark ? (i + 1) + " " : "- ");
            }
            if (board[i] == 1) {
                System.out.print("O ");
            } else if (board[i] == -1) {
                System.out.print("X ");
            }
        }
        System.out.println("");
    }

    void getUserInput(int board[]) {
        int pos = -1;
        while (pos == -1) {
            System.out.print("Enter X's Position : ");
            try {
                pos = Integer.parseInt(this.br.readLine());
            } catch (Exception e) {
                pos = -1;
                System.out.println("Enter Valid Position try again");
            }
            if (pos < 1 || pos > 9 || board[pos - 1] != 0) {
                System.out.println("Enter Valid Position try again" + pos + " : " + board[(pos - 1)]);
                pos = -1;
            }
        }
        board[pos - 1] = -1;
    }
}