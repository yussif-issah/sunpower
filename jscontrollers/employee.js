const{ipcRenderer}=require('electron')
function load(){
    ipcRenderer.send('loaded')
}

ipcRenderer.on('data',(err,data)=>{
    document.getElementById('username').innerHTML=data.name
    document.getElementById('email').innerHTML=data.mail
})
ipcRenderer.on('alldata',(err,alldata)=>{
    var data=""
    for(i=0;i<alldata.rows.length;i++){
        data+=`<div class="media border p-3" style="margin-left:10px;margin-bottom:10px;background-color:white">
        <img src="https://sunpowergh.com/wp-content/themes/kavabase/assets/images/logo.svg" alt="pic" class="mr-3 mt-3 rounded-circle" style="width:90px;">
        <div class="media-body">
          <h4>${alldata.rows[i].fname+" "+alldata.rows[i].lname}</h4>
          <p>${alldata.rows[i].email}</p>
        </div>
      </div>`
    }
    document.getElementById('allusers').innerHTML=data

})