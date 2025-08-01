@echo off
echo "# myalgoapp" >> README.md
git init
git add .
git commit -m "fisst commint"
git branch -M main
git remote add origin https://github.com/myalgofax/myalgoapp.git
git push -u origin main

echo === Deploying the app ===
REM Step 7: Build and Deploy to GitHub Pages
call npm run deploy

echo ===  Deployment Complete ===
pause
