import GameConfig from "./GameConfig";
import { ui } from "./ui/layaMaxUI"
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
		// Laya.enableDebugPanel()
		Laya.Stat.show()
		var test = new ui.testUI()
		Laya.stage.addChild(test)
		var path = 'gameui/img_dizuo.png'
		var atlaspath = 'res/atlas/gameui.atlas'
		var atlasPicpath = 'res/atlas/gameui.png'
		var assets = []
		assets.push({ url: atlaspath, type: Laya.Loader.ATLAS });
		
		var temp:Laya.Image
		test.btn1.on(Laya.Event.CLICK, this, () => {
	
			console.log(Laya.loader.getRes(path))
			Laya.loader.load(assets, Laya.Handler.create(this, () => {
				console.log(Laya.loader.getRes(path))
				temp=new Laya.Image()
				temp.skin='gameui/img_dizuo.png'
				temp.width=100
				temp.height=200
				test.addChild(temp)
				test.img.visible=true
			}));
			// loading.visible = true
			// loading.height=200
			// loading.width=100
		})
		test.btn2.on(Laya.Event.CLICK, this, () => {
			// var assets = []
			// assets.push({ url: atlaspath, type: Laya.Loader.ATLAS });
			// assets.push({ url: atlasPicpath, type: Laya.Loader.IMAGE });
			// assets.forEach(element => {
			// 	Laya.loader.clearTextureRes(element.url)
			// });
			// Laya.Resource.gpuMemory
			// loading.visible = false
			temp.visible=false
			temp.destroy()
			Laya.loader.clearTextureRes(atlaspath)
			Laya.loader.clearRes(atlaspath)

		})
	}
}
//激活启动类
new Main();
