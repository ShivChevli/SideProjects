
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.ServerSocket;
import java.net.*;

import javax.xml.namespace.QName;

/**
 * @author admin
 *
 */
public class ClientChatAppUDP {

    static Socket s;
    static DatagramSocket ss;
    static DataInputStream din;
    static DataOutputStream dout;
    static InetAddress IPAddress;

    static int port;
    static int sport;

    /**
     * @param args
     */
    public static void main(String[] args) throws Exception {
        // TODO Auto-generated method stub
        int choice;
        byte[] sendData = new byte[1024];
        byte[] receiveData = new byte[1024];
        String str;
        String host;

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        try {
            System.out.print("Enter Server Port Number :- ");
            sport = Integer.parseInt(br.readLine().trim());

        } catch (Exception e) {
            // TODO: handle exception
            sport = 5559;
        }

        ss = new DatagramSocket(sport);

        System.out.println("Local Server Port : " + ss.getLocalPort());

        System.out.println("++++++++++ Options +++++++++++++++");
        System.out.println("1). Wait For peer");
        System.out.println("2). Connect to peer");
        choice = Integer.parseInt(br.readLine());
        if (choice == 2) {

            try {
                System.out.print("Enter Peer Port Number :- ");
                port = Integer.parseInt(br.readLine().trim());
                System.out.print("Enter Host Name :- ");
                host = br.readLine().trim();

            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("Enter only Number");
                host = new String("localhost");
            }

            IPAddress = InetAddress.getByName(host);
            doSend(ss, IPAddress, port, new String("SYN"));

            clientWatingChat appW = new clientWatingChat(ss);
            appW.start();
            System.out.println("Connected To " + IPAddress + " [ " + port + " ] ");
            System.out.println("==========================================================");

            while (true) {

                System.out.print("> ");
                str = br.readLine();

                if (str.contains("close")) {
                    break;
                }
                doSend(ss, IPAddress, port, str);
            }

            doSend(ss, IPAddress, port, new String("FIN"));

        } else {

            System.out.println("Wating for Peer...");
            while (true) {
                DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
                ss.receive(receivePacket);
                IPAddress = receivePacket.getAddress();
                port = receivePacket.getPort();

                str = new String(receivePacket.getData());
                // System.out.println(str.trim() + " : " + receivePacket.getPort() + "\n> ");
                // System.out.print("> " + receivePacket.getAddress() + "[ " +
                // receivePacket.getPort() + " ]" + " : "
                // + str.trim() + "\n>");

                String str2 = new String("ACK");
                sendData = str2.getBytes();
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPAddress, port);
                ss.send(sendPacket);
                if (str.contains("SYN")) {
                    System.out.println(
                            "Peer Connected At " + receivePacket.getAddress() + " [ " + receivePacket.getPort()
                                    + " ] ");
                    System.out.println("==========================================================");

                    break;

                }
            }
            clientWatingChat appW = new clientWatingChat(ss);
            appW.start();

            while (true) {

                System.out.print("> ");
                str = br.readLine();
                // System.out.println("========================= : Me
                // :=======================");
                // System.out.println("Msg : -" + str);
                // System.out.println("=======================================================");
                if (str.contains("close")) {
                    break;
                }
                doSend(ss, IPAddress, port, str);
            }

            doSend(ss, IPAddress, port, new String("FIN"));

        }

        br.close();
        ss.close();
    }

    public static void doSend(DatagramSocket clientSocket, InetAddress IPAddress, int port, String str)
            throws IOException {

        byte[] sendData = new byte[1024];

        // System.out.println("Bytes : " + sendData);
        sendData = str.trim().getBytes();

        DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, IPAddress, port);
        clientSocket.send(sendPacket);
    }
}

class clientWatingChat extends Thread {

    DatagramSocket serverSocket;
    byte[] receiveData = new byte[1024];
    byte[] sendData = new byte[1024];
    String str;
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

    clientWatingChat(DatagramSocket s) throws IOException {
        serverSocket = s;
    }

    @Override
    public void run() {
        try {
            String str;
            DatagramPacket receivePacket;
            while (true) {
                receiveData = new byte[1024];
                receivePacket = new DatagramPacket(receiveData, receiveData.length);
                serverSocket.receive(receivePacket);

                str = new String(receivePacket.getData());
                if (str.contains("ACK")) {
                    continue;
                }

                if (str.contains("FIN")) {

                    String tmp = new String("FIN");
                    sendData = tmp.getBytes();
                    DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length,
                            receivePacket.getAddress(), receivePacket.getPort());
                    serverSocket.send(sendPacket);
                    System.out.println("=======================================================");
                    System.out.println("Peer Disconnected");
                    break;
                }

                // System.out.print(
                // receivePacket.getAddress() + "[" + receivePacket.getPort() + "] :-- " +
                // str.trim() + "\n> ");

                System.out.print("Peer >>>  " + str.trim() + "\n> ");

            }

        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Can not Run Server");
        }
    }

}
