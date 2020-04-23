const path = require("path")
const url = require("url")
const electron = require("electron")
const {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} = electron;

let mainWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 800,
        minWidth: 1024,
        minHeight: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
        },
        icon: path.join(__dirname, "/client/static/img/icons/64x64.png")
    });
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "/client/static/template/main.html"),
            protocol: "file",
            slashes: true
        })
    );
    mainWindow.on("close", function () {
        win = null;
        app.quit()
    });

});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.allowRendererProcessReuse = true;


// Controller

const { Accounts } = require('./server/dist/model/Accounts')
const { Cheque } = require('./server/dist/model/Cheque')

ipcMain.on("getAccounts", (e) => {
    let accountsObj = new Accounts()

    accountsObj
        .get()
        .then(result => {
            e.returnValue = result
        })
        .catch(err => {
            console.error(err)
        });

})

ipcMain.on("saveAccount", (e, form) => {
    let accountsObj = new Accounts()
    let params = Accounts.setParams(form)

    let validate = Accounts.validate(params)
    if (Object.keys(validate.exceptions).length !== 0) {
        e.returnValue = validate
        return false
    }

    accountsObj
        .save(params)
        .then(result => {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("deleteAccount", (e, form) => {
    let accountsObj = new Accounts()
    accountsObj
        .delete(form)
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("saveCheque", (e, form) => {
    let chequesObj = new Cheque();
    let params = Cheque.setParams(form)
    let validate = Cheque.validate(params)

    if (Object.keys(validate.exceptions).length !== 0) {
        e.returnValue = validate
        return false
    }
    chequesObj
        .save(params)
        .then(result => {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getChequeImage", (e) => {
    dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                name: 'Images',
                extensions: ['jpg', 'png', 'jpeg']
            }]
        })
        .then(result => {
            e.returnValue = result.filePaths 
        }).catch(err => {
            console.log(err)
        })
});

ipcMain.on("deleteCheque", (e, form) => {
    let chequesObj = new Cheque()
    chequesObj
        .delete(form)
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getCheque", (e, form) => {
    let chequesObj = new Cheque()
    chequesObj
        .get(form.type)
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("markCheque", (e, form) => {
    let chequesObj = new Cheque()
    chequesObj
        .mark(form)
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getBalance", (e) => {
    let chequesObj = new Cheque()
    chequesObj
        .getBalance()
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getDebts", (e) => {
    let chequesObj = new Cheque()
    chequesObj
        .getReceivablesDebts("author")
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getReceivables", (e) => {
    let chequesObj = new Cheque()
    chequesObj
        .getReceivablesDebts("interlocutor")
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});

ipcMain.on("getSummary", (e) => {
    let chequesObj = new Cheque()
    chequesObj
        .get("both", 6)
        .then(function (result) {
            e.returnValue = result
        })
        .catch(function (err) {
            console.error(err)
        });
});