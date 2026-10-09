@echo off
REM Builds TripSplit.exe (a single portable file you can copy or share).
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed.
  echo Install the LTS version from nodejs.org, then run this file again.
  pause
  exit /b 1
)

echo [1/2] Installing build tools (first time takes a few minutes)...
call npm install || goto :fail

echo.
echo [2/2] Building TripSplit.exe...
call npm run dist || goto :fail

echo.
echo Done. Your app is here: %CD%\dist\TripSplit.exe
pause
exit /b 0

:fail
echo.
echo Build failed. Copy the last lines of this window and send them for help.
pause
exit /b 1
