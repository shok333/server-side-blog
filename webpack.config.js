const
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    extractSass = new ExtractTextPlugin({
        filename: "[name].css",
        allChunks: true
    });

module.exports = [{
    entry: [
        './src/index.js',
        './src/styles/index.scss',
    ],

    output: {
        path: __dirname + '/static',
        filename: '[name].js',
    },

    watch: true,

    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'react', 'es2015', "stage-0"],
                        plugins: ["transform-runtime"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract([ 'css-loader', 'sass-loader' ])
            }
        ],
    },
    plugins: [
        extractSass
    ]
},{
    entry: [
        './server/src/frontend/index.js',
    ],

    output: {
        path: __dirname + '/server/static',
        filename: '[name].js',
        libraryTarget: "umd",
        library: 'main',
        globalObject: 'this'
    },

    watch: true,

    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'react', 'es2015', "stage-0"],
                        plugins: ["transform-runtime"]
                    }
                }
            }
        ],
    },

    resolve: {
        alias: {
            Frontend: path.resolve(__dirname, 'src'),
        },
    },
}];
