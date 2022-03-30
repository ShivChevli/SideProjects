import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class ClientChatApp {

    static final int SIZE = 20;
    static PeerDetail peerList[] = new PeerDetail[SIZE];

    public static void main(String[] args) throws Exception {

        ServerConnection conn = new ServerConnection(5559, peerList);
        displayListOfActivateUser();
        while (true) {

        }

    }

    static void displayListOfActivateUser() {
        int i = 0;
        System.out.println("ALL activate User List");
        while (peerList[i] != null && i < SIZE) {
            System.out.println(i + ") " + peerList[i].displayDetail());
            i++;
        }

    }

    static void establizeConnection() {

    }
}

class PeerDetail {
    String address;
    int port;

    PeerDetail() {
    }

    PeerDetail(String add, int p) {
        this.address = add;
        this.port = p;
    }

    String displayDetail() {
        return this.address + " : " + this.port;
    }

    void setInetAddress(String add) {
        this.address = add;
    }

    void setPeerPort(int p) {
        this.port = p;
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
    int serverListenPort, peerListenPort;
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
        run();
    }

    @Override
    public void run() {
        byte[] receiveData = new byte[1024];
        try {

            System.out.println("Server Connection Listern Port Number :- " + this.serverListenPort);
            String registerData = new String(this.serverListenPort + "&" + this.peerListenPort);
            byte data[] = registerData.getBytes();

            DatagramPacket pecket = new DatagramPacket(data, data.length, InetAddress.getByName("localhost"), 5555);
            serverSocket.send(pecket);

            while (true) {
                System.out.println("data Recived From Servere");
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                serverSocket.receive(receivePacket);
                registerPeer(receivePacket);
            }

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    void registerPeer(DatagramPacket receivePacket) {
        int i = 0;
        String tempStr = new String(receivePacket.getData());
        System.out.println("New Connection Added to Server :- " + tempStr);
        String peerDataList[] = tempStr.split("&");
        String tempStr1[];
        for (i = 0; i < peerDataList.length; i++) {
            tempStr1 = peerDataList[i].split(",");
            if (tempStr1.length == 2) {
                peerList[top] = new PeerDetail();
                peerList[top].setInetAddress(tempStr1[0]);
                peerList[top].setPeerPort(Integer.parseInt(tempStr1[1]));

                System.out.println("Peer Port :- " + this.peerListenPort);
                System.out.println("Server Port :- " + this.serverListenPort);
                top++;
            } else {
                System.out.println("No Data Has been Recived");
            }
        }
    }

    PeerDetail[] getPeerList() {
        return peerList;
    }
}
