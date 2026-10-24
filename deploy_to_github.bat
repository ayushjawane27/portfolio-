@echo off
title Deploy Ayush Jawane Portfolio to GitHub & Vercel
color 0A
echo ========================================================
echo   Ayush Jawane Portfolio - GitHub & Vercel Deployment
echo   Repository: https://github.com/ayushjawane27/portfolio-.git
echo ========================================================
echo.

set GIT_PATH="C:\Users\ayush\.gemini\antigravity\scratch\mingit\cmd\git.exe"
cd /d "C:\Users\ayush\.gemini\antigravity\scratch\ayush-portfolio"

echo [1/3] Checking Git Status...
%GIT_PATH% status
echo.

echo [2/3] Authenticating & Pushing to GitHub...
echo If you have a GitHub Personal Access Token (PAT), paste it below.
echo (Or press ENTER to use your browser/standard GitHub login):
echo.
set /p TOKEN="GitHub Token (optional, press Enter for browser login): "

if "%TOKEN%"=="" (
    echo.
    echo Pushing with standard Git credential manager...
    %GIT_PATH% push -u origin main
) else (
    echo.
    echo Pushing with token authentication...
    %GIT_PATH% push -u https://%TOKEN%@github.com/ayushjawane27/portfolio-.git main
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo   Repo: https://github.com/ayushjawane27/portfolio-
    echo ========================================================
    echo.
    echo [3/3] Deploy to Vercel:
    echo Opening Vercel New Project page in your browser...
    start https://vercel.com/new/import?s=https://github.com/ayushjawane27/portfolio-
    echo.
    echo In Vercel:
    echo 1. Click 'Import' next to 'portfolio-'
    echo 2. Framework Preset will be automatically detected as 'Vite'
    echo 3. Click 'Deploy'
    echo.
) else (
    echo.
    echo ========================================================
    echo   [NOTICE] If authentication failed:
    echo   1. Generate a token at: https://github.com/settings/tokens
    echo   2. Check 'repo' scope
    echo   3. Run this script again and paste the token.
    echo ========================================================
)

echo.
pause
