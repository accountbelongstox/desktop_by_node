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
set "green=\033[92m"
set "reset=\033[0m"


echo %green%Entering %cd%
git remote -v
echo Current working directory: %cd%
echo %reset%
git add .
git commit -m "%timestamp%"
git push --set-upstream origin main

if exist "%core_node_dir%" (
    cd /d "%core_node_dir%"
    echo %green%Entering %core_node_dir%
    git remote -v
    echo Current working directory: %cd%
    echo %reset%
    git add .
    git commit -m "%timestamp%"
    git push --set-upstream origin main
)

endlocal
