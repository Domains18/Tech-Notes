require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3500;
const path = require('path');


const app = express();

//static files
app.use(express.static(path.join(__dirname, 'public')));





// default routes
app.use('/', require('./routes/root'));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: ' 404 Not found' });
    } else {
        req.type('txt').send('404 Not found');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
