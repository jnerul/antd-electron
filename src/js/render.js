var { remote, shell, ipcRenderer } = require('electron');

function zalert(text, callback) {
    const { BrowserWindow } = require('electron').remote;
    console.log(BrowserWindow);
    const win = BrowserWindow.getFocusedWindow();

    // remote.dialog.showErrorBox('An Error Message', text);
    remote.dialog.showMessageBox(win, {
        type: 'none', //“none”, “info”, “error”, “question” 或者 “warning”。
        title: 'ZPert',
        message: text,
        // buttons: ['确定', '取消'],
    }).then(result => {
        console.log(result)
        console.log('点击', result.response);
        if (callback != undefined)
            callback();
    }).catch(err => {
        console.log(err)
    })
}

function info(message, type) {
    zalert(message);
}

const view_interface = require('./page').default.view_interface;
console.log(view_interface);
window.initwasm = view_interface.initwasm;
// view_interface.setMessageBox(info);


ipcRenderer.on('newfile', function (event, arg) {
    view_interface.newFile();
})
ipcRenderer.on('openfile', function (event, arg) {
    view_interface.openFile(arg);
})

module.exports = view_interface;