const path = require('path');

module.exports = {
  entry:path.join(__dirname,'src/index.js'),
  output:{
    filename:'idGenerator.js',
    path:path.join(__dirname, 'dist/'),
    library:'idGenerator',
    libraryTarget:'umd'
  },
  module:{
    rules:[
      {
        use:/\.js$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader'
        }
      }
    ]
  }
}