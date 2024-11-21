# Define the directory containing .url files
$Directory = "C:\Users\Younes\idv-ban-system-new\src\images\survivors\ChairedState0"
$OutputDirectory = "C:\Users\Younes\idv-ban-system-new\src\images\survivors\ChairedState0\images"

# Ensure the output directory exists
if (!(Test-Path $OutputDirectory)) {
    New-Item -ItemType Directory -Path $OutputDirectory
}

# Loop through all .url files in the directory
Get-ChildItem -Path $Directory -Filter *.url | ForEach-Object {
    $FilePath = $_.FullName
    
    # Extract the URL from the .url file
    $URL = Select-String -Path $FilePath -Pattern '^URL=(.+)$' | ForEach-Object { $_.Matches.Groups[1].Value }
    
    if ($URL) {
        # Determine a unique name for the downloaded file
        $FileName = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
        $OutputFile = Join-Path -Path $OutputDirectory -ChildPath ("$FileName.png")
        
        # Download the file
        try {
            Invoke-WebRequest -Uri $URL -OutFile $OutputFile
            Write-Host "Downloaded: $OutputFile"
        } catch {
            Write-Warning "Failed to download $URL from $FilePath"
        }
    } else {
        Write-Warning "No valid URL found in $FilePath"
    }
}
