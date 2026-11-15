#!/usr/bin/env bash
# Builds the demo and uploads it to jgleman.com/color-box/, then clears the
# CloudFront cache for that path.
# Usage: ./deploy.sh [--dryrun]
# Uses the default AWS credentials; set AWS_PROFILE to use another profile.
# Reads DEPLOY_BUCKET and DEPLOY_DISTRIBUTION_ID from .env.deploy (not
# committed; see .env.deploy.example) or from the environment.
set -euo pipefail

ENV_FILE=".env.deploy"
PREFIX="color-box"
SITE_URL="https://jgleman.com/$PREFIX/"

cd "$(dirname "$0")"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "$ENV_FILE"
  set +a
fi

BUCKET="${DEPLOY_BUCKET:?Set DEPLOY_BUCKET in $ENV_FILE (see .env.deploy.example)}"
DISTRIBUTION_ID="${DEPLOY_DISTRIBUTION_ID:?Set DEPLOY_DISTRIBUTION_ID in $ENV_FILE (see .env.deploy.example)}"

npm run build

DEST="s3://$BUCKET/$PREFIX"
# Vite puts a content hash in every file name under assets/, so a changed file
# always gets a new URL and these can be cached for a year.
CACHE_HASHED="public, max-age=31536000, immutable"
# index.html, prism.* and the SVGs keep their names across builds.
CACHE_UNHASHED="public, max-age=300"

# Order matters: upload the new bundles before the index.html that references
# them, and prune old bundles only after index.html no longer points at them.
aws s3 sync dist/assets "$DEST/assets/" \
  --cache-control "$CACHE_HASHED" \
  --exclude ".DS_Store" \
  "$@"

# --delete only applies under $PREFIX/, so the rest of the bucket is untouched.
aws s3 sync dist "$DEST/" \
  --cache-control "$CACHE_UNHASHED" \
  --exclude ".DS_Store" \
  --exclude "assets/*" \
  --delete \
  "$@"

aws s3 sync dist/assets "$DEST/assets/" \
  --exclude ".DS_Store" \
  --delete \
  "$@"

if [[ "${1:-}" == "--dryrun" ]]; then
  echo "Dry run: skipping cache invalidation."
  exit 0
fi

invalidation_id=$(aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/$PREFIX/*" \
  --query "Invalidation.Id" \
  --output text)
echo "Invalidating CloudFront cache ($invalidation_id)..."
aws cloudfront wait invalidation-completed \
  --distribution-id "$DISTRIBUTION_ID" \
  --id "$invalidation_id"
echo "Deployed to $SITE_URL"
