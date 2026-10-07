# Wattwise · Appliance Energy Consumption Website

A responsive COS30045 Data Visualisation website. **Televisions** tells the Exercise 3 story “More stars do not guarantee less electricity” using only the supplied **3 October 2026** CSV. Home has an illustrative appliance calculator. There is no separate Insights page; the entire Exercise 3 story, charts, methods and workflow diagram are on Televisions.

The user-provided power logo informs the amber palette. The interface takes visual inspiration from shadcn/ui, but uses HTML, CSS and vanilla JavaScript. No shadcn components or external charting library are installed.

## Run the website

Open index.html directly

## Data Story

### Audience, interest and desired action

The audience is an Australian household member comparing TV sizes and energy labels before buying. They need a clear way to distinguish **efficiency relative to size** from **absolute annual electricity use**. The data does not contain a buyer survey, so this project does not claim to measure how widespread misunderstanding is.

Question: **Can a higher-star, larger television use more electricity than a lower-star, smaller one, and how should that change a buying decision?**

Message: **More stars do not guarantee less electricity across different screen sizes. Compare labelled kWh/year when choosing between sizes. Use stars to compare efficiency among similar-size, similar-feature TVs.**

Desired action: choose a size that meets the household's needs, compare annual kWh on the shortlist, and use the household's own electricity usage rate. Do not upgrade screen size solely because the larger model has more stars.


### Visualisation design guidelines

- Begin with a concrete buying decision and one takeaway per chart.
- Show the denominator, the registration counting unit and kWh/year.
- Distinguish whole-cohort medians from individual model examples.
- Use zero-based quantitative scales. Use a min–max range only when labelled as such, not as a confidence interval.
- Separate size and stars in a comparison grid instead of pooling unlike sizes.
- Include small-group warnings, accessible tables and direct series labels.
- Do not claim a causal effect of “adding stars”, brand superiority, buyer misunderstanding rates or guaranteed bill savings.

### Storyboard


| | | |
| --- | --- | --- |
| **Issue:**<br>More stars = smaller bill?<br>Not always! | **Demonstrate issue:**<br>show 75" 5-star vs 55" 3-star<br>annual kWh range of each (chart 1)<br>5-star uses more, in all 715 pairs | **Why it happens:**<br>show 3 star-rating lines across 4 TV sizes (chart 2)<br>stars only compare TVs of similar size |
| **Do stars still help?**<br>yes, at the same size<br>show 65" TVs from 3 to 7 stars (chart 3) | **Show evidence:**<br>696.5 → 554 → 441 → 360 → 250.5 kWh/year<br>about 64% lower from 3 to 7 stars<br>(cohorts range from 6 to 96 TVs) | **RECOMMENDATION:**<br>different sizes → compare kWh/year<br>similar size → stars help too |


### Findings and chart choices

**Chart 1** is a range-and-median dot plot. Among all eligible 55-inch/3-star registrations, n=11, min=499, median=514 and max=532 kWh/year. Among all eligible 75-inch/5-star registrations, n=65, min=550, median=598 and max=612. The ranges do not overlap. The median comparison is 16.34% more annual labelled energy at the larger/higher-star cohort median.

Because the smaller/low-star group's maximum (532) is below the larger/high-star group's minimum (550), all 11 × 65 = **715 possible comparisons** necessarily have a positive larger-minus-smaller difference, from 18 to 113 kWh/year. This follows from the observed ranges; the simplified KNIME workflow does not include an all-pairs branch. These hypothetical pairs reuse 76 registrations, so they are **not 715 independent observations**. This describes only these preselected cohorts, not a market-wide probability or hypothesis test.

An individual illustration is Samsung QA75Q70CA* (Submit_ID 151761, 75 inches, 5 stars, 580 kWh/year) versus Kogan KAQL55Q97T* (171487, 55 inches, 3 stars, 513). The illustration is not the evidence for the whole-cohort finding or a product recommendation.

**Chart 2** uses median-energy lines for 3, 5 and 6 stars at nominal 55, 65, 75 and 85 inches. It is a quantitative size axis, **not a time series**. Different line styles and direct labels complement colour. Twelve cell counts range from 5 to 96 registrations. At 5 stars, the median rises from 332 at 55 inches to 750 at 85 inches. The exact cohort values and counts appear in the accessible data tables on the page.

**Chart 3** fixes nominal size at 65 inches and compares five rating cohorts. Median labelled energy falls at every step: 696.5 kWh/year at 3 stars (n=6), 554 at 4 stars (n=72), 441 at 5 stars (n=96), 360 at 6 stars (n=69), and 250.5 at 7 stars (n=6). The 7-star median is about 64.03% lower than the 3-star median. This is a descriptive relationship, not an experiment in changing stars; the small endpoint cohorts limit generalisation.

The **tariff illustration** multiplies the 84 kWh difference between Chart 1 cohort medians by an editable rate. At 30 cents/kWh it is AUD 25.20/year. The rate is an example, not a current Australian average. This is not a promised saving between products or a household-bill forecast.

### Corrections to the proposed draft

The page uses one row per Submit_ID consistently. Numbers from listing rows are not mixed with registration medians:

| Metric | Registration analysis (main story) | Listing-row sensitivity |
| --- | --- | --- |
| 55-inch / 3-star median | 514, n=11 | 513, n=28 |
| 75-inch / 5-star median | 598, n=65 | 598.5, n=110 |
| 65-inch / 3-star median | 696.5, n=6 | 696, n=18 |
| 65-inch / 7-star median | 250.5, n=6 | 254, n=8 |

Pearson correlation between nominal inches and Star2 is -0.02370 in the 2,702-registration analysis. Near-zero correlation does **not** establish the label's definition or independence, so it is not used as the main evidence. The official explanation establishes the size adjustment. The Uniden 16-inch/0-star comparison is omitted because there are no zero-star entries in the scoped, approved, available, unexpired Australian sample. The Hisense 116UX example is eligible but not needed for the central finding.

## About the data

### Data source

Only the supplied tv_2026_10_03.csv feeds the Televisions story and its new workflow. The filename indicates a 3 October 2026 snapshot. It contains 5,340 rows and 32 columns describing TV registrations. No February or September CSV is joined or compared in this analysis.

The [Australian Energy Rating TV guidance](https://www.energyrating.gov.au/consumer-information/products/televisions) explains that stars account for appliance size and should be compared among same-size TVs. The [government energy-rating guidance](https://www.energy.gov.au/households/energy-rating) describes the TV label's 10-hour viewing/14-hour standby daily assumptions. These sources provide domain context, not additional observations.

Exact download provenance, actual extraction time and the licence of the particular supplied CSV have not been independently confirmed. Confirm them before public redistribution beyond coursework. SHA-256 of the supplied CSV:

~~~text
8aec4e0219377a17a0b12bfbe47e6a034a81bfc0da003c9b0e7fbc6e842b92b9
~~~

### Data processing and transformations

1. Read the unmodified CSV from the workflow data area. Retain the raw source.
2. Keep SoldIn containing Australia (5,032 rows), Availability Status=Available (4,845), SubmitStatus=Approved (4,844), and ISO ExpDate on or after the fixed snapshot date 2026-10-03 (4,842). The expiry exclusion is two listing rows for one registration.
3. Validate non-missing ID, numeric Star2 in 0–10, positive centimetre diagonal and positive annual labelled kWh. No eligible rows fail these checks. Missing values are not converted to zero.
4. A separate CSV script audits each Submit_ID for consistency of rating, screen size, energy, brand, technology and expiry; it found no within-ID conflicts in these fields. The simplified KNIME workflow does not include this audit branch. Model_No may legitimately contain variants.
5. Retain the first row per Submit_ID. The unit of analysis becomes **2,702 registrations**, not a count of unique products, sales or independent model variants. The independent check supports this choice for this snapshot.
6. Derive nominal_inches = round(screensize / 2.54). The common sizes in this story do not sit on half-inch rounding ties.
7. Define explicit size × Star2 cohorts. The KNIME chart branches aggregate median labelled kWh; the independent script also calculates group minimum, maximum and count for the page. Median uses the mean of the middle two observations for an even-sized group.
8. Compare the complete ranges from the independent check. Since 532 is below 550, every possible cross-cohort difference is positive. There is no all-pairs branch in the simplified workflow.
9. Hold size fixed for the five 65-inch cohorts in Chart 3. Build the 12-cell size-rating grid for the separate line visualisation.
10. The independent script repeats the main cohort medians using listing rows before deduplication. The finding's direction is unchanged. There is no CSV Writer in the supplied simplified workflow; the website's chart-data CSVs were generated by the separate script.

Brand case variants are not merged because there is no brand-level ranking. Changing unrelated names would not improve this question. Extreme but valid records are not removed simply to make a cleaner chart. No external feature, purchase-price or sales data is invented.

### KNIME workflow and supporting evidence

The Televisions page shows the diagram of the student's **29-node KNIME workflow** at `assets/img/workflow.svg`. Its shared left-to-right spine filters, validates and deduplicates the data, derives rounded screen inches and creates the two kWh aggregation columns. It then splits into three branches: Chart 1 and Chart 3 finish with Bar Chart nodes, while Chart 2 uses GroupBy, Pivot, Sorter and Column Renamer before a Line Plot. The screenshots embedded on Televisions are the executed views supplied by the student. The website's custom range, line and same-size plots use independently checked cohort values and give the groups clearer labels than the native screenshots.

The simplified workflow contains no all-pairs branch, sensitivity branch or CSV Writer. The website's chart data and additional registration-consistency, range and listing-weight sensitivity checks were produced by a separate Python analysis script. The original KNIME screenshots are `assets/img/knime-chart-1.png` through `knime-chart-3.png`; each is identified beside the relevant chart and can be opened at full resolution.

The chart values are embedded in the page and chart assets. The chart-data CSV, audit JSON, analysis script and KNIME workflow archive are not included in the current website distribution.

### Privacy

The source describes products, companies and registrations, not household-level or customer records. The website does not collect personal information. No private student paths are required to run the distributed workflow. Local file paths are omitted from the analysis copy shown to readers.

### Accuracy and limitations

- This is a single supplied registry snapshot, not sales, ownership or a live stock check. Available is a source status.
- The filename's date is a supplied snapshot label, not independently authenticated extraction metadata.
- Star2 is the label-linked rating. The historical Star column is not used.
- Stars are based on energy and size, so the same-size relationship is expected from the rating design; it is not an independent causal finding.
- Size rounding creates nominal cohorts. Technologies, brightness, features and prices are not controlled or matched within them.
- Cohort counts are unequal and some are small. Chart 3 ranges from 6 registrations in each endpoint cohort to 96 in the 5-star cohort.
- Labelled kWh reflects standard test conditions, not the actual consumption of a particular home. Tariff examples exclude supply charges.
- The 715 possible pairings follow from non-overlapping observed ranges; they are not 715 independent TVs or a KNIME pair table. No p-value, confidence interval or claim about the prevalence of buyer misunderstanding is made.
- Choice of the two main cohorts is a purposeful illustration of a possible buying trap, not proof that every larger higher-star TV uses more energy.
- Deduplication changes weights. The explicit listing sensitivity check supports the direction of this specific finding, not representativeness of the market.

### Ethics

Avoid shaming a brand or implying that an energy label is dishonest. The stars and kWh answer different questions. Present sample sizes, exclusions and contradictory possibilities openly. Do not promote unnecessary replacement of an existing TV: purchase price, embodied energy, lifespan and disposal are not in the dataset. Recommend reading the label and choosing a suitable size, not buying a particular model.

## AI Declaration

OpenAI Codex assisted with CSS/JavaScript, chart design, independent reproducibility scripts, README. The student supplied the detailed description, CSV and logo, chose the final star-rating direction, making the KNIME workflow and supplied screenshots of its two Bar Chart views and one Line Plot view. Codex placed those screenshots and the workflow diagram on the page.


## Site structure

```text
/
├── index.html
├── televisions.html
├── about.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── televisions.js
│   └── img/
│       ├── PowerIcon.png
│       ├── knime-chart-1.png
│       ├── knime-chart-2.png
│       ├── knime-chart-3.png
│       ├── star-rating-grid.svg
│       └── workflow.svg
└── README.md
```

The three HTML pages and README stay at the project root. Styles, scripts and images use the recommended `assets/css/`, `assets/js/` and `assets/img/` directories. All website links use relative paths, so the same structure works locally and when deployed in a subdirectory.

The Home calculator's example wattages and default 30 cents/kWh are not Australian market averages. Its calculation is `watts × hours ÷ 1000` for daily kWh, multiplied by 30 or 365 for monthly/yearly energy, then by `cents per kWh ÷ 100` for estimated cost. It excludes daily supply charges and most usage variability. These illustrative calculator values must not be confused with the labelled annual TV data.
