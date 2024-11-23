# Determine the directory of the script
$ScriptDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path

# Define the output directory (images folder)
$OutputDirectory = Join-Path -Path $ScriptDirectory -ChildPath "images"

# Ensure the output directory exists
if (!(Test-Path $OutputDirectory)) {
    New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
    Write-Host "Created output directory: $OutputDirectory"
}

# Initialize a counter for sequential numbering
$FileCounter = 1

# Loop through all .txt files in the script's directory
Get-ChildItem -Path $ScriptDirectory -Filter *.txt | ForEach-Object {
    $FilePath = $_.FullName
    
    # Read all lines from the text file
    $Links = Get-Content -Path $FilePath | Where-Object { $_ -match "https?://" }

    if ($Links) {
        Write-Host "Processing links from: $FilePath"

        # Process each link
        $Links | ForEach-Object {
            $URL = $_.Trim()  # Clean up any whitespace

            if ($URL) {
                # Generate a sequential file name (e.g., 01.png, 02.png)
                $FileNumber = "{0:D2}" -f $FileCounter
                $OutputFile = Join-Path -Path $OutputDirectory -ChildPath ("$FileNumber.png")

                # Download the file
                try {
                    Invoke-WebRequest -Uri $URL -OutFile $OutputFile
                    Write-Host "Downloaded: $OutputFile"
                    $FileCounter++
                } catch {
                    Write-Warning "Failed to download $URL from $FilePath"
                }
            }
        }
    } else {
        Write-Warning "No valid links found in $FilePath"
    }
}
