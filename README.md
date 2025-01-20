# chrome-installer

This is an example repo to demonstrate the fundamental function of [browser-actions/setup-chrome](https://github.com/browser-actions/setup-chrome/tree/master). The goal is to showcase the core functionality for downloading and installing both chrome and it's driver.

# install-browser

This script downloads and installs the chrome browser.

**Usage**:

```bash
./install-browser
```

This is where you should begin to understan the cor mechanism of browser-actions/setup-chrome Github action.

# Dockerfile

The Dockerfile provided in this repo is an image blueprint for installing node by default and the dependencies needed to run chrome in a linux environment.

**Usage**:

*Building the image*

```bash
docker build --no-cache --platform=linux/amd64 -t chrome-installer .
```

Note: I have specified linux/amd64 because I personally work on an M1 mac laptop. Modify the build command to fit your needs.

*Running the image*

```bash
docker run --platform=linux/amd64  -it -v $(pwd):/app chrome-installer
```

Note: I am creating a volume here to keep track of any work I do within the repo itself. I did this mostly for debugging when I was digging into this functionality.

# main.js

TBD
