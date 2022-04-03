import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;
import java.time.Period;

import javax.naming.TimeLimitExceededException;

public class ClientChatApp {

    static final int SIZE = 20;
    static PeerDetail peerList[] = new PeerDetail[SIZE];
    static PeerDetail watingQuea[] = new PeerDetail[SIZE];

    public static void main(String[] args) throws Exception {

        int choice = 0;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        PeerConnectionServer tempPer = new PeerConnectionServer(watingQuea);
        Thread conn = new ServerConnection(tempPer.getPeerPort(), peerList);
        Thread peer = (Thread) tempPer;
        // Thread mainAction = new Action(peerList, watingQuea);
        peer.start();
        conn.start();
        Thread.sleep(1000);

        do {
            System.out.println("============================== Menue =============================");
            System.out.println("1. List All Connection");
            System.out.println("4. Exit");
            System.out.print("Select Action : ");
            try {
                choice = Integer.parseInt(br.readLine().trim());
            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("Enter Only Number\n Try Again");
                choice = 0;
                continue;
            }

            switch (choice) {
                case 1:
                    displayListOfActivateUser();
                    break;

                case 4:
                    System.out.println("Thank you");
                    choice = 4;
                    conn.interrupt();
                    peer.interrupt();
                    System.out.println("Servere Inteeupt :- " + conn.isInterrupted());
                    System.out.println("Peer Inteeupt :- " + peer.isInterrupted());
                    break;

                default:
                    System.out.println("Enter Valid Number");
                    break;
            }

        } while (choice != 4);
        System.out.println("After While Loop end");

        // Thread.sleep(2000);
        // System.exit(0);
        // mainAction.start();
    }

    static void displayListOfActivateUser() {
        int i = 0;
        System.out.println("============================================================");
        System.out.println("ALL activate User List");
        while (peerList[i] != null && i < SIZE) {
            System.out.println(peerList[i].displayDetail());
            i++;
        }

    }

    static void establizeConnection() {

    }
}

class PeerDetail {
    String address;
    int port, id;

    PeerDetail() {
    }

    PeerDetail(String add, int p) {
        this.address = add;
        this.port = p;
    }

    String displayDetail() {
        return this.id + " : " + this.address + " : " + this.port;
    }

    void setId(int i) {
        this.id = i;
    }

    void setInetAddress(String add) {
        this.address = add;
    }

    void setPeerPort(int p) {
        this.port = p;
    }

    int getId() {
        return this.id;
    }

    String getInetAddress() {
        return this.address;
    }

    int getPeerPort() {
        return this.port;
    }
}

class ServerConnection extends Thread {

    PeerDetail peerList[];
    DatagramSocket serverSocket;
    int serverListenPort, peerListenPort, id;
    int top = 0;
    DataInputStream dataIn;
    DataOutputStream dataOut;

    // Register Itself to Signaling Server
    ServerConnection(int peerListenPort, PeerDetail p[]) throws Exception {

        try {
            serverSocket = new DatagramSocket();
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Server is not Created ");
            System.exit(1);
        }
        this.serverListenPort = serverSocket.getLocalPort();
        this.peerListenPort = peerListenPort;
        peerList = p;
        // run();
    }

    @Override
    public void run() {
        byte[] receiveData = new byte[1024];
        try {

            System.out.println("Server Connection Listern Port Number :- " + this.serverListenPort);
            String registerData = new String(1 + "&" + this.serverListenPort + "&" + this.peerListenPort + "&");
            byte data[] = registerData.getBytes();

            DatagramPacket pecket = new DatagramPacket(data, data.length, InetAddress.getByName("localhost"), 5555);
            serverSocket.send(pecket);

            while (!Thread.currentThread().isInterrupted()) {
                data = new byte[1024];
                // System.out.println("data Recived From Servere");
                DatagramPacket receivePacket = new DatagramPacket(data, data.length);
                try {
                    serverSocket.setSoTimeout(1000);
                    serverSocket.receive(receivePacket);
                    registerPeer(receivePacket);
                } catch (SocketTimeoutException ex) {
                    // System.out.println("Check for another Time");
                }
            }

            registerData = new String(4 + "&" + this.id + "&");
            data = registerData.getBytes();

            pecket = new DatagramPacket(data, data.length, InetAddress.getByName("localhost"), 5555);
            serverSocket.send(pecket);

            System.out.println("Loop Exited");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    void registerPeer(DatagramPacket receivePacket) {
        int i = 0;
        String tempStr = new String(receivePacket.getData());
        System.out.println("Data from Server  :- " + tempStr);
        String peerDataList[] = tempStr.split("&");
        String tempStr1[];
        for (i = 0; i < peerDataList.length - 1; i++) {

            tempStr1 = peerDataList[i].split(",");
            if (tempStr1.length == 3) {

                peerList[top] = new PeerDetail();
                // System.out.println("Peer Port :- " + tempStr1[0]);
                // System.out.println("Server Port :- " + tempStr1[1]);
                // System.out.println("Error Line :- " + tempStr1[1]);
                // System.out.println("=====================================================================");
                peerList[top].setId(Integer.parseInt(tempStr1[0]));
                peerList[top].setInetAddress(tempStr1[1]);
                peerList[top].setPeerPort((int) Integer.parseUnsignedInt(tempStr1[2]));

                // System.out.println("Peer Port :- " + this.peerListenPort);
                // System.out.println("Server Port :- " + this.serverListenPort);
                top++;
            } else if (tempStr1.length != 1) {

                int action = Integer.parseInt(tempStr1[0]);
                if (action == 1) {
                    peerList[top] = new PeerDetail();
                    peerList[top].setId(Integer.parseInt(tempStr1[1]));
                    peerList[top].setInetAddress(tempStr1[2]);
                    peerList[top].setPeerPort((int) Integer.parseUnsignedInt(tempStr1[3]));
                    top++;

                } else if (action == 5) {
                    this.id = Integer.parseInt(tempStr1[1]);
                } else if (action == 4) {
                    int tempId = Integer.parseInt(tempStr1[1]);
                    int j;
                    for (j = 0; j < top; j++) {
                        if (peerList[j].getId() == tempId) {
                            peerList[j] = peerList[j + 1];
                            break;
                        }
                    }
                    while (j < top) {
                        peerList[j] = peerList[j + 1];
                        j++;
                    }
                    top--;
                }

            } else {
                System.out.println("No Data Has been Recived");
            }
        }
    }

    PeerDetail[] getPeerList() {
        return peerList;
    }
}

class PeerConnectionServer extends Thread {
    PeerDetail incommingQuea[];
    ServerSocket peerSocket;
    Socket currentSocket;
    int serverListenPort, peerListenPort;
    int top = 0;
    DataInputStream dataIn;
    DataOutputStream dataOut;

    // Register Itself to Signaling Server
    PeerConnectionServer(PeerDetail p[]) throws Exception {

        try {
            this.peerSocket = new ServerSocket((int) Math.random() * 10000);
            System.out.println("Peer Socket Created :- " + peerSocket.getLocalPort());
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Server is not Created ");
            System.exit(1);
        }
        this.peerListenPort = this.peerSocket.getLocalPort();
        this.incommingQuea = p;
    }

    @Override
    public void run() {

        try {

            // System.out.println("Peer Connection Listern Port Number :- " +
            // this.peerListenPort);

            while (!Thread.interrupted()) {
                try {
                    peerSocket.setSoTimeout(1000);
                    currentSocket = peerSocket.accept();
                    System.out.println("Request Recived from Peer ");
                    addTOQuea(currentSocket);
                } catch (SocketTimeoutException ex) {
                    // System.out.println("Peer Socket time out Check Aother Time ");
                }
            }
            System.out.println("Peer Loop Exited");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    int getPeerPort() {
        return this.peerListenPort;
    }

    void addTOQuea(Socket s) {

        try {
            dataIn = new DataInputStream(s.getInputStream());
            dataOut = new DataOutputStream(s.getOutputStream());

            String data = dataIn.readUTF();
            System.out.println("Request String From Peer : " + data);

        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Error occure At function AddTOQuea Function");
            e.printStackTrace();

        }

    }

}