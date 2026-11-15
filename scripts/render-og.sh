#!/bin/sh
# Renders tools/og-src/<slug>.html to assets/og/<slug>.jpg (1200x627) with headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
while read -r id slug; do
  [ -z "$slug" ] && continue
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=1 --window-size=1200,627 \
    --screenshot="$PWD/tools/og-src/$slug.png" "file://$PWD/tools/og-src/$slug.html" >/dev/null 2>&1
  sips -s format jpeg -s formatOptions 88 "tools/og-src/$slug.png" --out "assets/og/$slug.jpg" >/dev/null
  echo "assets/og/$slug.jpg"
done < tools/og-src/list.txt
