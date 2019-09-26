# cssstats-diff
Generate a report of cssstats that differ from one stylesheet to another.

## Install
```sh
npm install cssstats-diff
```

## Usage
The `cssstats-diff` CLI is the best way to use this:

```sh
# diff the stats between two CSS files
npx cssstats-diff before.css after.css

# ...or a file and a URL
npx cssstats-diff https://example.com/main.css main.css

# ...or from two URLs
npx cssstats-diff https://unpkg.com/my-package@{latest,canary}/dist/main.css
```

The default output format is tab-separated values, which can be easily pasted into most spreadsheet applications. Pass `--format=markdown` for a Markdown table, e.g.

| key | delta | before | after |
| :--- | :--- | :--- | :--- |
| size | -5.1 kB | 401325 | 396228 |
| gzipSize | -798 B | 75532 | 74734 |
| rules.total | -60 | 5169 | 5109 |
| selectors.total | -72 | 6301 | 6229 |
| selectors.class | -72 | 6278 | 6206 |
| selectors.pseudoClass | -6 | 651 | 645 |
| selectors.pseudoElement | -7 | 407 | 400 |
| declarations.total | -116 | 10554 | 10438 |
