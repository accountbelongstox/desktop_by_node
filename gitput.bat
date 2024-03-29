@echo off
setlocal
REM YYYY-MM-DD HH:MM:SS
for /f "delims=" %%a in ('wmic OS Get localdatetime ^| find "."') do set datetime=%%a
set "year=%datetime:~0,4%"
set "month=%datetime:~4,2%"
set "day=%datetime:~6,2%"
set "hour=%datetime:~8,2%"
set "minute=%datetime:~10,2%"
set "second=%datetime:~12,2%"
set "timestamp=%year%-%month%-%day% %hour%:%minute%:%second%"
set "core_node_dir=%~dp0core_node\"

REM git
git add .
git commit -m "%timestamp%"
git push --set-upstream origin main

REM Check if the directory exists and navigate into it
if exist "%core_node_dir%" (
    echo Entering %core_node_dir%
    cd /d "%core_node_dir%"
    
    REM Now within the core_node directory, execute Git commands again
    git add .
    git commit -m "%timestamp%"
    git push --set-upstream origin main
    
    echo Exiting %core_node_dir%
)

echo Current working directory: %cd%

endlocal
