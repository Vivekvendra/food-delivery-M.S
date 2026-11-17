Add-Type -AssemblyName System.Drawing
$src = "C:\Users\vendr\.gemini\antigravity\brain\97a1239b-f8ec-4d6a-be0c-8ca2dfb7737f\.user_uploaded\media_1793785558373_218f0d2e.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$cropX = [int]($img.Width * 0.74)
$cropY = [int]($img.Height * 0.71)
$cropW = [int]($img.Width * 0.26)
$cropH = [int]($img.Height * 0.28)
$bmp = New-Object System.Drawing.Bitmap $cropW, $cropH
$g = [System.Drawing.Graphics]::FromImage($bmp)
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropW, $cropH
$destRect = New-Object System.Drawing.Rectangle 0, 0, $cropW, $cropH
$g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
$bmp.Save("C:\STACKLY\FDMS\public\screen12.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Output "Successfully cropped Screen 12"
