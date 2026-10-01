"use strict";

// Common behaviour is shared across every page.
document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll(".faq-trigger").forEach((button) => {
  const answer = document.getElementById(button.getAttribute("aria-controls"));
  let closeTimer;

  function finishClosing() {
    if (button.getAttribute("aria-expanded") === "false") answer.hidden = true;
  }

  answer.addEventListener("transitionend", (event) => {
    if (event.target === answer && event.propertyName === "grid-template-rows") finishClosing();
  });

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    clearTimeout(closeTimer);
    button.setAttribute("aria-expanded", String(!isOpen));

    if (isOpen) {
      // Hide closed content from assistive technology while its visual exit completes.
      answer.setAttribute("aria-hidden", "true");
      answer.inert = true;
      answer.classList.remove("is-open");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishClosing();
      } else {
        closeTimer = setTimeout(finishClosing, 320);
      }
    } else {
      answer.hidden = false;
      answer.removeAttribute("aria-hidden");
      answer.inert = false;
      // Commit the collapsed grid size before switching to the open CSS class.
      void answer.offsetHeight;
      answer.classList.add("is-open");
    }
  });
});

const money = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });
const energy = new Intl.NumberFormat("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const compactEnergy = new Intl.NumberFormat("en-AU", { maximumFractionDigits: 1 });
const axisEnergy = new Intl.NumberFormat("en-AU", { notation: "compact", maximumFractionDigits: 1 });

// Return null on invalid inputs rather than treating an empty field as zero.
function readNumber(input, error, minimum, maximum, message) {
  const value = Number(input.value);
  const valid = input.value.trim() !== "" && Number.isFinite(value) && value >= minimum && value <= maximum;
  input.setAttribute("aria-invalid", String(!valid));
  error.textContent = valid ? "" : message;
  error.hidden = valid;
  return valid ? value : null;
}

function calculateEnergy(watts, hours, cents) {
  const daily = (watts * hours) / 1000;
  return { daily, monthly: daily * 30, yearly: daily * 365, monthlyCost: daily * 30 * cents / 100, yearlyCost: daily * 365 * cents / 100 };
}

// Rounded upper bounds keep chart axes readable without truncating large values.
function niceMaximum(value) {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const step = [1, 1.5, 2, 2.5, 5, 10].find((candidate) => candidate >= value / magnitude);
  return step * magnitude;
}

const calculator = document.getElementById("energy-calculator");
if (calculator) {
  const appliance = document.getElementById("appliance");
  const wattsInput = document.getElementById("watts");
  const hoursInput = document.getElementById("hours");
  const priceInput = document.getElementById("price");
  const status = document.getElementById("calculator-status");
  let announcementTimer;

  function updateCalculator() {
    const watts = readNumber(wattsInput, document.getElementById("watts-error"), 1, 100000, "Enter a power rating between 1 and 100,000 W.");
    const hours = readNumber(hoursInput, document.getElementById("hours-error"), 0, 24, "Enter daily use between 0 and 24 hours.");
    const price = readNumber(priceInput, document.getElementById("price-error"), 0, 1000, "Enter a rate between 0 and 1,000 cents per kWh.");
    clearTimeout(announcementTimer);

    if (watts === null || hours === null || price === null) {
      ["annual-cost", "daily-energy", "monthly-energy", "yearly-energy", "timeline-total"].forEach((id) => {
        document.getElementById(id).textContent = "—";
      });
      document.getElementById("result-summary").textContent = "Check the highlighted inputs to see your estimate.";
      document.getElementById("energy-chart-line").setAttribute("d", "M8 80H432");
      document.getElementById("energy-chart-area").setAttribute("d", "M8 80H432Z");
      document.getElementById("energy-chart-end").setAttribute("cy", "80");
      document.getElementById("energy-axis-max").textContent = "—";
      document.getElementById("energy-axis-mid").textContent = "—";
      document.getElementById("energy-chart-description").textContent = "Enter valid values to display a cumulative energy estimate.";
      announcementTimer = setTimeout(() => { status.textContent = "Check the highlighted inputs to calculate energy use."; }, 450);
      return null;
    }

    const result = calculateEnergy(watts, hours, price);
    const applianceNames = { "100": "television", "60": "laptop", "10": "LED light", "2000": "electric kettle", custom: "appliance" };
    document.getElementById("annual-cost").textContent = money.format(result.yearlyCost);
    document.getElementById("daily-energy").textContent = energy.format(result.daily);
    document.getElementById("monthly-energy").textContent = energy.format(result.monthly);
    document.getElementById("yearly-energy").textContent = energy.format(result.yearly);
    document.getElementById("timeline-total").textContent = `${compactEnergy.format(result.yearly)} kWh`;
    document.getElementById("result-summary").textContent = `Your ${applianceNames[appliance.value]}, used for ${hours} ${hours === 1 ? "hour" : "hours"} a day.`;
    const maximum = niceMaximum(result.yearly);
    const endY = 80 - (result.yearly / maximum) * 72;
    document.getElementById("energy-chart-line").setAttribute("d", `M8 80 432 ${endY}`);
    document.getElementById("energy-chart-area").setAttribute("d", `M8 80 432 ${endY} 432 80Z`);
    document.getElementById("energy-chart-end").setAttribute("cy", String(endY));
    document.getElementById("energy-axis-max").textContent = axisEnergy.format(maximum);
    document.getElementById("energy-axis-mid").textContent = axisEnergy.format(maximum / 2);
    document.getElementById("energy-chart-description").textContent = `At ${watts} watts and ${hours} hours per day, cumulative electricity use increases from 0 to ${compactEnergy.format(result.yearly)} kilowatt-hours over 365 days. The vertical scale is 0 to ${compactEnergy.format(maximum)} kWh and adjusts with your inputs.`;
    announcementTimer = setTimeout(() => { status.textContent = `Estimated annual cost ${money.format(result.yearlyCost)}. Daily energy ${energy.format(result.daily)} kilowatt-hours.`; }, 450);
    return result;
  }

  appliance.addEventListener("change", () => {
    if (appliance.value !== "custom") wattsInput.value = appliance.value;
    updateCalculator();
  });
  wattsInput.addEventListener("input", () => {
    if (appliance.value !== "custom" && Number(wattsInput.value) !== Number(appliance.value)) appliance.value = "custom";
    updateCalculator();
  });
  hoursInput.addEventListener("input", updateCalculator);
  priceInput.addEventListener("input", updateCalculator);
  calculator.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!updateCalculator()) calculator.querySelector('[aria-invalid="true"]').focus();
  });
  updateCalculator();
}
