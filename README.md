# senso-logger
Easy adoption logger function for node.js projects. 

Features:
1. Automatically create log folder in your node project.
2. Archive files by date. 
3. 

Install module:

```js  
  npm install --save senso-logger
```

Basic syntax:

```js
  var log = require('log');
  log('text you wanted to create');
```

 Logging Folder Structure

```js
 log
 |--Archive
        |--Jan
        |--Feb
        |--Mar 
 |--Apr
 |--May
```

The above folder structure will be created automatically. 