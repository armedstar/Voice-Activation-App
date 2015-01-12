RAFVO.prototype.socket = null;
RAFVO.prototype.address = "";
RAFVO.prototype.port = 1337;

function RAFVO(socket, address, port)
{
    this.socket = socket;
    this.address = address;
    this.port = port;
}