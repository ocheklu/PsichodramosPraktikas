$file = 'c:\Users\olegc\Desktop\Work\Therapy\psichodrama-website\tekstai\panika.html'
$content = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

$old = @'
                <p>
                    Žingsnis po žingsnio:
                </p>

                <p>
                    1️⃣ Kvėpuoti. Taip pradėsime grąžinti Orą.
                </p>

                <p>
                    2️⃣ Inicijuoti ir stebėti fizinį pojūtį. Taip pradėsime grąžinti Žemę.
                </p>

                <p>
                    3️⃣ Garsiai įvardyti, kas jūs, kur esate, ką matote ir jaučiate šią akimirką. Pavyzdžiui, aš (vardas, pavardė) esu Vilniaus parke (vietos pavadinimas), stoviu abiem savo kojomis ant žalios pievos. Esu apsirengęs raudoną striukę su juodu užtrauktuku. Aviu 43 dydžio baltus batus, šiek tiek suspaustas didelis kairės kojos pirštas. Taip tęsime grąžinti Žemę.
                </p>

                <p>
                    4️⃣ Paskambinti ar susitikti su jus mylinčiu žmogumi. Taip pradėsime grąžinti Šviesą.
                </p>
'@

$new = @'
                <p>
                    Žingsnis po žingsnio:
                </p>

                <div style="margin: var(--space-lg) 0;">
                    <div style="margin-bottom: var(--space-md);">
                        <p><strong>Kvėpuoti.</strong> Taip pradėsime grąžinti Orą.</p>
                    </div>
                    <div style="margin-bottom: var(--space-md);">
                        <p>Inicijuoti ir <strong>stebėti fizinį pojūtį.</strong> Taip pradėsime grąžinti Žemę.</p>
                    </div>
                    <div style="margin-bottom: var(--space-md);">
                        <p>Garsiai įvardyti, kas jūs, kur esate, <strong>ką matote ir jaučiate šią akimirką.</strong> Pavyzdžiui, aš (vardas, pavardė) esu Vilniaus parke (vietos pavadinimas), stoviu abiem savo kojomis ant žalios pievos. Esu apsirengęs raudoną striukę su juodu užtrauktuku. Aviu 43 dydžio baltus batus, šiek tiek suspaustas didelis kairės kojos pirštas. Taip tęsime grąžinti Žemę.</p>
                    </div>
                    <div style="margin-bottom: var(--space-md);">
                        <p><strong>Susitikti su jus mylinčiu žmogumi.</strong> Jei šiuo metu tokio žmogaus nėra šalia – kreiptis į emocinės paramos specialistus, pavyzdžiui Jaunimo liniją. Taip pradėsime grąžinti Šviesą.</p>
                    </div>
                </div>
'@

if ($content.Contains($old)) {
    Write-Host 'MATCH FOUND - replacing...'
    $result = $content.Replace($old, $new)
    [System.IO.File]::WriteAllText($file, $result, [System.Text.Encoding]::UTF8)
    Write-Host 'Done.'
} else {
    Write-Host 'NOT FOUND'
    # Debug: check if key phrases exist
    Write-Host "Has 'Žingsnis': $($content.Contains('Žingsnis'))"
    Write-Host "Has 'Kvėpuoti': $($content.Contains('Kvėpuoti'))"
    Write-Host "Has emoji step 1: $($content.Contains('1️⃣'))"
    # Show relevant section
    $idx = $content.IndexOf('Žingsnis')
    if ($idx -ge 0) {
        Write-Host "--- Context at Žingsnis (idx $idx) ---"
        Write-Host $content.Substring($idx, [Math]::Min(500, $content.Length - $idx))
    }
}
