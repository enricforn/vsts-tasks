'use strict';

var vsts_task_lib = require('vsts-task-lib'),
    task = require('vsts-task-lib/task'),
    child_process = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    find = require('find'),
    DOMParser = require('dom-parser');


//Get input parameters
var lines_covered_threshold = vsts_task_lib.getInput("linesCoveredThreshold", true, false);

var binaries_directory = vsts_task_lib.getPathInput("BinariesDirectory", true, true);
var source = vsts_task_lib.getPathInput("SourcesDirectory", true, true);
var excluded_files = vsts_task_lib.getInput("ExcludedFiles", true, true);

var output_xml_file =  path.join(binaries_directory,'data-coverage-formatted.xml')

var datacoveragefile = '';

//delete output file if exists
if(fs.existsSync(output_xml_file)) {
  try
  {
    fs.unlinkSync(output_xml_file);
  }
  catch(err)
  {
    if(err.code == 'ENOENT') console.log('file data-coverage-formatted.xml do not exist.');
  }
  console.log('file data-coverage-formatted.xml deleted.');
}

console.log('Try finding data.coverage file...')
var files = find.fileSync(/\.coverage$/, source);
console.log('File found ' + files[0]);
datacoveragefile = files[0];

//Convert .coverage file to .xml file
var result = child_process.execSync('CodeCoverage.exe analyze /output:"' + output_xml_file + '" "' + datacoveragefile + '"', { cwd : 'C:\\Program Files (x86)\\Microsoft Visual Studio\\2017\\Enterprise\\Team Tools\\Dynamic Code Coverage Tools' }).toString();
console.log(result);

console.log('loading code coverage xml file...')
var streamedFile = fs.readFileSync(output_xml_file);
var doc = new DOMParser().parseFromString(streamedFile.toString());

var dlls = doc.getElementsByTagName('module');

var sum_lines_covered = 0;
var sum_total_lines = 0;
var dll_counter = 0;

for(dll_counter=0;dlls.length>dll_counter;dll_counter++)
  {
      var obj_dll = dlls[dll_counter];

      if(obj_dll.nodeName == 'module')
        {
          var lines_covered = parseInt(obj_dll.getAttribute('lines_covered'));
          var lines_partially_covered = parseInt(obj_dll.getAttribute('lines_partially_covered'));
          var lines_not_covered = parseInt(obj_dll.getAttribute('lines_not_covered'));

          sum_lines_covered += lines_covered;
          sum_total_lines += lines_covered + lines_partially_covered + lines_not_covered;
        }
  }
    
console.log('Lines covered ' + sum_lines_covered);

var medium_line_coverage = (sum_lines_covered*100) / (sum_total_lines);

if (lines_covered_threshold > medium_line_coverage)
{
    task.setResult(vsts_task_lib.TaskResult.Failed, 'Not enough lines covered by tests. Current percentage ' + medium_line_coverage + '%. Minimum required is ' + lines_covered_threshold + '%.');
}
else
{
    task.setResult(vsts_task_lib.TaskResult.Succeeded, 'Current lines covered percentage: ' + medium_line_coverage + '%. Minimum required is ' + lines_covered_threshold + '%.');
}