@echo off
cd /d "%~dp0"
echo Running PDF flattening script...
echo ---------------------------------
node index.js
echo ---------------------------------
echo Script finished.
pause