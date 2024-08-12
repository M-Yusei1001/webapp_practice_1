const pg = require('pg');
const { connectionString } = require('pg/lib/defaults');

const mydb = new pg.Pool({
  database: 'postgres',
  user: 'postgres',
  password: 'yusei1001',

  //仮想環境からホストOSのSQLサーバにアクセスする場合、"host.docker.internal"でホストOSのIPを指定する。
  host: 'host.docker.internal', 

  //あとはdevcontainerでもポートを指定する。
  port: 5432,
});

const selectQuery = {
  text: "SELECT * FROM public.pgpractice"
};

const insertQuery = {
  text: "INSERT INTO public.pgpractice (fruits) VALUES ($1)",
  values: ["みかん"]
};

mydb.connect(async (err, client) => {
  if(err){
    console.error(err.stack);
  }else{
    console.log("接続しました");

    try{
      const items = await client.query(selectQuery);
      console.log("取得しました");
      console.log(items.rows);

      await client.query(insertQuery);
      console.log("挿入しました");

      const updatedItems = await client.query(selectQuery);
      console.log("取得しました");
      console.log(updatedItems.rows);
    }catch(e){
      console.error("ERROR OCCURRED:", e.stack);
    }finally{
      client.release();
    }
  }
});


// mydb.connect((err, client) => {
//   if(err){
//     console.error(err.stack);
//   }else{
//     console.log("接続しました");
//     client
//       .query(selectQuery)
//       .then((items) => {
//         console.log("取得しました");
//         console.log(items.rows);
//       })
//       .catch((e) => {
//         console.error(e.stack);
//       });

//     client
//       .query(insertQuery)
//       .then(() => {
//         console.log("挿入しました");
//       })
//       .catch((e) => {
//         console.error(e.stack);
//       });

//     client
//       .query(selectQuery)
//       .then((items) => {
//         console.log("取得しました");
//         console.log(items.rows);
//       })
//       .catch((e) => {
//         console.error(e.stack);
//       });
//   }
// });

// mydb.connect((err, client) => {
//   if(err){
//     console.error(err.stack);
//   }else{
//     console.log("接続しました");
//     client
//       .query(insertQuery)
//       .then(() => {
//         console.log("挿入しました");
//       })
//       .catch((e) => {
//         console.error(e.stack);
//       });
//   }
// });

// mydb.connect((err, client) => {
//   if(err){
//     console.error(err.stack);
//   }else{
//     console.log("接続しました");
//     client
//       .query(selectQuery)
//       .then((items) => {
//         console.log("取得しました");
//         console.log(items.rows);
//       })
//       .catch((e) => {
//         console.error(e.stack);
//       });
//   }
// });
