# COS30045-DataVisualization-QuangHuyTran-106212636
This is a repository for Assignment 1 - COS30049 Data Visuualization
# Wattwise · Appliance Energy Consumption Website

A static, responsive website for COS30045 Data Visualisation. Home introduces appliance energy and offers an illustrative calculator. Televisions tells an evidence-based story for Exercise 3. Insights remains a separate, unfilled Assignment 1 extension for a future dataset.

The supplied power logo informs the amber palette. The interface takes visual inspiration from shadcn/ui but uses only HTML, CSS and vanilla JavaScript; no shadcn components or external chart library are installed.

## Run the website

Open `index.html` directly, or from this directory run:

```sh
python3 -m http.server 8765
```

Then open `http://localhost:8765/televisions.html`. The TV story and charts work without JavaScript. The Home calculator and FAQ require JavaScript.

## Data Story

### Audience, purpose and question

The intended audience is an Australian household member choosing a television. They may know the screen size they want but not what the energy label means. They want to make a practical shortlist, not study a technical registry. The data question is: **How much can labelled annual energy use differ between TVs of the same size?**

The story's central message is: **choose the screen size that meets your needs, then compare labelled kWh/year on similarly sized models.** The desired action is to check the energy label and use the household's own tariff before buying.

Design guidelines for this audience:

- Lead with the decision and one clear takeaway per chart.
- Use familiar screen sizes; always show kWh/year, the population and the number of entries.
- Use a zero-based common scale for size comparisons and a clearly labelled 10th–90th percentile range for 55-inch entries.
- Place a short interpretation beside each chart and the caveats close to the conclusion.
- Do not treat registry entries as sales, star rating as comparable across unlike sizes, or labelled kWh as an individual bill forecast.

### Storyboard

| Reader's next question | Page scene | Message |
| --- | --- | --- |
| Why should I look beyond screen size? | Opening question | Screen size matters, but it is not the whole decision. |
| How much does size change the baseline? | Chart 1: median labelled kWh/year at 43, 55, 65, 75 and 85 inches | The medians rise from 248 to 794 kWh/year across those sizes. |
| What if I already want a 55-inch TV? | Chart 2: 10th percentile, median and 90th percentile for 55-inch entries | The middle 80% spans about 267–466 kWh/year. |
| What should I actually do? | Short recommendation and data limitations | Compare similar-size, similar-feature models by labelled annual kWh and your tariff. |

The webpage follows these scenes vertically for a short spoken walkthrough. There are no timed controls or presentation-only panels.

### Visualisation choices and findings

Chart 1 uses horizontal bars with a common zero baseline and a 900 kWh/year maximum. Size-specific medians avoid allowing extreme entries to dominate a comparison. The five size cohorts contain 249, 736, 713, 578 and 312 entries respectively. The 85-inch median (794) is about 2.2 times the 55-inch median (357). This is a descriptive comparison, not an estimate of the causal effect of changing screen size.

Chart 2 zooms into the 736 nominal 55-inch entries. The interpolated 10th percentile is **266.5 kWh/year**, the median **357**, and the 90th percentile **466**. The chart displays the 10th percentile rounded to 267. The 10th-to-90th gap is 199.5 kWh/year, or approximately $60/year using an *illustrative* tariff of 30 cents/kWh. These percentile points are not a pair of recommended models or a guaranteed saving.

A text table repeats the chart values. All conclusions are based on the provided CSV, not the illustrative numbers on Home.

## About the data

### Source and scope

The immediate source is the user-provided file `tv_2026_02_15.csv`, whose filename indicates a 15 February 2026 snapshot. Its fields describe TV registrations, including `SoldIn`, `Availability Status`, `screensize` (centimetres) and `Labelled energy consumption (kWh/year)`. The [Australian Energy Rating registered-product page](https://www.energyrating.gov.au/about-us/gems-regulator/registered-appliance-and-equipment-data) explains the relevant official registry. We have **not independently verified the exact download provenance, snapshot date or licence of this particular local CSV** against an original distribution URL. Confirm those before publishing it beyond coursework.

The official [Energy Rating label guide](https://www.energyrating.gov.au/consumer-information/understand-energy-rating-label) says TV annual label figures use standardised testing based on 10 hours of viewing and 14 hours of standby per day. It recommends comparing products of similar size and features and calculating a running-cost estimate from labelled kWh × the household tariff.

### Processing and reproducibility

The raw CSV contains 4,724 rows and 32 columns. The analysis:

1. Keeps rows where `SoldIn` explicitly includes Australia: 202 rows removed.
2. Keeps rows whose `Availability Status` is `Available`: another 14 removed.
3. Requires positive, finite screen size and labelled kWh: no further rows removed.
4. Converts diagonal screen size from centimetres to nominal inches by rounding `screensize / 2.54` to the nearest integer. This makes a cohort for each common marketed size.
5. Reports the median kWh/year and entry count for 43, 55, 65, 75 and 85 inches. For 55 inches, it also reports the 10th and 90th percentiles using linear interpolation at `(n − 1) × p`.

The filtered total is **4,508 registration entries**, not 4,508 independent people, sales or necessarily unique models. Multiple registration rows can share a model name; none were arbitrarily discarded. To reproduce the published aggregates with the Python standard library:

```sh
python3 scripts/summarise_tv.py path/to/tv_2026_02_15.csv
```

The script reads the supplied CSV and prints the counts and chart statistics. It does not modify the source file. The raw CSV is not bundled into this website.

### KNIME workflow handoff

The supplied course folder also contains an existing `workflow.knime` with reader, cleaning/filtering, grouping and chart nodes. That workflow was inspected but **not edited or rerun for this website**. The statistics above were independently reproduced from the CSV with `scripts/summarise_tv.py`. To make the KNIME evidence match this story, extend or rebuild the workflow as follows:

1. Read the TV CSV and preserve a raw-input branch.
2. Apply the Australia and Available filters; display row counts 4,724 → 4,522 → 4,508.
3. Convert `screensize` and labelled kWh to numeric, check invalid/missing values, then calculate nominal inches.
4. Branch A: group by nominal size and output entry count and median labelled kWh for the five selected sizes.
5. Branch B: retain nominal 55-inch rows and output count, median, interpolated P10 and P90. Check KNIME's quantile convention against 266.5 and 466 before exporting.
6. Export summary tables, annotate the nodes and compare every exported figure with the webpage before claiming KNIME generated the charts.

The existing `insights.html` is for an independent future dataset, not this Exercise 3 TV analysis. Its generic proposed workflow is not evidence of completed KNIME work.

### Privacy

The fields used here describe products and registrations, not individual households. The website publishes only grouped counts and energy statistics; it does not include the raw rows or collect visitor input. Calculator values stay in the browser. If the source dataset is later combined with person-related data or tracking, its privacy implications must be reassessed.

### Accuracy and limitations

This is a registry snapshot, not a census of TV purchases, actual stock levels or household consumption. `Available` is the source status at the snapshot, not a promise that a model is on sale today. The label is a standardised estimate; picture settings, viewing time, standby behaviour and tariff change real costs. Different technologies and features remain mixed within each size. Multiple registrations and variants can affect medians. The source includes more than one regulatory-standard field, so this story avoids cross-standard star-rating comparisons. This is observational description, not proof that size alone causes the differences. Refreshing the registry would change the figures.

### Ethics

The charts avoid naming brands as winners, ranking sales popularity or implying a guaranteed saving. A same-size comparison is more useful to a shopper than a global ranking. The visual scale, sample sizes, percentile definition and tariff assumption are disclosed. Confirm the exact source licence and attribution terms before republishing the raw data; only derived aggregates are included here.

## AI Declaration

OpenAI Codex assisted with webpage design, HTML/CSS/JavaScript, the CSV analysis script, explanatory copy, data-story structure and this README. The student supplied the logo, dataset and course brief. AI did not generate the CSV or execute KNIME. The descriptive statistics were checked against the supplied CSV; the student should still review the story, reproduce the values in KNIME, verify the source/licence and write any required personal reflection before submission. This acknowledgement also appears in the site footer and About page.

## Site structure

```text
index.html                Illustrative home calculator and FAQ
televisions.html          Exercise 3 TV data story, charts and data table
insights.html             Separate future-dataset scaffold
about.html                Project context and AI acknowledgement
assets/css/styles.css     Shared responsive styling
assets/js/main.js         Home calculator, FAQ and footer year
assets/js/insights.js     Insights scaffold behaviour
assets/img/PowerIcon.png  User-provided logo
scripts/summarise_tv.py   Read-only aggregate checks for the TV CSV
```

The Home calculator's example wattages and default 30 cents/kWh are not Australian market averages. Its calculation is `watts × hours ÷ 1000` for daily kWh, multiplied by 30 or 365 for monthly/yearly energy, then by `cents per kWh ÷ 100` for estimated cost. It excludes daily supply charges and most usage variability. These illustrative calculator values must not be confused with the labelled annual TV data.

## Submission notes

Place the files in the COS30045 GitHub Classroom repository and deploy the same relative folder structure to Mercury. Neither upload has been performed here. Review the rubric and submit meaningful commits; do not invent a history of work. Before presenting, be ready to explain why the story uses medians, what the 10th–90th range means, what the 4,508 entries represent and why the 30-cent tariff is only an example.

