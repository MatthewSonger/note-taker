const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});