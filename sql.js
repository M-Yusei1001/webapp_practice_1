const pg = require('pg');

const client = new pg.Pool({
  database: 'postgres',
  user: 'postgres',
  password: 'yusei1001',

  //仮想環境からホストOSのSQLサーバにアクセスする場合、
  //"host.docker.internal"でホストOSのIPを指定する。
  //あとはdevcontainerでポートを指定する。

  host: 'host.docker.internal', 
  port: 5432,
});

//client.connect();

client.query(
  'SELECT * FROM mydb;',
  (error, result) => {
    if(error){
      console.log(error);
    }else{
      console.log(result);
    };
});
