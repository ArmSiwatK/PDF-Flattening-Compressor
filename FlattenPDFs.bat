@echo off
cd /d "%~dp0"
echo Running PDF flattening script...
echo ---------------------------------
node src/main.js
echo ---------------------------------
echo Script finished.
pause