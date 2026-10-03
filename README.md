# Wattwise · Appliance Energy Consumption Website

A responsive COS30045 Data Visualisation website. **Televisions** tells the Exercise 3 story “More stars do not guarantee less electricity” using only the supplied **3 October 2026** CSV. Home has an illustrative appliance calculator. There is no separate Insights page; the entire Exercise 3 story, charts, methods and workflow download are on Televisions.

The user-provided power logo informs the amber palette. The interface takes visual inspiration from shadcn/ui, but uses HTML, CSS and vanilla JavaScript. No shadcn components or external charting library are installed.

## Run the website

Open index.html directly, or serve this directory:

~~~sh
python3 -m http.server 8765
~~~

Open http://localhost:8765/televisions.html. All three charts, their interpretations and the data tables work without JavaScript. JavaScript lets the reader change the illustrative tariff. The Home calculator also uses JavaScript.

## Data Story

### Audience, interest and desired action

The audience is an Australian household member comparing TV sizes and energy labels before buying. They need a clear way to distinguish **efficiency relative to size** from **absolute annual electricity use**. The data does not contain a buyer survey, so this project does not claim to measure how widespread misunderstanding is.

Question: **Can a higher-star, larger television use more electricity than a lower-star, smaller one, and how should that change a buying decision?**

Message: **More stars do not guarantee less electricity across different screen sizes. Compare labelled kWh/year when choosing between sizes. Use stars to compare efficiency among similar-size, similar-feature TVs.**

Desired action: choose a size that meets the household's needs, compare annual kWh on the shortlist, and use the household's own electricity usage rate. Do not upgrade screen size solely because the larger model has more stars.

### Relationship to Exercises 1 and 2

Exercise 1 counts available brand listings after basic cleaning. Exercise 2 explores size frequency, size versus energy, screen technology and grouped averages. It also explicitly prompts research into Star2 and comparisons across sizes.

The **meaning of star ratings is therefore not a wholly original concept absent from Exercise 2**. Exercise 3 permits developing an earlier question into a story. This extension contributes a specific decision question and new analysis: exact size × rating cohorts, complete non-overlapping ranges, the implication for all 715 possible cross-cohort pairings, same-size conditioning and sensitivity to listing-row weighting. It replaces the old February page that mainly repeated the size-versus-energy exploration.

### Visualisation design guidelines

- Begin with a concrete buying decision and one takeaway per chart.
- Show the denominator, the registration counting unit and kWh/year.
- Distinguish whole-cohort medians from individual model examples.
- Use zero-based quantitative scales. Use a min–max range only when labelled as such, not as a confidence interval.
- Separate size and stars in a comparison grid instead of pooling unlike sizes.
- Include small-group warnings, accessible tables and direct series labels.
- Do not claim a causal effect of “adding stars”, brand superiority, buyer misunderstanding rates or guaranteed bill savings.

### Storyboard and three-minute speaking path

| Scene | Reader's question | Visual evidence | Spoken focus |
| --- | --- | --- | --- |
| Opening, 0:00–0:25 | Does a bigger star count guarantee a smaller bill? | The 75-inch/5-star versus 55-inch/3-star decision | Stars account for size; annual kWh is the absolute amount. |
| Chart 1, 0:25–1:10 | Is this only one unusual pair? | Complete min–max ranges and median dots | 55-inch/3-star: 499–532, n=11. 75-inch/5-star: 550–612, n=65. All 715 comparisons give the same direction. |
| Chart 2, 1:10–1:50 | Why does this happen? | Three rating series across four size cohorts | Along a line, the rating stays fixed while size and median energy rise. Vertically, size stays fixed while higher stars accompany lower energy. |
| Chart 3, 1:50–2:20 | Are stars still useful? | Two zero-baseline median bars at 65 inches | 696.5 versus 250.5 kWh/year, about 64% lower. Only six registrations in each group. |
| Recommendation, 2:20–2:45 | What should I do in a store? | Short decision rule and optional tariff illustration | Different sizes: compare annual kWh. Similar sizes and features: use stars too. |
| Method, 2:45–3:00 | Can I trust this conclusion? | Workflow download and short scope disclosure | October only, one row per registration, labelled test energy rather than household bills. |

The page scrolls in this order without a timeline or presentation-mode controls. Detailed workflow steps and tables are expandable. Vietnamese presenter notes are included in deliverables/TV_Star_Story_Presenter_Notes.md.

### Findings and chart choices

**Chart 1** is a range-and-median dot plot. Among all eligible 55-inch/3-star registrations, n=11, min=499, median=514 and max=532 kWh/year. Among all eligible 75-inch/5-star registrations, n=65, min=550, median=598 and max=612. The ranges do not overlap. The median comparison is 16.34% more annual labelled energy at the larger/higher-star cohort median.

Because the smaller/low-star group's maximum (532) is below the larger/high-star group's minimum (550), all 11 × 65 = **715 possible comparisons** necessarily have a positive larger-minus-smaller difference, from 18 to 113 kWh/year. This follows from the observed ranges; the simplified KNIME workflow does not include an all-pairs branch. These hypothetical pairs reuse 76 registrations, so they are **not 715 independent observations**. This describes only these preselected cohorts, not a market-wide probability or hypothesis test.

An individual illustration is Samsung QA75Q70CA* (Submit_ID 151761, 75 inches, 5 stars, 580 kWh/year) versus Kogan KAQL55Q97T* (171487, 55 inches, 3 stars, 513). The illustration is not the evidence for the whole-cohort finding or a product recommendation.

**Chart 2** uses median-energy lines for 3, 5 and 6 stars at nominal 55, 65, 75 and 85 inches. It is a quantitative size axis, **not a time series**. Different line styles and direct labels complement colour. Twelve cell counts range from 5 to 96 registrations. At 5 stars, the median rises from 332 at 55 inches to 750 at 85 inches. The exact cohort values and counts appear on the page and in data/star-trap-cohorts.csv.

**Chart 3** fixes nominal size at 65 inches. The 3-star median is 696.5 (n=6); the 7-star median is 250.5 (n=6), about 64.03% lower. This is a descriptive relationship, not an experiment in changing stars. Six observations per group limit generalisation.

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
9. Hold size fixed for the 65-inch comparison. Build the 12-cell size-rating grid for the line visualisation.
10. The independent script repeats the main cohort medians using listing rows before deduplication. The finding's direction is unchanged. There is no CSV Writer in the supplied simplified workflow; the website's chart-data CSVs were generated by the separate script.

Brand case variants are not merged because there is no brand-level ranking. Changing unrelated names would not improve this question. Extreme but valid records are not removed simply to make a cleaner chart. No external feature, purchase-price or sales data is invented.

### New KNIME workflow and reproducibility

Download **deliverables/Wattwise_Star_Rating_Trap.knwf** from the Televisions page. This is a packaged copy of the student's **simplified 26-node KNIME workflow**, with the unmodified October CSV added to its workflow data area for import. The original student archive was not changed. Its left-to-right spine and short chart branches match the EX2-style layout. Three Bar Chart nodes (21, 25 and 30) have saved executed states; the screenshots embedded on Televisions are the actual views supplied by the student. The website's custom range, line and same-size plots use independently checked cohort values and give the groups clearer labels than the native screenshots.

Import the .knwf using KNIME's workflow import option and choose a new destination/name. CSV Reader is configured for **Current workflow data area**. Open the three Bar Chart views. The simplified file contains no all-pairs branch, sensitivity branch or CSV Writer. We have not claimed that the repackaged workflow was rerun after import or verified on another KNIME version. See the included workflow guide for node status and how to reproduce the charts.

The website's downloadable chart-data files under `data/` were produced by `scripts/analyse_star_trap.py`, **not** by KNIME. That script also produced the registration-consistency, range and listing-weight sensitivity checks. The original KNIME screenshots are `assets/img/knime-chart-1.png` through `knime-chart-3.png`; each is identified beside the relevant chart and can be opened at full resolution.

Independent reproduction:

~~~sh
python3 scripts/analyse_star_trap.py /path/to/tv_2026_10_03.csv
~~~

The script produces the website's chart-data CSVs, a machine-readable audit summary and the line-chart SVG. It is an independent cross-check; the executed KNIME chart branches read and transform the raw CSV themselves.

### Privacy

The source describes products, companies and registrations, not household-level or customer records. The website does not collect personal information. No private student paths are required to run the distributed workflow. Local file paths are omitted from the analysis copy shown to readers.

### Accuracy and limitations

- This is a single supplied registry snapshot, not sales, ownership or a live stock check. Available is a source status.
- The filename's date is a supplied snapshot label, not independently authenticated extraction metadata.
- Star2 is the label-linked rating. The historical Star column is not used.
- Stars are based on energy and size, so the same-size relationship is expected from the rating design; it is not an independent causal finding.
- Size rounding creates nominal cohorts. Technologies, brightness, features and prices are not controlled or matched within them.
- Cohort counts are unequal and some are small. Chart 3 has six registrations per group.
- Labelled kWh reflects standard test conditions, not the actual consumption of a particular home. Tariff examples exclude supply charges.
- The 715 possible pairings follow from non-overlapping observed ranges; they are not 715 independent TVs or a KNIME pair table. No p-value, confidence interval or claim about the prevalence of buyer misunderstanding is made.
- Choice of the two main cohorts is a purposeful illustration of a possible buying trap, not proof that every larger higher-star TV uses more energy.
- Deduplication changes weights. The explicit listing sensitivity check supports the direction of this specific finding, not representativeness of the market.

### Ethics

Avoid shaming a brand or implying that an energy label is dishonest. The stars and kWh answer different questions. Present sample sizes, exclusions and contradictory possibilities openly. Do not promote unnecessary replacement of an existing TV: purchase price, embodied energy, lifespan and disposal are not in the dataset. Recommend reading the label and choosing a suitable size, not buying a particular model.

## AI Declaration

OpenAI Codex assisted with dataset analysis, selection and checking of the story, HTML/CSS/JavaScript, chart design, independent reproducibility scripts, README, presenter notes and an earlier KNIME workflow draft. The student supplied the brief, CSV and logo, chose the final star-rating direction, simplified the KNIME workflow and supplied screenshots of its three Bar Chart views. Codex placed those screenshots on the page and packaged a copy of the student-edited workflow with its source CSV.

The three chart nodes in the supplied KNIME file have saved executed states. The reported statistics were separately checked against the CSV script. This is **not** a claim that the repackaged copy has been imported and rerun. The student should import and inspect the workflow, understand its groupings, confirm the CSV's provenance/licence, and review all AI-assisted work before submission. GitHub Classroom submission and deployment have not been performed.

## Site structure

```text
index.html                Illustrative home calculator and FAQ
televisions.html          Exercise 3 TV data story, charts and data table
about.html                Project context and AI acknowledgement
assets/css/styles.css     Shared responsive styling
assets/js/main.js         Home calculator, FAQ and footer year
assets/img/PowerIcon.png  User-provided logo
assets/img/knime-chart-1.png through knime-chart-3.png  Original KNIME chart screenshots
scripts/summarise_tv.py   Read-only aggregate checks for the TV CSV
scripts/analyse_star_trap.py  Independent October checks and chart-data exports
assets/js/televisions.js  Editable illustrative tariff
deliverables/Wattwise_Star_Rating_Trap.knwf  Student-simplified October workflow plus source CSV
```

The Home calculator's example wattages and default 30 cents/kWh are not Australian market averages. Its calculation is `watts × hours ÷ 1000` for daily kWh, multiplied by 30 or 365 for monthly/yearly energy, then by `cents per kWh ÷ 100` for estimated cost. It excludes daily supply charges and most usage variability. These illustrative calculator values must not be confused with the labelled annual TV data.

## Submission notes

Place the files in the COS30045 GitHub Classroom repository and deploy the same relative folder structure to Mercury. Neither upload has been performed here. Include the new workflow and chart data. Before presenting, be ready to explain why stars account for size, why 715 comparisons are not 715 independent observations, why registrations differ from listing variants, and why the 30-cent tariff is only an example. The original February summary script remains a legacy reference; it does not feed the new Televisions page.
