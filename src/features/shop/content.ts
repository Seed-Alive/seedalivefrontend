// Shapes the billing API returns.

export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  display: string;
  period: string;
  isPopular?: boolean;
}

export interface ComparisonRow {
  label: string;
  inFree: boolean;
  inPlus: boolean;
}
