# Tamworth business import

This tool creates editable **published, unfeatured** listings with Monday–Friday **09:00–17:00**, no weekend periods, and `/images/business-placeholder.svg`. These hours are placeholders, not verified trading hours. Approved businesses are published on import and are not featured.

## Discover businesses

From the project root:

```sh
npm run businesses:import -- --discover
```

This queries OpenStreetMap for named shops, trades, offices, hospitality, health businesses and fitness venues inside **Tamworth Borough, Staffordshire, UK** (relation 165856). It writes `data/tamworth-businesses.json` and does not connect to your database. It is an incomplete candidate list, includes chains, and does not establish ownership or business size. Home businesses and businesses outside the borough boundary may be missing. Addresses and category guesses need checking.

Discovery refuses to overwrite an existing file so it cannot erase your corrections or approvals. For a fresh snapshot:

```sh
npm run businesses:import -- --discover --file data/tamworth-businesses-new.json
```

You can also supply your own JSON, following `tamworth-businesses.example.json`. A name, category slug, and public source URL are required. Keep each source URL for later checking. No source descriptions or third-party photographs are copied.

## Review and import

1. Open the JSON. Confirm a candidate is currently trading, small and independent, then set its `approved` value to `true`. Leave chains and uncertain entries unapproved. Correct names, addresses, contact details, and `categorySlug` as needed.
2. Preview approved records offline:

   ```sh
   npm run businesses:import
   ```

3. Create the approved published listings in the database selected by your `.env` `DATABASE_URL`:

   ```sh
   npm run businesses:import -- --apply
   ```

Use `--file path.json` for another input file. All referenced categories must already exist; the app's category seed in `prisma/seed.ts` supplies the standard slugs. The importer reports missing categories before creating anything. It does not run migrations or seed categories itself.

Existing records with the same slug **or case-insensitive name** are skipped, preserving all previous edits and hours. Duplicate approved slugs within the input are rejected. Merge duplicate map entries before import. Distinct branches with identical names are deliberately skipped for manual handling; the importer never guesses which existing branch to update. Run only one import process at a time. Each batch is committed in a single transaction.

After import, open `/admin/businesses` to replace images and hours, confirm categories and details, and manage publication or featured status. The default image is a local SVG included in this repository and is allowed by the business edit form validation.

## Categories

Use one of the existing category slugs, for example `food-drink`, `shopping-retail`, `trades-home-services`, `beauty-personal-care`, `health-wellbeing`, `sport-fitness-leisure`, `motoring-transport`, `property-accommodation`, `professional-business-services`, `pets-animals`, `education-childcare`, or `entertainment-events`. Discovery suggestions are guesses and should be reviewed.

## Data attribution

Discovery data is © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), available under the ODbL. The JSON preserves the attribution and individual source links. Before publishing OSM-derived listings, provide visible OpenStreetMap attribution with a link to that copyright page and follow its database licensing requirements. The candidate file is an editable research snapshot, not proof that every business is independent or still open.

## Checks

```sh
npm run businesses:test
npm run businesses:import -- --help
```

No database writes happen without `--apply`. Discovery errors, empty results, and partial Overpass responses leave the output file unwritten.
