@echo off
setlocal enabledelayedexpansion

set "target_file=gitput.bat"

set "skip_files=node_modules skip2.txt skip3.txt"
for /r %%i in (.) do (
    set "file_path=%%~i"
    set "skip_file=0"
    for %%j in (%skip_files%) do (
        echo "!file_path!" | findstr /i /c:"%%~j" > nul
        if !errorlevel! equ 0 (
            set "skip_file=1"
            goto :skip_file
        )
    )
    if !skip_file! equ 0 (
        findstr /c:"%target_file%" "!file_path!" > nul
        if !errorlevel! equ 0 (
            echo Found: !file_path!
        )
    )
    :skip_file 
)
endlocal