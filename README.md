[![Dependency Status](https://gemnasium.com/badges/github.com/enformat/vsts-tasks.svg)](https://gemnasium.com/github.com/enformat/vsts-tasks)


# vsts-tasks
Custom task to VSTS build and release process. Implemented tasks:
    - Code Coverage Threshold
    - Robocopy

##Code Coverage Threshold

This step allows to set a threshold for the minimum lines covered required in the analysis. If this threshold is not overcomed, then return an error.

Currently only supports vstest.console run projects.

###Coming features

Add configurable excluded dlls from analysis.

Allow warning threshold

Xunit test support

##Robocopy

Allows robocopy usage from build or release process

##Creating vsix file to install it to a vsts or tfs

To create a new version of .vsix package you should follow this steps:

* Add new extension configuration vss-extension.json configuration file
* Upgrade version of modified task
* Upgrade version package to vss-extension.json
* Open a powershell console
* Run command: * npm install -g tfx-cli
* Run command: tfx extension create --manifest-globs vss-extension.json