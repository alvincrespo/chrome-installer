// First, install required packages inside the container:
// npm init -y && npm pkg set type=module
// npm install @actions/tool-cache @actions/exec
//
// Then, run the script using Node.js:
// node main.js

import * as tc from '@actions/tool-cache';
import * as exec from '@actions/exec';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Step 1: Set up the URL for Chrome stable
const chromeUrl = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb';

// Step 2: Download Chrome
const archive = await tc.downloadTool(chromeUrl);
console.log('Downloaded Chrome to:', archive);

// Step 3: Create temporary directories
const tmpdir = await fs.mkdtemp(path.join(os.tmpdir(), 'deb-'));
const extdir = await fs.mkdtemp(path.join(os.tmpdir(), 'chrome-'));
console.log('Temporary directory:', tmpdir);
console.log('Extraction directory:', extdir);

// Step 4: Extract the .deb package using ar
await exec.exec('ar', ['x', archive], { cwd: tmpdir });

// Step 5: List contents of tmpdir to see what ar extracted
const tmpContents = await fs.readdir(tmpdir);
console.log('Contents after ar extraction:', tmpContents);

// Step 6: Extract data.tar.xz using tar
await exec.exec('tar', [
    '-xf',
    path.join(tmpdir, 'data.tar.xz'),
    '--directory',
    extdir,
    '--strip-components',
    '4',
    './opt/google'
]);

// Step 7: List the extracted Chrome files
const chromeFiles = await fs.readdir(extdir);
console.log('Extracted Chrome files:', chromeFiles);

// Step 8: Remove the google-chrome symlink (if it exists)
try {
    await fs.unlink(path.join(extdir, 'google-chrome'));
    console.log('Removed google-chrome symlink');
} catch (error) {
    console.log('No symlink to remove or error:', error.message);
}

// Step 9: Examine the final structure
const finalFiles = await fs.readdir(extdir);
console.log('Final Chrome installation files:', finalFiles);
