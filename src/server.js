import express from 'express';
import bodyParser  from 'body-parser';

const articlesInfo = {
    'learn-react': {
        upvotes: 0,
    },
    'learn-node': {
        upvotes: 0,
    },
    'my-thoughts-on-resumes': {
        upvotes: 0,
    },
}

const app = express();
app.use(bodyParser.json())

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    articlesInfo[articleName].upvotes +=1;

    res.status(200).send(`${articleName} has now ${articlesInfo[articleName].upvotes} upvotes!`);
})

app.listen(8080, () => console.log( 'listening to port 8080'));