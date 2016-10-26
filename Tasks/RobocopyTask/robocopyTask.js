'use strict';

var vso_task_lib = require('vso-task-lib');
var robocopy = require('robocopy');

var source = vso_task_lib.getPathInput("source", true, true);
var destination = vso_task_lib.getPathInput("destination", true, true);

var files = vso_task_lib.getInput("files", false);

var excludedFiles = vso_task_lib.getInput("excludedFiles", false);
var excludedDirs = vso_task_lib.getInput("excludedDirs", false);

robocopy({
    source: source,
    destination: destination,
    files: files,
    copy: {
        excludedFiles: excludedFiles,
        excludedDirs: excludedDirs
    }
})
.done(function(stdout) {
        console.log(stdout);
    })
.fail(function(error) {
        console.log(error.message);
    });