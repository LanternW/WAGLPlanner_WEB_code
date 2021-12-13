import socket
import requests


message = "http://api.bilibili.com/archive_stat/stat?aid=AV号&type=jsonp"

class Misaka: #负责与服务端 rcon API 交互

    def __init__( self,host = 'localhost' , port = 25575 , password = "123456"):

        self.host = host
        self.port = port
        self.password = password
        self.obj = socket.socket(socket.AF_INET,socket.SOCK_STREAM)


    def connectToServer(self):

        feed_back = self.obj.connect((self.host,self.port))
        print(feed_back)

    def sendMsg(self,msg):
        self.obj.send(msg.encode('utf-8'))

    def disConnect(self):
        self.obj.close()



if __name__ == "__main__":

    misaka_39 = Misaka("api.bilibili.cn")
    misaka_39.connectToServer()
    misaka_39.sendMsg("123")


