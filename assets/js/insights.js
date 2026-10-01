"use strict";

// This page is an analysis scaffold. These controls do not load data or run KNIME.
const insightsPage = document.querySelector(".insights-main");
if (insightsPage) {
  const status = document.getElementById("insights-status");

  // Proposed stages, not a completed workflow or generated findings.
  const stages = {
    read: {
      label: "Stage 01 · Read",
      title: "Start with a traceable source.",
      description: "Import the selected dataset into KNIME. Check the delimiter, column types and units against its documentation before analysing any values.",
      evidence: "Source URL, licence, snapshot date, raw row count and data dictionary."
    },
    clean: {
      label: "Stage 02 · Clean",
      title: "Keep the observations you can defend.",
      description: "Inspect missing values, duplicates and invalid records. Define inclusion rules for the question, then document why each record is retained, corrected or excluded.",
      evidence: "Before-and-after row counts, duplicate keys, missing-value decisions and filter rules."
    },
    transform: {
      label: "Stage 03 · Transform",
      title: "Make the measures meaningful.",
      description: "Standardise units and create only the derived variables needed for the question. A cost scenario may use annual kWh multiplied by AUD per kWh, if the chosen data supports it.",
      evidence: "Formulas, input units, derived column names and any scenario assumptions."
    },
    summarise: {
      label: "Stage 04 · Summarise",
      title: "Compare with the right context.",
      description: "Define comparable groups and calculate appropriate summaries, such as counts, medians and spread. Check whether the proposed charts can support the intended interpretation.",
      evidence: "Grouping definitions, sample sizes, aggregation settings and checked summary tables."
    },
    export: {
      label: "Stage 05 · Export",
      title: "Bring checked evidence to the web.",
      description: "Export the processed and summary tables for the website. Save the KNIME workflow and a readable screenshot separately, then verify that chart values match the exported tables.",
      evidence: "Processed CSV, summary CSV, .knwf workflow, workflow screenshot and limitations notes."
    }
  };
  const stageButtons = Array.from(document.querySelectorAll("[data-workflow-step]"));
  stageButtons.forEach((button) => {
    button.disabled = false;
    button.addEventListener("click", () => {
      const stage = stages[button.dataset.workflowStep];
      stageButtons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
      document.getElementById("workflow-detail-step").textContent = stage.label;
      document.getElementById("workflow-detail-title").textContent = stage.title;
      document.getElementById("workflow-detail-description").textContent = stage.description;
      document.getElementById("workflow-detail-evidence").textContent = stage.evidence;
      status.textContent = `${stage.label}. ${stage.title} ${stage.description} Evidence to keep: ${stage.evidence}`;
    });
  });
}
