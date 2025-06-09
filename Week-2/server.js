const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDir = path.join(__dirname, 'files');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    const fileName = query.name;
    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Error: File name not provided');
    }
    const filePath = path.join(baseDir, path.basename(fileName));

    // create
    if (pathname === '/create' && req.method === 'POST') {
        const content = query.content || '';
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Failed to create file');
            }
            res.writeHead(200);
            res.end('File created successfully');
        });

    // read
    } else if (pathname === '/read' && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });

    // delete
    } else if (pathname === '/delete' && req.method === 'DELETE') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File not found');
            }
            res.writeHead(200);
            res.end('File deleted successfully');
        });

    // update (overwrite content)
    } else if (pathname === '/update' && req.method === 'PUT') {
        const newContent = query.content || '';
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(404);
                return res.end('File does not exist');
            }

            fs.writeFile(filePath, newContent, (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Failed to update file');
                }
                res.writeHead(200);
                res.end('File updated successfully');
            });
        });

    } else {
        res.writeHead(404);
        res.end('Invalid endpoint or method');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
