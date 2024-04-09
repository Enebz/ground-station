import socket
from telnetlib import Telnet
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import json
import threading
import time
from collections import deque



class CLI(threading.Thread):    
    def __init__(self, host, name) -> None:
        self.host = host

        # Threading properties
        threading.Thread.__init__(self, daemon=True)
        self.running = False
        self.__name__ = name
        self.log = open(f"CLI_{host.IP}.log", "wb")

        try:
            self.telnet = Telnet(host=host.IP, port=23)
        except socket.error as e:
            print(f"Socket error: {e}")

        self.new_data_buffer = deque(maxlen=1000)
        pass

    def send(self, data):
        self.telnet.write(data + b"\n")

    def recieve(self):
        try:
            print("Waiting for data")
            data = self.telnet.read_some()
            self.log.write(data)
            self.log.flush()
            return data
        except socket.error as e:
            print(f"Socket receive error: {e}")
            return None
        
    def run(self):
        self.running = True
        while self.running:
            print("Waiting for data on socket")
            data = self.recieve()
            if data is not None:
                self.new_data_buffer.append(data)
                print(data)
        pass

class FlightComputer:
    IP = "10.19.0.111"
    PORT = 136

    def __init__(self) -> None:
        self.cli = CLI(self, "FC_CLI")
        pass

    def start(self):
        self.cli.start()
        pass

class GUIHandler(BaseHTTPRequestHandler):
    def __init__(self, request, client_address, server):
        super().__init__(request, client_address, server)

    def do_GET(self):

        if self.path == "/events":
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "keep-alive")
            self.end_headers()
            self.server.sseclients.append(self.wfile)

        else:
            self.send_error(404)

    def do_POST(self):
        print(self.path)
        if self.path == '/cli-command':
            # Retrieve the command from the request body json
            content_length = int(self.headers['Content-Length'])
            body = json.loads(self.rfile.read(content_length))
            command = body['command']

            # Print
            print(f"Sending CLI command!: {command}")

            # Send the command to the flight computer
            self.server.flight_computer.cli.send(command.encode())

            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b'Command sent to flight computer')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Expose-Headers", "Content-Type")
        if self.path == "/history":
            self.send_header("Access-Control-Allow-Headers", "Content-Type, timestamp, target")
        else:
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()


        
class GUIServer(ThreadingHTTPServer):
    def __init__(self, port, logPath, Flight_Computer=None):
        super().__init__(("", port), GUIHandler)
        # self.commandSocket = socket(AF_INET, SOCK_DGRAM)
        # self.commandSocket.settimeout(5)
        # self.commandAddress = (RadioIP, 20000)  #NOTE: Only if ethernet receive is not working on FC (which it is, lets goooo!)
        self.port = port
        self.sseclients = []
        self.timeout = 1
        self.logPath = logPath
        self.broadcastFrequency = 2000 #Hz        
        self.broadcastThread = threading.Thread(target=self.dataBroadcast, daemon=True)

        self.flight_computer = Flight_Computer

    def start(self):
        self.flight_computer.start()
        self.broadcastThread.start()
        self.serve_forever()


    def write_to_clients(self, data):
        i = 0
        while i < len(self.sseclients): #While loop to avoid runtime errors (list size changes)
            client = self.sseclients[i]
            try:
                if not client.writable():
                    self.sseclients.remove(client)
                    print("Removed non writable client", client)
                    continue

                print("Writing data to client", client)
                client.write(data)

                i += 1
            except Exception as e:
                self.sseclients.remove(client)
                print("Client disconnected")
                continue
    
    def dataBroadcast(self):
        while True:
            # Flight computer CLI data from deque
            cli_data = None

            if len(self.flight_computer.cli.new_data_buffer) > 0:
                cli_data = self.flight_computer.cli.new_data_buffer.popleft()
                print(f"CLI data popped from deque {cli_data}")

            # Writing CLI events
            if cli_data is not None:
                print(f"Writing data")
                self.write_to_clients(b"event: cli\n")
                self.write_to_clients(b"data: " + cli_data + b"\n\n")

            
            time.sleep(1/self.broadcastFrequency)
    
    def listen(self):
        try:
            while True:
                try:
                    self.handle_request()
                except TimeoutError:
                    continue
        except KeyboardInterrupt:
            print("Server stopped")
            self.server_close()

    def server_close(self) -> None:
        return super().server_close()

        


app = GUIServer(8000, "log.txt", FlightComputer())

if __name__ == '__main__':
    app.start()