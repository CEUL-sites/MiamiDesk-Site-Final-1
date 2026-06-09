#!/usr/bin/env bash
# Downloads video assets from the live site if they aren't already present.
# This runs during Netlify builds so the source zip can stay under the proxy
# size limit (videos are excluded from the zip via @netlify/mcp ignore rules).
# Failures are reported but do not abort the build — yarn build continues.

ORIGIN="https://homesprofessional.com"
DEST="public/videos"
mkdir -p "$DEST"

VIDEOS=(
  advisor-brand.mp4
  best_exposure_listings.mp4
  cinematic_house_reach.mp4
  digital_twin_exposure.mp4
  dollhouse_global_reach.mp4
  dollhouse_hand_reach.mp4
  dollhouse_rotating_hands.mp4
  gemini_property_vision.mp4
  globe-bg.mp4
  luxury_advisor_digital.mp4
  luxury_listing_showcase.mp4
  luxury_waterfront_drone.mp4
  miami_madrid_transition.mp4
  miami_realtor_association.mp4
  south_florida_showcase.mp4
  split_foto_miami_spain_mls.mp4
  split_miami_spain_mls.mp4
)

FAILED=0
for v in "${VIDEOS[@]}"; do
  if [ ! -f "$DEST/$v" ]; then
    echo "Fetching $v ..."
    if curl -L --retry 3 --retry-delay 2 --max-time 60 \
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
