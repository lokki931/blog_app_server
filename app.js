const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// url http://localhost:5001/api/v1/

app.use('/static', express.static(__dirname + '/assets'));

app.use('/api/v1/users', require('./routes/users'));

app.use('/api/v1/posts', require('./routes/posts'));

app.use('/api/v1/categories', require('./routes/categories'));

app.use('/api/v1/post_category', require('./routes/post_category'));

app.use('/api/v1/tags', require('./routes/tags'));

app.use('/api/v1/post_tag', require('./routes/post_tag'));

app.use('/api/v1/comments', require('./routes/comments'));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
