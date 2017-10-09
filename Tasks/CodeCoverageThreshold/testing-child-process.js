'use strict';

var vsts_task_lib = require('vsts-task-lib'),
    task = require('vsts-task-lib/task'),
    child_process = require('child_process'),
    fs = require('fs'),
    path = require('path'),
    find = require('find'),
    DOMParser = require('dom-parser');

var excluded_files = ".test.";
var output_xml_file =  path.join('D:\\enformat-enginyers\\Technic\\Customers\\SolidQ\\CodeCoverage','data-coverage-formatted.xml')

var datacoveragefile = 'D:\\enformat-enginyers\\Technic\\Customers\\SolidQ\\CodeCoverage\\FlexServices.UnitTest_20170904.coverage';

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

var result = child_process.execSync('CodeCoverage.exe analyze /output:"' + output_xml_file + '" "' + datacoveragefile + '"', { cwd : 'D:\\enformat-enginyers\\Technic\\Customers\\SolidQ\\CodeCoverage'}).toString();
console.log(result);


console.log('loading code coverage xml file...')
var streamedFile = fs.readFileSync('D:\\enformat-enginyers\\Technic\\Customers\\SolidQ\\CodeCoverage\\sample-flex-code-coverage.xml');
var doc = new DOMParser().parseFromString(streamedFile.toString());

var dlls = doc.getElementsByTagName('module');

var sum_lines_covered = 0;
var sum_total_lines = 0;
var dll_counter = 0;

for(dll_counter=0;dlls.length>dll_counter;dll_counter++)
  {
      var obj_dll = dlls[dll_counter];

      if(obj_dll.nodeName == 'module') //&&  obj_dll.getAttribute('name').toString().indexOf(excluded_files) == -1)
        {
          var lines_covered = obj_dll.getAttribute('lines_covered');
          var lines_partially_covered = obj_dll.getAttribute('lines_partially_covered');
          var lines_not_covered = obj_dll.getAttribute('lines_not_covered');

          sum_lines_covered += parseInt(lines_covered);
          sum_total_lines += parseInt(lines_covered) + parseInt(lines_partially_covered) + parseInt(lines_not_covered);
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