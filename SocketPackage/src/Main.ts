import GameConfig from "./GameConfig";
class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		this.receive(this.send('fuck u fuck '))
	}
	send(msg='') {
        var by = new Laya.Byte()
        var temp = new Laya.Byte()
		var message = msg
		var ss=new Laya.Byte()
		ss.writeUTFString(msg)
        temp.writeInt16(12)//2字节的协议名
        temp.writeInt32(ss.length)//4字节的协议长度
		temp.writeArrayBuffer(ss.buffer)//消息体
		by.writeArrayBuffer(temp.buffer)
		console.log(by.buffer.byteLength)
        return by.buffer

	}
	receive(data: ArrayBuffer) {
		var inputByte: Laya.Byte = new Laya.Byte()
		inputByte.writeArrayBuffer(data)
		inputByte.pos=0
        var protoArray: any[]
        while (true) {
            if (inputByte.bytesAvailable < 6) {
                break//可以看作读取结束
            }
            let oldPos = inputByte.pos//记录当前缓存区指针，方便回退
            let something1 = inputByte.readInt16()
			let len = inputByte.readInt32()
			console.log(inputByte.pos)
            if (inputByte.bytesAvailable < len - 6) {//判断是否是完整消息
                inputByte.pos = oldPos
                break
            }
            let msg = inputByte.readArrayBuffer(len)
            var by=new Laya.Byte()
			by.writeArrayBuffer(msg)
			by.pos=0
           var str= by.readUTFString()
            console.log(str)

        }}
}
//激活启动类
new Main();
