import express from 'express';
import bodyParser  from 'body-parser';
import { MongoClient } from 'mongodb';
import { async } from 'regenerator-runtime';

const app = express();
app.use(bodyParser.json())

app.get('/api/articles/:name', async (req, res) => {
    try{
        const articleName = req.params.name;

        const client = await MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser : true });
        const db =  client.db('my-blog');
    
        const articleInfo = await db.collection('articles').findOne({name : articleName});
    
        res.status(200).json(articleInfo);
    
        client.close();
    }
    catch( error ) {
        res.status(500).json({message : 'Error connecting to db', error});
    }

})

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes +=1;

    res.status(200).send(`${articleName} has now ${articlesInfo[articleName].upvotes} upvotes!`);
})

app.post('/api/articles/:name/add-coment', (req, res) => {
    const {username, text} = req.body;
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({username, text});

    res.status(200).send(articlesInfo[articleName]);
})

app.listen(8080, () => console.log( 'listening to port 8080'));