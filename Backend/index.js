const http = require('http');
const app = require('./app');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(PORT,()=>{
    console.log(`Sever start running at http://localhost:${PORT}`);
});