"use strict";

let _ = require('lodash');
let gulp = require('gulp');
let Builder = require('../');

let $ = Builder.Plugins;
let config = Builder.config;
let srcPath = `${config.getPath('root.assets.fonts.folder')}/**/*.+(woff|woff2|ttf|eot|svg)`;
let outputPath = config.getPath('root.public.fonts.outputFolder');

/**
 * Copy all fonts to public directory
 *
 * @returns {*}
 */
var fontsTask = function() {
    let name = _.capitalize(this.name);

    this.log(srcPath, outputPath);

    return (
        gulp
            .src(srcPath)
            .pipe($.changed(outputPath)) // Ignore unchanged files
            .pipe(gulp.dest(outputPath))
            .pipe(new Builder.Notification(name + ' Copied!'))
    );
};

Builder
    .addTask('fonts', fontsTask)
    .watch(srcPath)
    .order(2)
    .parallel(true)
    .group(true);