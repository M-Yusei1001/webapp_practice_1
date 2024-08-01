const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const { connectionString } = require('pg/lib/defaults');
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
    res.render('hello.ejs');
});

app.get('/top', (req, res) => {
    res.render('top.ejs');
});

app.get('/app1', async(req, res) => {
    try{
        const client = await mydb.connect();
        const results = await client.query('SELECT * FROM mydb');
        res.render('memo_app.ejs', {items: results.rows});
    }catch(err){
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/create', (req, res) =>{
    mydb.query(
        'INSERT INTO mydb (userid, name, items, quantity) VALUES (?, ?, ?, ?)',
        [req.body.userid], [req.body.name], [req.body.items], [req.body.quantity],
        (error, results) => {
            if(error){
                console.log(error);
            }else{
                console.log(results);
                res.redirect('/app1');
            }
        }
    );
});

app.listen(3000);