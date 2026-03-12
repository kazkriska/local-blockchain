const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BESU_RPC = { host: '127.0.0.1', port: 8545 };

const server = http.createServer((req, res) => {
    // Handle Proxying for Besu RPC to bypass browser CORS
    if (req.url === '/rpc' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const proxyReq = http.request({
                host: BESU_RPC.host,
                port: BESU_RPC.port,
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            }, (proxyRes) => {
                res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                proxyRes.pipe(res);
            });
            proxyReq.on('error', () => {
                res.writeHead(500);
                res.end(JSON.stringify({ error: "Besu node unreachable" }));
            });
            proxyReq.write(body);
            proxyReq.end();
        });
        return;
    }

    // Handle static file serving
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Block Explorer UI: http://localhost:${PORT}`);
    console.log(`Proxying RPC via http://localhost:${PORT}/rpc`);
});
