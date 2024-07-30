const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 13597;

app.get('/run/:program', (req, res) => {
  const programName = req.params.program;
  const lnkPath = path.join('C:/Users/XtremeZero/Documents/shortcuts', `${programName}.lnk`);
  const urlPath = path.join('C:/Users/XtremeZero/Documents/shortcuts', `${programName}.url`);

  const startProgram = (filePath) => {
    const child = spawn('cmd', ['/c', filePath], {
      detached: true,
      stdio: 'ignore',
      shell: false
    });

    child.unref();

    child.on('error', (error) => {
      console.error(`Error executing ${filePath}:`, error);
      res.status(500).send(`Error running program: ${error.message}`);
    });

    res.send(`Program ${programName} started successfully.`);
  };

  fs.access(lnkPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // .lnk file exists, spawn a new process to execute it
      startProgram(lnkPath);
    } else {
      // .lnk file does not exist, check for .url file
      fs.access(urlPath, fs.constants.F_OK, (err) => {
        if (!err) {
          // .url file exists, spawn a new process to open it
          startProgram(urlPath);
        } else {
          // Neither .lnk nor .url file exists
          res.status(404).send(`Program ${programName} not found.`);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
