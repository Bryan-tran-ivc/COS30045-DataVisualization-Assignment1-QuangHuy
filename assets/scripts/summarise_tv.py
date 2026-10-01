"""Reproduce the aggregate values used in televisions.html from a TV CSV export.

Usage: python3 scripts/summarise_tv.py path/to/tv_2026_02_15.csv
Uses only the Python standard library. It never modifies the source file.
"""

import argparse
import csv
import json
import math
import statistics
from pathlib import Path


SIZES = (43, 55, 65, 75, 85)
ENERGY_COLUMN = "Labelled energy consumption (kWh/year)"


def percentile(sorted_values, proportion):
    """Linear interpolation at (n - 1) * proportion."""
    position = (len(sorted_values) - 1) * proportion
    lower = math.floor(position)
    upper = math.ceil(position)
    return sorted_values[lower] + (sorted_values[upper] - sorted_values[lower]) * (
        position - lower
    )


def summarise(path):
    with path.open(newline="", encoding="utf-8-sig") as source:
        rows = list(csv.DictReader(source))

    kept = []
    excluded = {"not_listed_for_australia": 0, "not_marked_available": 0, "invalid_measure": 0}
    for row in rows:
        if "Australia" not in [part.strip() for part in row["SoldIn"].split(",")]:
            excluded["not_listed_for_australia"] += 1
            continue
        if row["Availability Status"].strip() != "Available":
            excluded["not_marked_available"] += 1
            continue
        try:
            centimetres = float(row["screensize"])
            kwh = float(row[ENERGY_COLUMN])
        except (TypeError, ValueError):
            excluded["invalid_measure"] += 1
            continue
        if not math.isfinite(centimetres) or not math.isfinite(kwh) or centimetres <= 0 or kwh <= 0:
            excluded["invalid_measure"] += 1
            continue
        kept.append((round(centimetres / 2.54), kwh))

    by_size = {}
    for size in SIZES:
        values = sorted(kwh for nominal_size, kwh in kept if nominal_size == size)
        by_size[str(size)] = {
            "entries": len(values),
            "median_kwh_per_year": statistics.median(values) if values else None,
        }

    values_55 = sorted(kwh for nominal_size, kwh in kept if nominal_size == 55)
    return {
        "raw_entries": len(rows),
        "filtered_entries": len(kept),
        "excluded": excluded,
        "size_medians": by_size,
        "size_55_percentiles": {
            "p10": percentile(values_55, 0.10),
            "median": percentile(values_55, 0.50),
            "p90": percentile(values_55, 0.90),
        },
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("csv_path", type=Path)
    args = parser.parse_args()
    print(json.dumps(summarise(args.csv_path), indent=2))
