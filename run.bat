@echo off
setlocal enabledelayedexpansion

:: Define ANSI Escape Colors
for /F %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"
set "R=%ESC%[91m"   &:: Bright Red (Clear / Errors)
set "G=%ESC%[92m"   &:: Bright Green (System)
set "Y=%ESC%[93m"   &:: Bright Yellow (Warnings)
set "W=%ESC%[0m"    &:: Reset back to White

:: Create colored status tags
set "Clear=%R%[Clear]%W%"       &:: [Clear] in Red
set "Warning=%Y%[Warning]%W%"   &:: [Warning] in Yellow
set "System=%G%[System]%W%"     &:: [System] in Green

:: Find and kill whatever program is running on port 3001 && 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do @(
    taskkill /F /PID %%a >nul 2>nul
	echo  %Clear% Closed old Backend server on port 3001.
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do @(
    taskkill /F /PID %%a >nul 2>nul
	echo  %Clear% Closed old Frontend server on port 5173.
)

:: Close any previously opened terminal windows by matching their title names
taskkill /F /FI "WINDOWTITLE eq Pet Shop Backend*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Pet Shop Frontend*" >nul 2>nul

:: Check command line argument (%1)
set "arg=%~1"
set "npmi="

if /i "%arg%"=="i" (
    echo  %System% Starting Pet Shop servers with installation...
    set "npmi=npm i &&"
) else (
    if not "%arg%"=="" echo  %Warning% Unknown argument '%arg%'. Defaulting to run without install.
    echo  %System% Starting Pet Shop servers without installation...
)

:: Run the commands dynamically using the variable
start "Pet Shop Backend" cmd /k "cd backend/pet-store-server && !npmi! npm run server"
start "Pet Shop Frontend" cmd /k "cd frontend/pet-shop && !npmi! npm run dev"

:: Open the terminal in the project root and run:
::
:: PowerShell or cmd
:: .\run.bat (Without installation)
:: .\run.bat i (With installation)
::
:: Git Bash
:: ./run.bat (Without installation)
:: ./run.bat i (With installation)