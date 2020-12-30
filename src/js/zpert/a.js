require("./js/jquery.min.js");

require("./js/jquery.ztree.core.js");
require("./js/jquery.ztree.excheck.js");
// require("./js/zTreeStyle.css")
// global.window.jQuery = jquery;
require("./js/layer/layer.js");
// require("./js/layer/theme/default/layer.css")
global.window.laydate = require("./js/layer/laydate/laydate.js");
// require("./js/layer/laydate/theme/default/laydate.css")


// require("./js/zcontrol.css")
var ZWebViewInit = require("./zpert.js");
// global.window.ZWebViewInit = ZWebViewInit;
exports.ZWebViewInit = ZWebViewInit;
