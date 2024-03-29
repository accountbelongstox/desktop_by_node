@echo off
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)



call :ColorText 0a "green"
echo.
call :ColorText 0C "red"
echo.
call :ColorText 0b "blue"
echo.
call :ColorText 19 "yellow"
echo.
call :ColorText 2F "black"
echo.
call :ColorText 4e "white"
echo.


goto :eof

:ColorText
<nul set /p ".=%DEL%" > "%~2"
findstr /v /a:%1 /R "^$" "%~2" nul

