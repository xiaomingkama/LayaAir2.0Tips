var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
Object.defineProperty(exports, "__esModule", { value: true });
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "test.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConfig_1 = require("./GameConfig");
var layaMaxUI_1 = require("./ui/layaMaxUI");
var Main = /** @class */ (function () {
    function Main() {
        //根据IDE设置初始化引擎		
        if (window["Laya3D"])
            Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height);
        else
            Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig_1.default.scaleMode;
        Laya.stage.screenMode = GameConfig_1.default.screenMode;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true")
            Laya.enableDebugPanel();
        if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"])
            Laya["PhysicsDebugDraw"].enable();
        if (GameConfig_1.default.stat)
            Laya.Stat.show();
        Laya.alertGlobalError = true;
        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }
    Main.prototype.onVersionLoaded = function () {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    };
    Main.prototype.onConfigLoaded = function () {
        var _this = this;
        //加载IDE指定的场景
        // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        // Laya.enableDebugPanel()
        Laya.Stat.show();
        var test = new layaMaxUI_1.ui.testUI();
        Laya.stage.addChild(test);
        var path = 'gameui/img_dizuo.png';
        var atlaspath = 'res/atlas/gameui.atlas';
        var atlasPicpath = 'res/atlas/gameui.png';
        var assets = [];
        assets.push({ url: atlaspath, type: Laya.Loader.ATLAS });
        var temp;
        test.btn1.on(Laya.Event.CLICK, this, function () {
            console.log(Laya.loader.getRes(path));
            Laya.loader.load(assets, Laya.Handler.create(_this, function () {
                console.log(Laya.loader.getRes(path));
                temp = new Laya.Image();
                temp.skin = 'gameui/img_dizuo.png';
                temp.width = 100;
                temp.height = 200;
                test.addChild(temp);
                test.img.visible = true;
            }));
            // loading.visible = true
            // loading.height=200
            // loading.width=100
        });
        test.btn2.on(Laya.Event.CLICK, this, function () {
            // var assets = []
            // assets.push({ url: atlaspath, type: Laya.Loader.ATLAS });
            // assets.push({ url: atlasPicpath, type: Laya.Loader.IMAGE });
            // assets.forEach(element => {
            // 	Laya.loader.clearTextureRes(element.url)
            // });
            // Laya.Resource.gpuMemory
            // loading.visible = false
            temp.visible = false;
            temp.destroy();
            Laya.loader.clearTextureRes(atlaspath);
            Laya.loader.clearRes(atlaspath);
        });
    };
    return Main;
}());
//激活启动类
new Main();
},{"./GameConfig":1,"./ui/layaMaxUI":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui;
(function (ui) {
    var loadingUI = /** @class */ (function (_super) {
        __extends(loadingUI, _super);
        function loadingUI() {
            return _super.call(this) || this;
        }
        loadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(loadingUI.uiView);
        };
        loadingUI.uiView = { "type": "Scene", "props": { "width": 300, "height": 200 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": -7, "x": -28, "skin": "gameui/img_dizuo.png" }, "compId": 3 }], "loadList": ["gameui/img_dizuo.png"], "loadList3D": [] };
        return loadingUI;
    }(Laya.Scene));
    ui.loadingUI = loadingUI;
    var testUI = /** @class */ (function (_super) {
        __extends(testUI, _super);
        function testUI() {
            return _super.call(this) || this;
        }
        testUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(testUI.uiView);
        };
        testUI.uiView = { "type": "Scene", "props": { "width": 1136, "height": 640 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 280, "x": 294, "var": "btn1", "skin": "comp/button.png", "label": "label" }, "compId": 3 }, { "type": "Button", "props": { "y": 280, "x": 406.5, "var": "btn2", "skin": "comp/button.png", "label": "label" }, "compId": 4 }, { "type": "Image", "props": { "width": 200, "var": "img", "height": 200 }, "compId": 7 }], "loadList": ["comp/button.png"], "loadList3D": [] };
        return testUI;
    }(Laya.Scene));
    ui.testUI = testUI;
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L3Rvb2xzL0xheWFBaXIyLjAuMF8vcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvTWFpbi50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQSxnR0FBZ0c7O0FBRWhHOztFQUVFO0FBQ0Y7SUFhSTtJQUFjLENBQUM7SUFDUixlQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUVqRCxDQUFDO0lBaEJNLGdCQUFLLEdBQVEsR0FBRyxDQUFDO0lBQ2pCLGlCQUFNLEdBQVEsSUFBSSxDQUFDO0lBQ25CLG9CQUFTLEdBQVEsWUFBWSxDQUFDO0lBQzlCLHFCQUFVLEdBQVEsTUFBTSxDQUFDO0lBQ3pCLGlCQUFNLEdBQVEsS0FBSyxDQUFDO0lBQ3BCLGlCQUFNLEdBQVEsTUFBTSxDQUFDO0lBQ3JCLHFCQUFVLEdBQUssWUFBWSxDQUFDO0lBQzVCLG9CQUFTLEdBQVEsRUFBRSxDQUFDO0lBQ3BCLGdCQUFLLEdBQVMsS0FBSyxDQUFDO0lBQ3BCLGVBQUksR0FBUyxLQUFLLENBQUM7SUFDbkIsdUJBQVksR0FBUyxLQUFLLENBQUM7SUFDM0IsNEJBQWlCLEdBQVMsSUFBSSxDQUFDO0lBTTFDLGlCQUFDO0NBbEJELEFBa0JDLElBQUE7a0JBbEJvQixVQUFVO0FBbUIvQixVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7QUN4QmxCLDJDQUFzQztBQUN0Qyw0Q0FBbUM7QUFDbkM7SUFDQztRQUNDLGdCQUFnQjtRQUNoQixJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFVLENBQUMsS0FBSyxFQUFFLG9CQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7O1lBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQVUsQ0FBQyxLQUFLLEVBQUUsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLG9CQUFVLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLG9CQUFVLENBQUMsVUFBVSxDQUFDO1FBQzlDLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLG9CQUFVLENBQUMsaUJBQWlCLENBQUM7UUFFMUQsb0RBQW9EO1FBQ3BELElBQUksb0JBQVUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTTtZQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzlGLElBQUksb0JBQVUsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDM0YsSUFBSSxvQkFBVSxDQUFDLElBQUk7WUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFFN0IsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNySSxDQUFDO0lBRUQsOEJBQWUsR0FBZjtRQUNDLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRUQsNkJBQWMsR0FBZDtRQUFBLGlCQTZDQztRQTVDQSxZQUFZO1FBQ1osbUVBQW1FO1FBQ25FLDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksY0FBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3pCLElBQUksSUFBSSxHQUFHLHNCQUFzQixDQUFBO1FBQ2pDLElBQUksU0FBUyxHQUFHLHdCQUF3QixDQUFBO1FBQ3hDLElBQUksWUFBWSxHQUFHLHNCQUFzQixDQUFBO1FBQ3pDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFekQsSUFBSSxJQUFlLENBQUE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO1lBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSSxFQUFFO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7Z0JBQ3JDLElBQUksR0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtnQkFDckIsSUFBSSxDQUFDLElBQUksR0FBQyxzQkFBc0IsQ0FBQTtnQkFDaEMsSUFBSSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUE7Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUE7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUMsSUFBSSxDQUFBO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSix5QkFBeUI7WUFDekIscUJBQXFCO1lBQ3JCLG9CQUFvQjtRQUNyQixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtZQUNwQyxrQkFBa0I7WUFDbEIsNERBQTREO1lBQzVELCtEQUErRDtZQUMvRCw4QkFBOEI7WUFDOUIsNENBQTRDO1lBQzVDLE1BQU07WUFDTiwwQkFBMEI7WUFDMUIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFBO1lBQ2xCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRWhDLENBQUMsQ0FBQyxDQUFBO0lBQ0gsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQXpFQSxBQXlFQyxJQUFBO0FBQ0QsT0FBTztBQUNQLElBQUksSUFBSSxFQUFFLENBQUM7Ozs7QUN6RVgsSUFBYyxFQUFFLENBb0JmO0FBcEJELFdBQWMsRUFBRTtJQUNaO1FBQStCLDZCQUFVO1FBRXJDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixrQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUxjLGdCQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsc0JBQXNCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNL08sZ0JBQUM7S0FQRCxBQU9DLENBUDhCLElBQUksQ0FBQyxLQUFLLEdBT3hDO0lBUFksWUFBUyxZQU9yQixDQUFBO0lBQ0Q7UUFBNEIsMEJBQVU7UUFLbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLCtCQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBTGMsYUFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNL2IsYUFBQztLQVZELEFBVUMsQ0FWMkIsSUFBSSxDQUFDLEtBQUssR0FVckM7SUFWWSxTQUFNLFNBVWxCLENBQUE7QUFDTCxDQUFDLEVBcEJhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQW9CZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJ0ZXN0LnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuXHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiO1xyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiXHJcbmNsYXNzIE1haW4ge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0Ly/moLnmja5JREXorr7nva7liJ3lp4vljJblvJXmk45cdFx0XHJcblx0XHRpZiAod2luZG93W1wiTGF5YTNEXCJdKSBMYXlhM0QuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCk7XHJcblx0XHRlbHNlIExheWEuaW5pdChHYW1lQ29uZmlnLndpZHRoLCBHYW1lQ29uZmlnLmhlaWdodCwgTGF5YVtcIldlYkdMXCJdKTtcclxuXHRcdExheWFbXCJQaHlzaWNzXCJdICYmIExheWFbXCJQaHlzaWNzXCJdLmVuYWJsZSgpO1xyXG5cdFx0TGF5YVtcIkRlYnVnUGFuZWxcIl0gJiYgTGF5YVtcIkRlYnVnUGFuZWxcIl0uZW5hYmxlKCk7XHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IEdhbWVDb25maWcuc2NhbGVNb2RlO1xyXG5cdFx0TGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gR2FtZUNvbmZpZy5zY3JlZW5Nb2RlO1xyXG5cdFx0Ly/lhbzlrrnlvq7kv6HkuI3mlK/mjIHliqDovb1zY2VuZeWQjue8gOWcuuaZr1xyXG5cdFx0TGF5YS5VUkwuZXhwb3J0U2NlbmVUb0pzb24gPSBHYW1lQ29uZmlnLmV4cG9ydFNjZW5lVG9Kc29uO1xyXG5cclxuXHRcdC8v5omT5byA6LCD6K+V6Z2i5p2/77yI6YCa6L+HSURF6K6+572u6LCD6K+V5qih5byP77yM5oiW6ICFdXJs5Zyw5Z2A5aKe5YqgZGVidWc9dHJ1ZeWPguaVsO+8jOWdh+WPr+aJk+W8gOiwg+ivlemdouadv++8iVxyXG5cdFx0aWYgKEdhbWVDb25maWcuZGVidWcgfHwgTGF5YS5VdGlscy5nZXRRdWVyeVN0cmluZyhcImRlYnVnXCIpID09IFwidHJ1ZVwiKSBMYXlhLmVuYWJsZURlYnVnUGFuZWwoKTtcclxuXHRcdGlmIChHYW1lQ29uZmlnLnBoeXNpY3NEZWJ1ZyAmJiBMYXlhW1wiUGh5c2ljc0RlYnVnRHJhd1wiXSkgTGF5YVtcIlBoeXNpY3NEZWJ1Z0RyYXdcIl0uZW5hYmxlKCk7XHJcblx0XHRpZiAoR2FtZUNvbmZpZy5zdGF0KSBMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0TGF5YS5hbGVydEdsb2JhbEVycm9yID0gdHJ1ZTtcclxuXHJcblx0XHQvL+a/gOa0u+i1hOa6kOeJiOacrOaOp+WItu+8jHZlcnNpb24uanNvbueUsUlEReWPkeW4g+WKn+iDveiHquWKqOeUn+aIkO+8jOWmguaenOayoeacieS5n+S4jeW9seWTjeWQjue7rea1geeoi1xyXG5cdFx0TGF5YS5SZXNvdXJjZVZlcnNpb24uZW5hYmxlKFwidmVyc2lvbi5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vblZlcnNpb25Mb2FkZWQpLCBMYXlhLlJlc291cmNlVmVyc2lvbi5GSUxFTkFNRV9WRVJTSU9OKTtcclxuXHR9XHJcblxyXG5cdG9uVmVyc2lvbkxvYWRlZCgpOiB2b2lkIHtcclxuXHRcdC8v5r+A5rS75aSn5bCP5Zu+5pig5bCE77yM5Yqg6L295bCP5Zu+55qE5pe25YCZ77yM5aaC5p6c5Y+R546w5bCP5Zu+5Zyo5aSn5Zu+5ZCI6ZuG6YeM6Z2i77yM5YiZ5LyY5YWI5Yqg6L295aSn5Zu+5ZCI6ZuG77yM6ICM5LiN5piv5bCP5Zu+XHJcblx0XHRMYXlhLkF0bGFzSW5mb01hbmFnZXIuZW5hYmxlKFwiZmlsZWNvbmZpZy5qc29uXCIsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgdGhpcy5vbkNvbmZpZ0xvYWRlZCkpO1xyXG5cdH1cclxuXHJcblx0b25Db25maWdMb2FkZWQoKTogdm9pZCB7XHJcblx0XHQvL+WKoOi9vUlEReaMh+WumueahOWcuuaZr1xyXG5cdFx0Ly8gR2FtZUNvbmZpZy5zdGFydFNjZW5lICYmIExheWEuU2NlbmUub3BlbihHYW1lQ29uZmlnLnN0YXJ0U2NlbmUpO1xyXG5cdFx0Ly8gTGF5YS5lbmFibGVEZWJ1Z1BhbmVsKClcclxuXHRcdExheWEuU3RhdC5zaG93KClcclxuXHRcdHZhciB0ZXN0ID0gbmV3IHVpLnRlc3RVSSgpXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRlc3QpXHJcblx0XHR2YXIgcGF0aCA9ICdnYW1ldWkvaW1nX2RpenVvLnBuZydcclxuXHRcdHZhciBhdGxhc3BhdGggPSAncmVzL2F0bGFzL2dhbWV1aS5hdGxhcydcclxuXHRcdHZhciBhdGxhc1BpY3BhdGggPSAncmVzL2F0bGFzL2dhbWV1aS5wbmcnXHJcblx0XHR2YXIgYXNzZXRzID0gW11cclxuXHRcdGFzc2V0cy5wdXNoKHsgdXJsOiBhdGxhc3BhdGgsIHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH0pO1xyXG5cdFx0XHJcblx0XHR2YXIgdGVtcDpMYXlhLkltYWdlXHJcblx0XHR0ZXN0LmJ0bjEub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4ge1xyXG5cdFxyXG5cdFx0XHRjb25zb2xlLmxvZyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aCkpXHJcblx0XHRcdExheWEubG9hZGVyLmxvYWQoYXNzZXRzLCBMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsICgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aCkpXHJcblx0XHRcdFx0dGVtcD1uZXcgTGF5YS5JbWFnZSgpXHJcblx0XHRcdFx0dGVtcC5za2luPSdnYW1ldWkvaW1nX2RpenVvLnBuZydcclxuXHRcdFx0XHR0ZW1wLndpZHRoPTEwMFxyXG5cdFx0XHRcdHRlbXAuaGVpZ2h0PTIwMFxyXG5cdFx0XHRcdHRlc3QuYWRkQ2hpbGQodGVtcClcclxuXHRcdFx0XHR0ZXN0LmltZy52aXNpYmxlPXRydWVcclxuXHRcdFx0fSkpO1xyXG5cdFx0XHQvLyBsb2FkaW5nLnZpc2libGUgPSB0cnVlXHJcblx0XHRcdC8vIGxvYWRpbmcuaGVpZ2h0PTIwMFxyXG5cdFx0XHQvLyBsb2FkaW5nLndpZHRoPTEwMFxyXG5cdFx0fSlcclxuXHRcdHRlc3QuYnRuMi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7XHJcblx0XHRcdC8vIHZhciBhc3NldHMgPSBbXVxyXG5cdFx0XHQvLyBhc3NldHMucHVzaCh7IHVybDogYXRsYXNwYXRoLCB0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9KTtcclxuXHRcdFx0Ly8gYXNzZXRzLnB1c2goeyB1cmw6IGF0bGFzUGljcGF0aCwgdHlwZTogTGF5YS5Mb2FkZXIuSU1BR0UgfSk7XHJcblx0XHRcdC8vIGFzc2V0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cdFx0XHQvLyBcdExheWEubG9hZGVyLmNsZWFyVGV4dHVyZVJlcyhlbGVtZW50LnVybClcclxuXHRcdFx0Ly8gfSk7XHJcblx0XHRcdC8vIExheWEuUmVzb3VyY2UuZ3B1TWVtb3J5XHJcblx0XHRcdC8vIGxvYWRpbmcudmlzaWJsZSA9IGZhbHNlXHJcblx0XHRcdHRlbXAudmlzaWJsZT1mYWxzZVxyXG5cdFx0XHR0ZW1wLmRlc3Ryb3koKVxyXG5cdFx0XHRMYXlhLmxvYWRlci5jbGVhclRleHR1cmVSZXMoYXRsYXNwYXRoKVxyXG5cdFx0XHRMYXlhLmxvYWRlci5jbGVhclJlcyhhdGxhc3BhdGgpXHJcblxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgbG9hZGluZ1VJIGV4dGVuZHMgTGF5YS5TY2VuZSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiU2NlbmVcIixcInByb3BzXCI6e1wid2lkdGhcIjozMDAsXCJoZWlnaHRcIjoyMDB9LFwiY29tcElkXCI6MixcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjotNyxcInhcIjotMjgsXCJza2luXCI6XCJnYW1ldWkvaW1nX2RpenVvLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiZ2FtZXVpL2ltZ19kaXp1by5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KGxvYWRpbmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyB0ZXN0VUkgZXh0ZW5kcyBMYXlhLlNjZW5lIHtcclxuXHRcdHB1YmxpYyBidG4xOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBidG4yOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBpbWc6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiU2NlbmVcIixcInByb3BzXCI6e1wid2lkdGhcIjoxMTM2LFwiaGVpZ2h0XCI6NjQwfSxcImNvbXBJZFwiOjIsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjI4MCxcInhcIjoyOTQsXCJ2YXJcIjpcImJ0bjFcIixcInNraW5cIjpcImNvbXAvYnV0dG9uLnBuZ1wiLFwibGFiZWxcIjpcImxhYmVsXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoyODAsXCJ4XCI6NDA2LjUsXCJ2YXJcIjpcImJ0bjJcIixcInNraW5cIjpcImNvbXAvYnV0dG9uLnBuZ1wiLFwibGFiZWxcIjpcImxhYmVsXCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wid2lkdGhcIjoyMDAsXCJ2YXJcIjpcImltZ1wiLFwiaGVpZ2h0XCI6MjAwfSxcImNvbXBJZFwiOjd9XSxcImxvYWRMaXN0XCI6W1wiY29tcC9idXR0b24ucG5nXCJdLFwibG9hZExpc3QzRFwiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyh0ZXN0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
