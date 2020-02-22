const {app,BrowserWindow}=require('electron')
const path=require('path')
const url=require('url')
const { ipcMain,Menu } = require('electron')
const {remote}=require('electron')
const {ipcRender}=require('electron')

let win
let window
let userWindow
var usersdata
var alldata

app.on('ready',function(){
    win=new BrowserWindow({width:800,height:680,webPreferences: {
        nodeIntegration: true
    }})
    win.loadURL(url.format({
        pathname:path.join(__dirname,'../html/index.html'),
        protocol:'file',
        slashes:true
    }))
 win.on('closed',()=>{
     win=null
 })
 win.on("window-all-closed",()=>{
    app.quit()
    if(process.platform!="darwin"){
        app.quit()
    }
})
 ipcMain.on('signPage',(event,args)=>{
        createSignUpPage()
 })
 ipcMain.on('signin',(err,args)=>{
     createUserWindow()
     usersdata=args
 })
 ipcMain.on('alldata',(err,args)=>{
    alldata=args
})
 win.openDevTools()
 win.removeMenu()
})
app.on('window-all-closed',()=>{
    app.quit()
    if(process.platform !=='darwin'){
        app.quit()
    }
})
function createSignUpPage(){
    window=new BrowserWindow({width:880,height:680,webPreferences: {
        nodeIntegration: true
    }})
    window.loadURL(url.format({
        pathname:path.join(__dirname,'../html/signup.html'),
        protocol:'file',
        slashes:true
    }))
    ipcMain.on('registered',(err,args)=>{
        win.webContents.send('regis',args)
        if(window==null){
            createSignUpPage
            }else{
                window.close()
            }
    })
    window.openDevTools()
    window.removeMenu()
    window.on("window-all-closed",()=>{
        app.quit()
        if(process.platform!="darwin"){
            app.quit()
        }
    })
    window.on('closed',()=>{
     window=null
 })
}
function createUserWindow(){
    userWindow=new BrowserWindow({width:880,height:680,webPreferences: {
        nodeIntegration: true
    }})
    userWindow.loadURL(url.format({
        pathname:path.join(__dirname,'../html/employee.html'),
        protocol:'file',
        slashes:true
    }))
    userWindow.openDevTools()
    userWindow.removeMenu()
    userWindow.on("window-all-closed",()=>{
        app.quit()
        if(process.platform!="darwin"){
            app.quit()
        }
    })
    ipcMain.on('loaded',(err,args)=>{
        userWindow.webContents.send('data',usersdata)
        userWindow.webContents.send('alldata',alldata)
    })
    userWindow.on('closed',()=>{
     userWindow=null
 })
}