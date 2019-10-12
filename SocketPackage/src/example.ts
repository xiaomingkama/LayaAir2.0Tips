export default class example {
    //关于socket粘包处理
    //思路：每次发送数据加消息头，消息头由，协议cmd，协议nonce，协议长度组成， 接收端收到消息先判断是否是完整的包  再判断消息体长度是否符合消息头中的长度，如果发现是粘包，保留此次数据到下一个消息
    socket = new Laya.Socket()
    //发送
    send() {
        var by = new Laya.Byte()
        var temp = new Laya.Byte()
        var message = 'hellow'
        temp.writeInt16(12)//2字节的协议名
        temp.writeInt32(8)//4字节的协议长度
        temp.writeUTFString(message)//消息体
        by.writeArrayBuffer(temp.buffer)
        this.socket.send(by.buffer)//发送

    }
    //接受
    receive(data: ArrayBuffer) {
        var inputByte: Laya.Byte = this.socket.input//接收到后端数据的缓存区
        var protoArray: any[]
        while (true) {
            if (inputByte.bytesAvailable < 6) {
                break//可以看作读取结束
            }
            let oldPos = inputByte.pos//记录当前缓存区指针，方便回退
            let something1 = inputByte.readInt16()
            let len = inputByte.readInt32()
            if (inputByte.bytesAvailable < len - 6) {//判断是否是完整消息
                inputByte.pos = oldPos
                break
            }
            let msg = inputByte.readArrayBuffer(len)
            var by=new Laya.Byte()
            by.writeArrayBuffer(msg)
            by.readUTFString()
            console.log(msg)

        }
    }
}