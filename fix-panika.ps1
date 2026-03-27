$file = 'c:\Users\olegc\Desktop\Work\Therapy\psichodrama-website\tekstai\panika.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Find and show context around the steps
$idx = $content.IndexOf('Zingsnis po zingsnio')
if ($idx -lt 0) { $idx = $content.IndexOf("Žingsnis po žingsnio") }
if ($idx -ge 0) {
    Write-Host "Found steps at index $idx"
    Write-Host $content.Substring($idx, [Math]::Min(600, $content.Length - $idx))
} else {
    Write-Host "NOT FOUND"
}

# Check for emoji bytes
$emoji1 = [char]0x31 + [char]0xFE0F  # won't work this way, let's just search by surrounding text
$hasEmoji = $content -match '1️⃣'
Write-Host "Has emoji pattern: $hasEmoji"

# Try to find the paragraph with Kvepuoti
$idx2 = $content.IndexOf("Kvėpuoti")
if ($idx2 -ge 0) {
    Write-Host "Found Kvepuoti at $idx2"
    # Show 50 chars before and after
    $start = [Math]::Max(0, $idx2 - 50)
    Write-Host $content.Substring($start, [Math]::Min(150, $content.Length - $start))
}
