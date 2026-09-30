# Stop any process currently on port 3000
$port = 3000
$connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($connections) {
    foreach ($c in $connections) {
        if ($c.OwningProcess -gt 0) {
            Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue
            Write-Output "Killed process on port $port with PID $($c.OwningProcess)"
        }
    }
} else {
    Write-Output "Port $port is free."
}

# Explicitly define the absolute project directory
$projectPath = "C:\Users\ayush\.gemini\antigravity\scratch\ayush-portfolio"
Set-Location -Path $projectPath

# Start python http.server with the working directory strictly set to the portfolio folder
$serverProcess = Start-Process -FilePath "python" -ArgumentList "-m", "http.server", "3000" -WorkingDirectory $projectPath -PassThru -WindowStyle Hidden
Write-Output "Started Python server (PID $($serverProcess.Id)) serving: $projectPath"

# Wait for server to bind
Start-Sleep -Seconds 2

# Verify the HTTP response content
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing -TimeoutSec 5
    Write-Output "HTTP Status Code: $($response.StatusCode)"
    if ($response.Content -match "<title>(.*?)</title>") {
        Write-Output "Verified Page Title: $($matches[1])"
    }
    if ($response.Content -match "Ayush Jawane") {
        Write-Output "Verified Page Content: Ayush Jawane portfolio is serving correctly!"
    }
} catch {
    Write-Output "Verification error: $_"
}

# Open the browser to localhost:3000
Start-Process "http://localhost:3000"
Write-Output "Successfully opened http://localhost:3000 in default browser."
