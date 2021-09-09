const express = require('express');
const cors = require('cors');
const routes = require('./api/routes/articles');

const app = express();
app.use(cors());
app.use('/articles', routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));