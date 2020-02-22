const {remote}=require('electron')
const {ipcRenderer}=require('electron')
const {Pool,Client}=require('pg')
  const connectionString='postgressql://postgres:hayatu88@localhost:5432/sunpower'
document.getElementById("signup").addEventListener('click',()=>{
ipcRenderer.send("signPage","new")
})
ipcRenderer.on('regis',(err,args)=>{
    document.getElementById("here").innerHTML="WELCOME "+args
})
  client=new Client({
      connectionString:connectionString
  })


async function signin(){
    client.connect()
    var email=document.forms["signInforms"]["signinemail"].value
    var password=document.forms["signInforms"]["signinpwd"].value
    var query="SELECT * FROM users WHERE email=($1) AND password=($2)"
    var alldata="SELECT * FROM users WHERE email !=($1)"
 var result=await client.query(query,[email,password])
  if(result.rows[0].email!=null){
      data={
          mail:email,
          name:result.rows[0].fname+" "+result.rows[0].lname
      }
      ipcRenderer.send('signin',data)
      var all=await client.query(alldata,[email])
      users=all
      ipcRenderer.send('alldata',users)
      client.close()
  }else{
    alert("PLEASE CHECK")
    client.close()
  }
}


