const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const siteRoot = path.resolve(__dirname);
const port = Number(process.env.PORT || 10000);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function respondText(response, statusCode, message, headers = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    ...headers,
  });
  response.end(message);
}

async function serve(request, response) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    respondText(response, 405, "Method not allowed", { Allow: "GET, HEAD" });
    return;
  }

  let requestPath;
  try {
    requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    respondText(response, 400, "Bad request");
    return;
  }

  let filePath = path.resolve(siteRoot, `.${requestPath}`);
  const relativePath = path.relative(siteRoot, filePath);
  if (
    relativePath.startsWith(`..${path.sep}`) ||
    relativePath === ".." ||
    path.isAbsolute(relativePath) ||
    relativePath.split(path.sep).some((segment) => segment !== "." && segment.startsWith("."))
  ) {
    respondText(response, 404, "Not found");
    return;
  }

  let fileInfo;
  try {
    fileInfo = await fs.promises.stat(filePath);
    if (fileInfo.isDirectory()) {
      filePath = path.join(filePath, "index.html");
      fileInfo = await fs.promises.stat(filePath);
    }
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      respondText(response, 404, "Not found");
      return;
    }
    throw error;
  }

  if (!fileInfo.isFile()) {
    respondText(response, 404, "Not found");
    return;
  }

  const contentType = contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": fileInfo.size,
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  const stream = fs.createReadStream(filePath);
  stream.on("error", (error) => {
    console.error("Failed to read requested file:", error);
    if (!response.headersSent) {
      respondText(response, 500, "Internal server error");
    } else {
      response.destroy(error);
    }
  });
  stream.pipe(response);
}

const server = http.createServer((request, response) => {
  serve(request, response).catch((error) => {
    console.error("Failed to handle request:", error);
    if (!response.headersSent) {
      respondText(response, 500, "Internal server error");
    } else {
      response.destroy(error);
    }
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Website server listening on port ${port}`);
});

server.on("error", (error) => {
  console.error("Website server failed to start:", error);
  process.exitCode = 1;
});
