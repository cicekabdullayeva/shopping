const CURRENCY_FORMATTER = new Intl.NumberFormat("az-Cyrl-AZ", {
  currency: "AZN",
  style: "currency",
});
export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}
