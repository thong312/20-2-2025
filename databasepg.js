const {Client} = require('pg');

const client = Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:12345,
    database:'postgres',
});

client.connect();


client.query(`select * from public.user`,(err,res)=>{
  if(!err){
    console.log(res.rows);
  }else {
    console.log(err.message);
  }
client.end();
})