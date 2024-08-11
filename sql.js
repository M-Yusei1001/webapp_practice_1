const pg = require('pg');
const { connectionString } = require('pg/lib/defaults');

const mydb = new pg.Pool({
  database: 'postgres',
  user: 'postgres',
  password: 'yusei1001',

  //仮想環境からホストOSのSQLサーバにアクセスする場合、
  //"host.docker.internal"でホストOSのIPを指定する。
  //あとはdevcontainerでポートを指定する。

  host: 'host.docker.internal', 
  port: 5432,
});

const client = mydb.connect((err) => {
  if(err){
    console.error(err);
  }else{
    console.log("connected");
  }
});

mydb.query()

// async (res, rej) => {
//   const client = await mydb.connect((err) => {
//     if(err){
//       console.error(err);
//     }
//   });

//   const getFromSQL = await client.query(
//     'SELECT * FROM pgpractice',
//     (err, result) => {
//       if(err){
//         console.error(err);
//       }else{
//         console.log("get successed");
//         console.log(result.rows);
//       }
//     }
//   );

//   const insertToSQL = await client.query(
//     'INSERT INTO pgpractice (fruits) VALUES (?)',
//     ["みかん"],
//     (err, result) => {
//       if(err){
//         console.error(err);
//       }else{
//         console.log("insert successed");
//       }
//     }
//   );

//   getFromSQL;

// }
