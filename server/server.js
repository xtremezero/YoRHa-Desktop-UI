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

  fs.access(lnkPath, fs.constants.F_OK, (err) => {
    if (!err) {
      // .lnk file exists, spawn a new process to execute it
      const child = spawn('cmd', ['/c', lnkPath], { shell: true });

      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      child.on('close', (code) => {
        if (code !== 0) {
          res.status(500).send(`Error running program: exited with code ${code}`);
        } else {
          res.send(`Program ${programName} started successfully.`);
        }
      });

      child.on('error', (error) => {
        console.error(`Error executing ${lnkPath}:`, error);
        res.status(500).send(`Error running program: ${error.message}`);
      });
    } else {
      // .lnk file does not exist, check for .url file
      fs.access(urlPath, fs.constants.F_OK, (err) => {
        if (!err) {
          // .url file exists, spawn a new process to open it
          const child = spawn('cmd', ['/c', urlPath], { shell: true });

          child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
          });

          child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
          });

          child.on('close', (code) => {
            if (code !== 0) {
              res.status(500).send(`Error running program: exited with code ${code}`);
            } else {
              res.send(`Program ${programName} started successfully.`);
            }
          });

          child.on('error', (error) => {
            console.error(`Error executing ${urlPath}:`, error);
            res.status(500).send(`Error running program: ${error.message}`);
          });
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
