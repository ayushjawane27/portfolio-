# Deploy Ayush Jawane Portfolio to Vercel
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Ayush Jawane Portfolio - Vercel Deployment" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$projectDir = "C:\Users\ayush\.gemini\antigravity\scratch\ayush-portfolio"
Set-Location -Path $projectDir

Write-Host "Building fresh production bundle..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "Starting Vercel CLI Deployment..." -ForegroundColor Green
Write-Host "Follow any browser login prompts if required." -ForegroundColor White
Write-Host ""

npx vercel --prod
