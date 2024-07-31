const express = require('express');
const pg = require('pg');
const app = express();

app.use(express.static("public"))

const connectSQL = new pg.Pool({
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
    res.render('hello.ejs');
});

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.get('/app1', (req, res) => {
    res.render('memo_app.ejs');
});

app.listen(3000);