@echo off
title Deploy Ayush Jawane Portfolio to GitHub
echo ========================================================
echo   Deploying Ayush Jawane Portfolio to GitHub
echo   Target Repo: https://github.com/ayushjawane27/portfolio-.git
echo ========================================================
echo.

set GIT_PATH="C:\Users\ayush\.gemini\antigravity\scratch\mingit\cmd\git.exe"

cd /d "C:\Users\ayush\.gemini\antigravity\scratch\ayush-portfolio"

echo Staging all updated files...
%GIT_PATH% add .
%GIT_PATH% commit -m "feat: complete interactive developer portfolio with human character and verified resume" 2>nul
%GIT_PATH% branch -M main

echo.
echo To push to GitHub, please enter your GitHub Personal Access Token (PAT).
echo (If you don't have one, generate one at: https://github.com/settings/tokens with 'repo' scope)
echo.
set /p TOKEN="Enter GitHub Token (or press Enter to try default auth): "

if "%TOKEN%"=="" (
    echo Attempting push with default credentials...
    %GIT_PATH% push -u https://github.com/ayushjawane27/portfolio-.git main
) else (
    echo Pushing with provided token...
    %GIT_PATH% push -u https://%TOKEN%@github.com/ayushjawane27/portfolio-.git main
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! Pushed to https://github.com/ayushjawane27/portfolio-
    echo   You can now enable GitHub Pages in your repo settings:
    echo   Settings -^> Pages -^> Branch: main -^> Save
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Please verify your token or repository permissions.
)

pause
