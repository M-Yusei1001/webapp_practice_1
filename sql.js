const pg = require('pg');
const { connectionString } = require('pg/lib/defaults');

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

client.connect((error) => {
  if(error){
    console.log("error connecting : " + error.stack);
    return;
  }
  console.log("success");
});

client.query(
  'SELECT * FROM mydb',
  (error, results) => {
    if(error){
      console.log(error);
    }else{
      results.rows.forEach((item) => {
        console.log(item.name);
      });
    }
  }
);
