<#
  Verifica la produzione e segnala a IndexNow le pagine di un piano.

  Primo lancio, in una riga di PowerShell (porta lo script sul PC e lo esegue
  solo se checkout e pull riescono):
    Set-Location C:\dev\agriasystem -ErrorAction Stop; git checkout main; if ($LASTEXITCODE -eq 0) { git pull --ff-only }; if ($LASTEXITCODE -eq 0) { powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verifica-e-segnala.ps1 -Piano scripts\indexnow-piani\<piano>.json } else { Write-Host 'FERMO prima dello script: git checkout main o git pull non riuscito (vedere sopra). Nessuna pagina inviata.' -ForegroundColor Red }
  Lanci successivi, dalla cartella del repository:
    powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\verifica-e-segnala.ps1 -Piano scripts\indexnow-piani\<piano>.json

  Passi, in ordine. Al primo che non riesce lo script si ferma e dice dove.
    1. git e node disponibili; git pull (solo fast-forward) sul ramo main;
       controllo che il commit indicato nel piano sia arrivato;
    2. verifiche in produzione, in sola lettura (scripts/verifica-produzione.mjs);
    3. controllo che il piano non sia già stato inviato, e copia in
       .indexnow/plan.json, dove lo legge scripts/indexnow.mjs;
    4. submit --dry-run: la chiave risponde e ogni pagina pubblicata
       corrisponde all'impronta registrata nel piano;
    5. invio reale a IndexNow, solo se il passo 4 è pulito.

  Lanciare lo script vale come autorizzazione all'invio delle pagine del piano.
  Serve INDEXNOW_KEY in .env.local (vercel env pull) o nell'ambiente.

  -Base, solo per una prova su un'altra versione (es. http://localhost:3000,
  avviata con la stessa INDEXNOW_KEY): esegue i passi 1-4 contro quella base,
  con una copia del piano che punta lì, e salta sempre l'invio reale.
#>
param(
  [Parameter(Mandatory = $true)][string]$Piano,
  [string]$Base = 'https://agriasystem.com'
)

$ErrorActionPreference = 'Continue'
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch {}
# niente avvisi di Node sul tipo dei moduli in mezzo all'esito
$env:NODE_NO_WARNINGS = '1'

$Canonico = 'https://agriasystem.com'
$Base = $Base.TrimEnd('/')
$Prova = $Base -ne $Canonico
$Radice = Split-Path -Parent $PSScriptRoot
Set-Location $Radice

function Passo([int]$Numero, [string]$Testo) {
  Write-Host ''
  Write-Host "[$Numero/5] $Testo" -ForegroundColor Cyan
}

function Fermati([int]$Numero, [string]$Motivo, [string]$Invio = 'Nessuna pagina è stata inviata a IndexNow.') {
  Write-Host ''
  Write-Host "FERMO al passo $Numero di 5: $Motivo" -ForegroundColor Red
  Write-Host $Invio -ForegroundColor Red
  exit 1
}

# 1. Strumenti e aggiornamento del repository
Passo 1 'git pull'
foreach ($Comando in 'git', 'node') {
  # senza questo controllo un comando mancante lascerebbe $LASTEXITCODE al valore precedente
  if (-not (Get-Command $Comando -CommandType Application -ErrorAction SilentlyContinue)) {
    Fermati 1 "$Comando non è disponibile in questa finestra di PowerShell (PATH)."
  }
}
$Ramo = git rev-parse --abbrev-ref HEAD
if ($LASTEXITCODE -ne 0) { Fermati 1 "$Radice non è un repository git." }
if ($Ramo -ne 'main') { Fermati 1 "il ramo attivo è '$Ramo', non 'main'. Eseguire prima: git checkout main" }
git pull --ff-only
if ($LASTEXITCODE -ne 0) { Fermati 1 'git pull non è riuscito (modifiche locali non salvate o ramo divergente da origin/main).' }
if (-not (Test-Path -LiteralPath $Piano)) { Fermati 1 "piano non trovato: $Piano" }
try {
  $Dati = Get-Content -LiteralPath $Piano -Raw -Encoding UTF8 | ConvertFrom-Json
} catch {
  Fermati 1 "il piano non è un JSON leggibile: $Piano"
}
if (-not $Dati.commit) { Fermati 1 'il piano non indica il commit pubblicato (campo commit).' }
git merge-base --is-ancestor $Dati.commit HEAD 2>$null
if ($LASTEXITCODE -ne 0) { Fermati 1 "il commit $($Dati.commit) del piano non è in main: aggiornare il repository." }
Write-Host "main contiene il commit del piano ($($Dati.commit.Substring(0, 7)))."

# 2. Verifiche in produzione (sola lettura)
Passo 2 "verifiche su $Base"
node scripts/verifica-produzione.mjs $Base
if ($LASTEXITCODE -ne 0) { Fermati 2 'il sito non è nello stato atteso (vedere i NO qui sopra).' }

# 3. Piano da inviare
Passo 3 'piano IndexNow'
$Cartella = Join-Path $Radice '.indexnow'
$Attivo = Join-Path $Cartella 'plan.json'
$Impronta = (Get-FileHash -Algorithm SHA256 -LiteralPath $Piano).Hash
if (Test-Path -LiteralPath $Cartella) {
  foreach ($File in Get-ChildItem -LiteralPath $Cartella -Filter 'inviato-*.json') {
    if ((Get-FileHash -Algorithm SHA256 -LiteralPath $File.FullName).Hash -eq $Impronta) {
      Fermati 3 "questo piano è già stato inviato ($($File.Name)): non si reinvia."
    }
  }
} else {
  New-Item -ItemType Directory -Path $Cartella | Out-Null
}
if ($Prova) {
  # copia del piano che punta alla base di prova (submit accetta solo il sito del campo before)
  $Copia = Get-Content -LiteralPath $Piano -Raw -Encoding UTF8 | ConvertFrom-Json
  $Copia.before = $Base
  [IO.File]::WriteAllText($Attivo, ($Copia | ConvertTo-Json -Depth 10), (New-Object System.Text.UTF8Encoding $false))
  $Copiato = Test-Path -LiteralPath $Attivo
} else {
  Copy-Item -LiteralPath $Piano -Destination $Attivo -Force
  $Copiato = (Test-Path -LiteralPath $Attivo) -and ((Get-FileHash -Algorithm SHA256 -LiteralPath $Attivo).Hash -eq $Impronta)
}
if (-not $Copiato) { Fermati 3 'la copia del piano in .indexnow\plan.json non è riuscita (vedere sopra).' }
Write-Host "$(@($Dati.changed).Count + @($Dati.added).Count) pagine da segnalare, $(@($Dati.removed).Count) rimosse."

# 4. Prova senza invio
Passo 4 'submit --dry-run'
if ($Prova) {
  node scripts/indexnow.mjs submit --dry-run --host $Base
} else {
  node scripts/indexnow.mjs submit --dry-run
}
if ($LASTEXITCODE -ne 0) {
  Fermati 4 'il dry-run non è pulito: INDEXNOW_KEY assente o diversa in .env.local, file della chiave non pubblicato, oppure pagine diverse dal piano (causa esatta qui sopra).'
}

# 5. Invio reale, solo verso il dominio di produzione
Passo 5 'invio a IndexNow'
if ($Prova) {
  Remove-Item -LiteralPath $Attivo -Force -ErrorAction SilentlyContinue
  Write-Host "Prova su $Base`: invio reale saltato." -ForegroundColor Yellow
  exit 0
}
node scripts/indexnow.mjs submit | Tee-Object -Variable Uscita
if ($LASTEXITCODE -ne 0) {
  if (@($Uscita) -match '^IndexNow( \([^)]*\))?: HTTP 20[02] ') {
    # invio riuscito ma .indexnow\plan.json non archiviato: si registra il piano come
    # inviato copiando il piano sorgente (stessi byte, riconosciuti dal passo 3)
    $Segno = Join-Path $Cartella ('inviato-manuale-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.json')
    try {
      Copy-Item -LiteralPath $Piano -Destination $Segno -ErrorAction Stop
      $Nota = "Il piano è registrato come inviato in .indexnow\$(Split-Path -Leaf $Segno): un nuovo lancio si fermerà al passo 3. Non rilanciare."
    } catch {
      $Nota = 'ATTENZIONE: non è stato possibile registrare il piano come inviato. NON rilanciare lo script con questo piano.'
    }
    Fermati 5 "IndexNow ha ricevuto le pagine (HTTP 200/202), ma l'archiviazione di .indexnow\plan.json non è riuscita (errore qui sopra)." "Le pagine SONO state inviate. $Nota"
  }
  Fermati 5 "l'invio reale si è fermato senza conferma di IndexNow (controllo della chiave o delle pagine non riuscito, oppure invio rifiutato o senza risposta: esito qui sopra)." 'Il piano non è stato archiviato: rilanciando lo script si riprova con le stesse pagine.'
}
Write-Host ''
Write-Host 'Fatto: produzione verificata e pagine segnalate a IndexNow. Il piano è archiviato in .indexnow e non verrà reinviato.' -ForegroundColor Green
