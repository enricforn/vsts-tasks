[![Dependency Status](https://gemnasium.com/badges/github.com/enformat/vsts-tasks.svg)](https://gemnasium.com/github.com/enformat/vsts-tasks)


# vsts-tasks
Custom task to VSTS build and release process. Implemented tasks:
    - Code Coverage Threshold
    - Robocopy

## Code Coverage Threshold

This step allows to set a threshold for the minimum lines covered required in the analysis. If this threshold is not overcomed, then return an error.

Currently only supports vstest.console run projects.

## Robocopy

Allows robocopy usage from build or release process

## How to use it

- Create a vsix file to install custom tasks to vsts or tfs, following these steps:
    * Add new extension configuration vss-extension.json configuration file
    * Upgrade version of modified task
    * Upgrade version package to vss-extension.json
    * Open a powershell console
    * Run command: * npm install -g tfx-cli
    * Run command: tfx extension create --manifest-globs vss-extension.json
- If you're using Visual Studio online you can install extension from marketplace. If you are using an on premise installation of VSTS, you can install vsix file to your server, from the url similar to this one: https://vsts.enformat.com/_gallery/manage

## Coming features

### New features for CodeAnalysisThreshold task:
        - Add configurable excluded dlls from analysis.
        - Allow warning threshold
        - Xunit test support

## How to contribute

You can create and issue, or even better create a pull request :)