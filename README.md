# color-box-demo

Demo web site for my [color-box library](https://github.com/jgleman/color-box).

## Deploying

The site is served from https://jgleman.com/color-box/: the `color-box/`
folder of an S3 bucket, behind CloudFront.

The bucket name and CloudFront distribution ID are kept out of the repo. Copy
`.env.deploy.example` to `.env.deploy` (git-ignored) and fill them in, or set
`DEPLOY_BUCKET` and `DEPLOY_DISTRIBUTION_ID` in the environment.

```sh
./deploy.sh            # build, upload, and clear the CloudFront cache
./deploy.sh --dryrun   # build and show what would change
```

Needs AWS credentials that can list, write, and delete in the bucket and create
CloudFront invalidations. Uploads delete files under `color-box/` that aren't in
the new build (old hashed bundles); nothing outside that folder is touched.

Files under `assets/` have content-hashed names, so they're uploaded with a
one-year immutable `Cache-Control`; everything else gets five minutes.
