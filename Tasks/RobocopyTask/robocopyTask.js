'use strict';

var vsts_task_lib = require('vsts-task-lib');
var robocopy = require('robocopy');

var source = vsts_task_lib.getPathInput("source", true, true);
var destination = vsts_task_lib.getPathInput("destination", true, true);

var files = vsts_task_lib.getInput("files", false);

var excludedFiles = vsts_task_lib.getInput("excludedFiles", false);
var excludedDirs = vsts_task_lib.getInput("excludedDirs", false);

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