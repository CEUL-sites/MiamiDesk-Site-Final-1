#!/usr/bin/env bash
# Downloads video assets from the live site if they aren't already present.
# This runs during Netlify builds so the source zip can stay under the proxy
# size limit (videos are excluded from the zip via @netlify/mcp ignore rules).
# Failures are reported but do not abort the build — yarn build continues.

ORIGIN="https://homesprofessional.com"
DEST="public/videos"
SRC="src"
mkdir -p "$DEST"

# Derived from what the site actually references, not hand-maintained. The
# hard-coded list had drifted 21 files behind the components
# (matterport_tour_global.mp4, madrid_piso_entrance.mp4, hand_house_reach.mp4
# and others), so any build relying on this fetch served 404s for them while
# still downloading videos no page uses.
mapfile -t VIDEOS < <(
  grep -rhoE '/videos/[A-Za-z0-9_.-]+\.mp4' "$SRC" \
    | sed 's|^/videos/||' \
    | sort -u
)

if [ "${#VIDEOS[@]}" -eq 0 ]; then
  echo "WARNING: no video references found under $SRC/ — nothing to fetch."
  exit 0
fi

echo "Found ${#VIDEOS[@]} referenced video(s)."

FAILED=0
for v in "${VIDEOS[@]}"; do
  if [ ! -f "$DEST/$v" ]; then
    echo "Fetching $v ..."
    # --fail matters: without it curl exits 0 on a 404 and writes the error
    # page to $DEST/$v, leaving a corrupt file that reports as a success.
    if curl -fL --retry 3 --retry-delay 2 --max-time 60 \
        "$ORIGIN/videos/$v" -o "$DEST/$v" 2>&1; then
      echo "OK: $v"
    else
      echo "WARNING: failed to fetch $v — removing partial file"
      rm -f "$DEST/$v"
      FAILED=$((FAILED + 1))
    fi
  else
    echo "Already present: $v"
  fi
done

if [ "$FAILED" -gt 0 ]; then
  echo "WARNING: $FAILED video(s) could not be fetched. Build will continue."
fi

echo "Video asset fetch complete."
