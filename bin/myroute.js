var _proxyServer = null;

var huePattern = /^\//i;
function hueServer(req, res, next) {
  _proxyServer.web(req, res, { target: 'http://localhost:8888', });
}

var hdfsPattern = /^\/hdfs/i;
function hdfsServer(req, res, next) {
  _proxyServer.web(req, res, { 
    target: 'http://localhost:50070',
    pathRewrite: function(path) {
      if (path.indexOf('/hdfs') === 0) {
        return path.substring(5) || '/';
      }
      return path;
    } 
  });
}

var mapredPattern = /^\/mapred/i;
function mapredServer(req, res, next) {
  _proxyServer.web(req, res, { 
    target: 'http://localhost:50030',
    pathRewrite: function(path) {
      if (path.indexOf('/mapred') === 0) {
        return path.substring(7) || '/';
      }
      return path;
    } 
  });
}

exports.register = function(server, proxyServer) {
  _proxyServer = proxyServer;
  
  server.get(hdfsPattern, hdfsServer);
  server.post(hdfsPattern, hdfsServer);
  server.get(mapredPattern, mapredServer);
  server.get(mapredPattern, mapredServer);
  server.get(huePattern, hueServer);
  server.post(huePattern, hueServer);
}
