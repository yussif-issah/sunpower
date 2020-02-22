
  const {ipcRenderer}=require('electron')
  const {remote}=require('electron')
  const {Pool,Client}=require('pg')
  const connectionString='postgressql://postgres:hayatu88@localhost:5432/sunpower'
  client=new Client({
      connectionString:connectionString
  })
  
  async function register(){
    client.connect()
    var email=document.forms["myform"]["email"].value
    var pword=document.forms["myform"]["pwd"].value
    var firstname=document.forms["myform"]["fname"].value
    var lastname=document.forms["myform"]["lname"].value
    var query="INSERT INTO users VALUES($1,$2,$3,$4)"
    var confirm="SELECT * FROM users WHERE email=($1)"
    var results=await client.query(confirm,[email])
    if(results.rows.length==0){
        var state=await client.query(query,[firstname,lastname,email,pword])
    if(state){
        ipcRenderer.send('registered',firstname)
        client.close()
    }
    }else{
        alert("EMAIL IS ALREADY IN USE")
}
  }