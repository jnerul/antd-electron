

var exports = {}

var pro = require("./data");
var webinit = require('./zpert/a').ZWebViewInit;

// import React from "react";
// import ReactDOM from "react-dom";
// import { Button, Select, Modal, DatePicker, Tabs } from "antd";
// const { TabPane } = Tabs;



function ZWebViewInit(e) {
    return webinit(e);
}

function initwasm(module) {
    var images = new Array();
    var cc = new Image();
    cc.src = 'resource/icon.png';
    images[0] = cc;
    var view = undefined;
    var is_read_only = false;
    function autosizeCanvas() {
        var diff_height = document.getElementById('app_menu').clientHeight + 22;
        document.getElementById('zweb_view').width = document.documentElement.clientWidth - 20;
        document.getElementById('zweb_view').height = document.documentElement.clientHeight - diff_height;
        if (view) {
            view.SetDrawSize(document.documentElement.clientWidth - 20,
                document.documentElement.clientHeight - diff_height);
            view.Draw();
        }
    }
    var message_box = function (message, type) {

    }
    function setMessageBox(fun) {
        message_box = fun;
    }
    var update_menu = function () { }
    function setUpdateMenu(fun) { update_menu = fun; };
    exports.setMessageBox = setMessageBox;
    exports.setUpdateMenu = setUpdateMenu;
    ZWebViewInit({
        locateFile: function (file) {
            // console.log(__dirname);
            console.log('wasm dir:', 'js/' + file)
            return 'js/' + file
        },
        canvas: document.getElementById('zweb_view'),
        getImage: function (idx) {
            // console.log('getimage', idx);
            return images[idx];
        },
        initImage: function (str, idx) {
            // console.log('initimage');
            var imgstr = "data:image/png;base64," + str;
            cc = new Image();
            cc.src = imgstr;
            images[idx] = cc;
        },
        clearImage: function () {
            images = [];
        },
        messageBox: function (text, type) {
            message_box(text, type);
            return;
            console.log('mes:', text);
            if (type == 0) {
                zalert(text);
                return 1;
            } else if (type == 1) {
                if (confirm(text))
                    return 1;
                else
                    return 2;
            }
        },
        getResPath: function () {
            return "resource";
        },
        OnReceiveCoEditMessage: function (blob) {
            b = blob;
            console.log('receive', blob);
            // sendtocoeditclient(view, blob);
        },
        OnJoinCoEditCallBack: function (result) {
            console.log('joincoeditcallback', result)
        },
        updateMenu: function (e) {
            if (module.call_back.updateMenu) {
                module.call_back.updateMenu(e);
            }
        },
        createSettingDialog: module.createSettingDialog,
    }).then(function (Module) {
        // sendtocoeditclient = Module['sendtocoeditclient'];
        autosizeCanvas();
        function opendata(data) {
            view = Module.load(data, 3);
            view.SetReadOnly(false);
            // document.getElementById('readonly').style.background = "#e0e0e0";
            is_read_only = false;
            // view.ResDbFromJSON(JSON.stringify(resdb));
            view.Draw();
        }

        function openZpertFile(filepath) {
            var fs = require("fs");
            fs.readFile(filepath, "utf8", (err, data) => {
                if (err) {
                    console.log('打开失败');
                } else {
                    opendata(data);
                }
            })
        }

        function saveZpertFile(filepath) {
            var fs = require("fs");
            fs.writeFile(filepath, view.ToJson(), { encoding: 'utf8' }, function (err) {
                if (err)
                    throw err;
                console.log('保存成功');
            })
        }

        function newZpertFile() {
            var doc = new Module.ZWebDoc();
            doc.InitNewDoc();
            Module.doc = doc;

            var zwebview = new Module.ZWebView(doc);
            Module.view = zwebview;
            Module.need_draw = false;
            var rect = document.getElementById('zweb_view').getBoundingClientRect();
            zwebview.SetDrawSize(rect.width, rect.height);
            zwebview.CalcDrawPos();
            zwebview.FitPage();
            zwebview.Draw();
            zwebview.SetReadOnly(false);
            view = zwebview;
        }

        function get_view() {
            return view;
        }

        console.log(__dirname);
        console.log(pro);
        opendata(JSON.stringify(pro.pro()));

        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            console.log('keydown', e.keyCode);
            if (e) {
                view.OnMessage(Module.ZWM_KEYDOWN, e.keyCode, 0, 0, 0);
            }
        }
        document.onkeyup = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            console.log('keyup', e.keyCode);
            if (e) {
                view.OnMessage(Module.ZWM_KEYUP, e.keyCode, 0, 0, 0);
            }
        }

        function dbclick(event) {
            console.log('dbclick');
        }
        document.addEventListener('ondblclick', function (e) {
            dbclick(e);
        });

        function drap(obj) {
            function start(event) {
                // 鼠标左键
                if (event.button == 0) {
                    var rect = document.getElementById("zweb_view").getBoundingClientRect();
                    var parent = document.getElementById("zweb_view").parentElement.parentElement;
                    // console.log(event.pageX - rect.left - window.pageXOffset, event.pageY - rect.top - window.pageYOffset);
                    view.OnMessage(Module.ZWM_LBUTTONDOWN, event.pageX - rect.left - window.pageXOffset,
                        event.pageY - rect.top - window.pageYOffset, 0, 0);
                    // 绑定事件，同样unbind解绑定，此效果的实现最后必须要解绑定，否则鼠标松开后拖拽效果依然存在
                    //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的
                    document.addEventListener('mousemove', move);
                    //此处的$(document)可以改为obj
                    document.addEventListener('mouseup', stop);
                    // window.open('tree.html')
                }
                return false; //阻止默认事件或冒泡
            }

            function move(event) {
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                var parent = document.getElementById("zweb_view").parentElement.parentElement;
                view.OnMessage(Module.ZWM_MOUSEMOVE, event.pageX - rect.left - window.pageXOffset, event
                    .pageY - rect.top - window.pageYOffset, 0, 0);
                return false; //阻止默认事件或冒泡
            }

            function stop(event) {
                // console.log('lup');
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                var parent = document.getElementById("zweb_view").parentElement.parentElement;
                view.OnMessage(Module.ZWM_LBUTTONUP, event.pageX - rect.left - window.pageXOffset, event
                    .pageY - rect.top - window.pageYOffset, 0, 0);
            }

            obj.addEventListener('mousedown', start);
            obj.addEventListener('mousemove', move);
            obj.addEventListener('mouseup', stop);

            obj.oncontextmenu = function (event) {
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                view.OnMessage(Module.ZWM_RBUTTONDOWN, event.pageX - rect.left - window.pageXOffset,
                    event.pageY - rect.top - window.pageYOffset, 0, 0);
                view.OnMessage(Module.ZWM_RBUTTONUP, event.pageX - rect.left - window.pageXOffset,
                    event.pageY - rect.top - window.pageYOffset, 0, 0);
                event.preventDefault();
            };

            obj.addEventListener('dblclick', function (event) {
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                view.OnMessage(Module.ZWM_LBUTTONDBLCLK, event.pageX - rect.left - window.pageXOffset,
                    event.pageY - rect.top - window.pageYOffset, 0, 0);
            });

            function onTouchStart(event) {
                event.preventDefault();
                var offsetX = event.pageX;
                var offsetY = event.pageY;
                var touch = event.touches[0];
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                var parent = document.getElementById("zweb_view").parentElement.parentElement;
                // console.log('touchstart', touch.pageX - rect.left - window.pageXOffset,
                // touch.pageY - rect.top - window.pageYOffset);
                view.OnMessage(Module.ZWM_LBUTTONDOWN, touch.pageX - rect.left - window.pageXOffset,
                    touch.pageY - rect.top - window.pageYOffset, 0, 0);
            }

            function onTouchMove(event) {
                event.preventDefault();
                // console.log('touchmove');
                var touch = event.touches[0];
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                var parent = document.getElementById("zweb_view").parentElement.parentElement;
                view.OnMessage(Module.ZWM_MOUSEMOVE, touch.pageX - rect.left - window.pageXOffset, touch
                    .pageY - rect.top - window.pageYOffset, 0, 0);
                return false; //阻止默认事件或冒泡
            }

            function onTouchend(event) {
                event.preventDefault();
                // console.log('touchend');
                var touch = event.touches[0];
                var rect = document.getElementById("zweb_view").getBoundingClientRect();
                var parent = document.getElementById("zweb_view").parentElement.parentElement;
                view.OnMessage(Module.ZWM_LBUTTONUP, 0, 0, 0, 0);
            }
            obj.addEventListener('touchstart', onTouchStart, false);
            obj.addEventListener('touchmove', onTouchMove, false);
            obj.addEventListener('touchend', onTouchend, false);
        }
        var obj = document.getElementById('zweb_view');
        drap(obj);

        function expandTo(grade) {
            if (grade == "层级1") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_1);
            } else if (grade == "层级2") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_2);
            } else if (grade == "层级3") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_3);
            } else if (grade == "层级4") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_4);
            } else if (grade == "层级5") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_5);
            } else if (grade == "层级6") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_6);
            } else if (grade == "层级7") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_7);
            } else if (grade == "层级8") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_8);
            } else if (grade == "层级9") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_9);
            } else if (grade == "全部展开") {
                view.OnCollapsed(Module.ID_BUTTON_EXPAND_ALL);
            }
        }

        function changePertMode(mode) {
            if (mode == 'timenet') {
                view.OnChangePertMode(Module.ID_VIEW_PERT_TIME);
            } else if (mode == 'ganttnet') {
                view.OnChangePertMode(Module.ID_VIEW_PERT_GANTT);
            }
        }

        function addWork() {
            view.AddWorkOrMilestone(Module.CellType.kJob.value);
        }

        function addMilestone() {
            view.AddWorkOrMilestone(Module.CellType.kMilestone.value);
        }

        function onCollapsed() {
            view.OnCollapsed(Module.ID_BUTTON_EXPAND);
        }

        exports.openFile = openZpertFile;
        exports.saveFile = saveZpertFile;
        exports.newFile = newZpertFile;
        exports.expandTo = expandTo;
        exports.changePertMode = changePertMode;
        exports.addWork = addWork;
        exports.addMilestone = addMilestone;
        exports.onCollapsed = onCollapsed;
        exports.getView = get_view;

        document.getElementById('zweb_view').addEventListener('mousewheel', function (e) {
            var direct = 0;
            e = e || window.event;
            if (e.wheelDelta) { //IE/Opera/Chrome
                direct = e.wheelDelta / 120;
            } else if (e.detail) { //Firefox
                direct = -e.wheelDelta / 3;
            }
            var rect = document.getElementById("zweb_view").getBoundingClientRect()
            var parent = document.getElementById("zweb_view").parentElement.parentElement;
            var offsetX = event.pageX - rect.x - window.pageXOffset;
            var offsetY = event.pageY - rect.y - window.pageYOffset;
            if (direct > 0)
                direct = 2;
            else
                direct = 0.5;
            view.OnMessage(Module.ZWM_MOUSEWHEEL, offsetX, offsetY, direct, 0);
            return false;
        });
    });
    window.onresize = function () {
        autosizeCanvas();
    }
}


exports.initwasm = initwasm;
export default {
    exports
}

