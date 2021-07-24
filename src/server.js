import express from 'express';
import bodyParser  from 'body-parser';

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
        comments: [],
    },
    'learn-node': {
        upvotes: 0,
        comments: [],
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
        comments: [],
    },
}

const app = express();
app.use(bodyParser.json())

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