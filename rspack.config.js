module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'server.js',
  },
  mode: process.env.NODE_ENV === 'local' ? 'development' : 'production',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
      },
    ],
  },
};
