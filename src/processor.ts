import { TOutput, TPatient } from "./types";
import {
  calculateAgeScore,
  calculateBloodPressureScore,
  calculateTemperatureScore,
  type TScore,
} from "./utils";

type TTScore = {
  PatientID: string;
  BPScore: TScore;
  TempScore: TScore;
  AgeScore: TScore;
  TotalScore: number;
};

export class Processor {
  private patientData: TPatient[];
  private scoreData: TTScore[];

  constructor(patientData: TPatient[]) {
    this.patientData = patientData;
    this.scoreData = this.calculateScores();
  }

  private calculateScores(): TTScore[] {
    return this.patientData.map((patient) => {
      const {
        blood_pressure: bloodPressure,
        temperature,
        age,
        patient_id,
      } = patient;
      const BPScore = calculateBloodPressureScore(bloodPressure);
      const TempScore = calculateTemperatureScore(temperature);
      const AgeScore = calculateAgeScore(age);

      const TotalScore = BPScore.score + TempScore.score + AgeScore.score;

      return {
        PatientID: patient_id,
        BPScore,
        TempScore,
        AgeScore,
        TotalScore,
      };
    });
  }

  getOutput(): TOutput {
    const highRiskPatients: string[] = this.scoreData
      .filter((score) => score.TotalScore >= 4)
      .map((score) => score.PatientID);

    const feverPatients: string[] = this.scoreData
      .filter(({ TempScore: { score } }) => score >= 1)
      .map((score) => score.PatientID);

    const dataQualityIssues: string[] = this.scoreData
      .filter(
        ({ BPScore, TempScore, AgeScore }) =>
          !BPScore.isValid || !TempScore.isValid || !AgeScore.isValid
      )
      .map(({ PatientID }) => PatientID);

    return {
      high_risk_patients: highRiskPatients,
      fever_patients: feverPatients,
      data_quality_issues: dataQualityIssues,
    };
  }
}
