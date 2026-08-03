#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

echo "==> Installing Node dependencies"
npm install

echo
echo "==> Checking for a LaTeX toolchain (needed by 'build-cv' to compile PDFs)"
if command -v pdflatex >/dev/null 2>&1; then
  echo "    found: $(command -v pdflatex)"
else
  echo "    pdflatex not found."
  echo "    Install a TeX distribution to compile PDFs, e.g.:"
  echo "      Ubuntu/Debian: sudo apt-get install texlive-latex-base texlive-latex-extra"
  echo "      macOS:         brew install --cask mactex-no-gui"
  echo "    'build-cv' will still generate the .tex files without it, just won't compile them."
fi

echo
echo "==> Checking for pdftotext (needed by 'generate-input-for-cv' to read an existing resume)"
if command -v pdftotext >/dev/null 2>&1; then
  echo "    found: $(command -v pdftotext)"
else
  echo "    pdftotext not found."
  echo "    Install poppler-utils to enable it, e.g.:"
  echo "      Ubuntu/Debian: sudo apt-get install poppler-utils"
  echo "      macOS:         brew install poppler"
fi

echo
echo "==> Done. Try:"
echo "      npm run build-cv"
echo "      npm run generate-input-for-cv -- /path/to/existing-resume.pdf"
