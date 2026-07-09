@echo off
setlocal
set MVNW_DIR=%~dp0
set MVNW_REPO=%MVNW_DIR%.mvn\apache-maven-3.9.9
set MVNW_ZIP=%MVNW_DIR%.mvn\apache-maven-3.9.9-bin.zip
set MVNW_URL=https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip

if not exist "%MVNW_REPO%\bin\mvn.cmd" (
  if not exist "%MVNW_DIR%.mvn" mkdir "%MVNW_DIR%.mvn"
  echo Downloading Maven distribution...
  powershell -NoProfile -Command "Invoke-WebRequest -Uri '%MVNW_URL%' -OutFile '%MVNW_ZIP%'"
  if not exist "%MVNW_ZIP%" (
    echo Failed to download Maven.
    exit /b 1
  )
  powershell -NoProfile -Command "Expand-Archive -Path '%MVNW_ZIP%' -DestinationPath '%MVNW_DIR%.mvn' -Force"
)

if exist "%MVNW_REPO%\bin\mvn.cmd" (
  "%MVNW_REPO%\bin\mvn.cmd" %*
) else (
  echo Maven installation was not created successfully.
  exit /b 1
)
