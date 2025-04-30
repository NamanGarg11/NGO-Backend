const app = require('./index');
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
server.on('error', (error) => {
    console.error('Server error:', error);
});
server.on('close', () => {
    console.log('Server closed');
});