module.exports = {
  entry: {
    server: './src/app.ts',
    migrations: './src/migration-app.ts',
  },
  output: {
    filename: '[name].js',
  },
  mode: 'development',
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
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
              tsx: true,
            },
            transform: {
              legacyDecorator: true,
            },
          },
        },
      },
    ],
  },
};
