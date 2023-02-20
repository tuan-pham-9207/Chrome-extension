const path = require('path');
const { env } = require('process');
console.log(process.argv)
module.exports = {
    entry: './app-main.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false
    }
};