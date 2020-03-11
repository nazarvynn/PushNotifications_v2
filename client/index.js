const path      = require('path');
const express   = require('express');

const port = 8080;
const app = express();
app.use('/', express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
    console.log(`Server started \r\nlocalhost:${port}`);
});