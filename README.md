# Ksense Assessment

## Assessment Context

**API**: DemoMed Healthcare API (a fictional system for coding evaluation)

**Your Role**: Demonstrate API integration and data processing skills.

**Goal**: Show how you handle real-world API challenges and data inconsistencies.

## API information

**Base URL**: `https://assessment.ksensetech.com/api`

## API Behavior (Important!)

This API simulates real-world conditions:

**_Rate limiting_**: May return 429 errors if you make requests too quickly.<br>
**_Intermittent failures_**: ~8% chance of 500/503 errors (requires retry logic).<br>
**_Pagination_**: Returns 5 patients per page by default (~10 pages, ~50 patients total).<br>
**_Inconsistent responses_**: Occasionally returns data in different formats or with missing fields.

## Task: Implement Risk Scoring

#### Blood Pressure Risk

**_Note: If systolic and diastolic readings fall into different risk categories, use the higher risk stage for scoring._**

Normal (Systolic <120 AND Diastolic <80): 0 points<br>
Elevated (Systolic 120‑129 AND Diastolic <80): 1 points<br>
Stage 1 (Systolic 130‑139 OR Diastolic 80‑89): 2 points<br>
Stage 2 (Systolic ≥140 OR Diastolic ≥90): 3 points<br>
Invalid/Missing Data (0 points):<br>
• Missing systolic or diastolic values (e.g., "150/" or "/90")<br>
• Non-numeric values (e.g., "INVALID", "N/A")<br>
• Null, undefined, or empty values<br>

#### Temperature Risk

Normal (≤99.5°F): 0 points<br>
Low Fever (99.6-100.9°F): 1 point<br>
High Fever (≥‮0.101‬°F): 2 points<br>
Invalid/Missing Data (0 points):<br>
• Non-numeric values (e.g., "TEMP_ERROR", "invalid")<br>
• Null, undefined, or empty values<br>

#### Age Risk

Under 40 (<40 years): 0 points<br>
40-65 (40-65 years, inclusive): 1 point<br>
Over 65 (>65 years): 2 points<br>
Invalid/Missing Data (0 points):<br>
• Null, undefined, or empty values<br>
• Non-numeric strings (e.g., "fifty-three", "unknown")<br>

Total Risk Score = (BP Score) + (Temp Score) + (Age Score)

## Required Outputs

Alert Lists: Your system should identify patients who meet specific criteria:

- High-Risk Patients: Patient IDs with total risk score ≥ 4
- Fever Patients: Patient IDs with temperature ≥ 99.6°F
- Data Quality Issues: Patient IDs with invalid/missing data (e.g., BP, Age, or Temp is missing/malformed)
