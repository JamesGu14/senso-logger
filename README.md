# senso-logger
Easy adoption logger function for node.js projects. 

Features:
1. Automatically create log folder in your node project.
2. Archive files by month. 
3. Optional colored logs in console

Install module:

```js  
  npm install --save senso-logger
```

Syntax (see how easy it is!):

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