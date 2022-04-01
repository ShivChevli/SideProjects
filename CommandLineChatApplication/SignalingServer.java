import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

class ClientDetail {
    String address;
    int peerPort;
    int serverPort;

    ClientDetail() {
    };

    ClientDetail(String add, int peerPort, int serverPort) {
        this.address = add;
        this.peerPort = peerPort;
        this.serverPort = serverPort;
    }

    void setInetAddress(String add) {
        this.address = add;
    }

    String getInetAddress() {
        return this.address;
    }

    void setPeerPort(int p) {
        this.peerPort = p;
    }

    long getPeerPort() {
        return this.peerPort;
    }

    void setServerPort(int p) {
        this.serverPort = p;
    }

    int getServerPort() {
        return this.serverPort;
    }

}

public class SignalingServer {
    public static void main(String[] args) throws Exception {
        Server ser = new Server(5555);

    }
}

class Server {

    final int SIZE = 20;
    DatagramSocket serverSocket;
    DataInputStream dataIn;
    DataInputStream dataInContinue;
    DataOutputStream dataOut;
    ClientDetail[] nodeList = new ClientDetail[SIZE];
    int top = -1;

    Server(int port) throws Exception {
        serverSocket = new DatagramSocket(port);
        byte[] receiveData = new byte[1024];
        byte[] sendData = new byte[1024];

        System.out.println("Server Is Runing on Port : " + port);

        while (true) {

            DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
            serverSocket.receive(receivePacket);

            parseData(receivePacket);
            Thread.sleep(1000);
            sendDataToNewConnection(receivePacket);
            if (top > 0) {
                updatePeerAboutConnection(receivePacket);
            }
        }
    }

    // Parse incomming data and store it in List
    void parseData(DatagramPacket receivePacket) {

        System.out.println("Parse Data Called :- ");
        String tempStr = new String(receivePacket.getData());

        // String Formated in from of server Listing port & Client TCP Port
        String split[] = tempStr.split("&");

        // System.out.println("Length :- " + split.length);
        System.out.println("Peer Port :- " + split[1]);
        System.out.println("Server Port :- " + split[0]);
        // for (int i = 0; i < split.length; i++) {
        // System.out.println(i + ":- " + split[i]);
        // }
        // long peerPort = Long.parseLong(split[1].trim());
        int peerPort = Integer.parseInt(split[1].trim());
        int serverPort = Integer.parseInt(split[0]);
        top++;
        nodeList[top] = new ClientDetail();
        nodeList[top].setPeerPort(peerPort);
        nodeList[top].setServerPort(serverPort);
        nodeList[top].setInetAddress(receivePacket.getAddress().getHostName());
    }

    // Send all avelable User data to Newly Connected Peer
    void sendDataToNewConnection(DatagramPacket receivePacket) throws Exception {
        System.out.println("Send Data to new Connection Called :- ");

        String data = "";
        int i = 0;

        // dataformat hostName1,PortNum1&hostName2,PortNum2&hostName3,portNum3&......
        for (i = 0; i < top; i++) {
            data += nodeList[i].getInetAddress() + "," + nodeList[i].getPeerPort() + "&";
        }

        System.out.println("Data has been Send to " + receivePacket.getAddress() + "  :-  " + data);
        byte sendData[] = data.getBytes();
        DatagramSocket ss = new DatagramSocket();
        DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length,
                InetAddress.getByName(nodeList[top].getInetAddress()), nodeList[top].getServerPort());
        ss.send(sendPacket);
        ss.close();
    }

    void updatePeerAboutConnection(DatagramPacket receivePacket) throws Exception {

        System.out.println("Update Peer ABout New Connection Called ");

        DatagramSocket ss = new DatagramSocket();
        String data = nodeList[top].getInetAddress() + "," + nodeList[top].getPeerPort() + "&";
        byte sendData[] = data.getBytes();
        int i = 0;
        for (i = 0; i < top; i++) {
            System.out.println("Updata Data Sent to " + InetAddress.getByName(nodeList[i].getInetAddress()) + " :-   "
                    + nodeList[i].getServerPort() + data);
            DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length,
                    InetAddress.getByName(nodeList[i].getInetAddress()), nodeList[i].getServerPort());
            ss.send(sendPacket);
        }
        ss.close();
    }
}