module.exports = {
    entry: './src/app.ts',
    output: {
        name: 'server',
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'builtin:swc-loader'
            },
        ],
    }
}