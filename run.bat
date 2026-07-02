@echo off

:: Find and kill whatever program is running on port 3001 && 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3001') do @(
    taskkill /F /PID %%a >nul 2>nul
	echo [Clear] Closed old Backend server on port 3001.
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do @(
    taskkill /F /PID %%a >nul 2>nul
	echo [Clear] Closed old Frontend server on port 5173.
)

:: Close any previously opened terminal windows by matching their title names
taskkill /F /FI "WINDOWTITLE eq Pet Shop Backend*" >nul 2>nul
taskkill /F /FI "WINDOWTITLE eq Pet Shop Frontend*" >nul 2>nul

echo [System] Starting Pet Shop servers...
start "Pet Shop Backend" cmd /k "title Pet Shop Backend && cd backend/pet-store-server && npm run server"
start "Pet Shop Frontend" cmd /k "title Pet Shop Frontend && cd frontend/pet-shop && npm run dev"

:: Open the terminal in the project root and run:
:: .\run.bat (PowerShell or cmd)
:: ./run.bat (Git Bash)