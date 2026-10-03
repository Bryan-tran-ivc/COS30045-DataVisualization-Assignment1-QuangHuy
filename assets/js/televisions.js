// The gap is between registration-cohort medians, not a product quote.
const tariffInput = document.querySelector('#story-tariff');
const storyCost = document.querySelector('#story-cost');
if (tariffInput && storyCost) {
  const annualGapKwh = 598 - 514;
  tariffInput.addEventListener('input', () => {
    const cents = Number(tariffInput.value);
    storyCost.textContent = tariffInput.value.trim() && Number.isFinite(cents) && cents >= 1 && cents <= 200
      ? `${new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(annualGapKwh * cents / 100)}/year`
      : 'Enter a rate from 1 to 200 cents/kWh';
  });
}
