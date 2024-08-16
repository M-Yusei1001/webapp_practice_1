const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const { connectionString, client_encoding } = require('pg/lib/defaults');
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
    res.render('top.ejs');
});

app.get('/app1', async(req, res) => {
    try{
        //非同期処理
        //データベースへの接続を待つ
        const client = await mydb.connect();
        
        //接続できたらクエリを送る
        const items = await client.query(
            'SELECT * FROM public.pgpractice'
        );
        console.log("取得しました");
        console.log(items.rows);
        res.render('memo_app.ejs', {items: items.rows});
    }catch(e){
        console.error(e.stack);
    }
});

app.post('/create', async(req, res) =>{
    try{
        const client = await mydb.connect();
        await client.query(
            "INSERT INTO public.pgpractice (fruits) VALUES ($1)",
            [req.body.itemName]
        );
        console.log("追加しました:" + req.body.itemName);
        res.redirect('/app1');
    }catch(e){
        console.error(e.stack);
    }
});

app.post('/delete/:id', async(req, res) => {
    try{
        const client = await mydb.connect();
        await client.query(
            'DELETE FROM public.pgpractice WHERE id = ($1)',
            [req.params.id],
        );
        console.log("削除しました");
        res.redirect('/app1');
    }catch(e){
        console.error(e.stack);
    }
});

app.listen(3000);