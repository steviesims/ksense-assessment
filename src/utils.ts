export type TScore = {
  score: number;
  isValid: boolean;
};

export const calculateBloodPressureScore = (bloodPressure?: string): TScore => {
  if (!bloodPressure || typeof bloodPressure !== "string") {
    return { score: 0, isValid: false };
  }

  const parts = bloodPressure.split("/");
  if (parts.length !== 2) {
    return { score: 0, isValid: false };
  }

  const systolic = parseInt(parts[0], 10);
  const diastolic = parseInt(parts[1], 10);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return { score: 0, isValid: false };
  }

  let score = 0;

  if (diastolic < 80) {
    if (systolic < 120) score = 0;
    else if (systolic < 130) score = 1;
    else if (systolic < 140) score = 2;
    else score = 3;
  } else if (diastolic < 90) {
    score = 2;
  } else {
    score = 3;
  }

  return { score, isValid: true };
};

export const calculateTemperatureScore = (
  temperature?: number | string
): TScore => {
  if (!temperature) return { score: 0, isValid: false };

  const temp =
    typeof temperature === "string" ? parseFloat(temperature) : temperature;

  if (isNaN(temp)) return { score: 0, isValid: false };

  if (temp <= 99.5) return { score: 0, isValid: true };
  else if (temp < 101) return { score: 1, isValid: true };
  else return { score: 2, isValid: true };
};

export const calculateAgeScore = (age?: number): TScore => {
  if (age === undefined || age === null) return { score: 0, isValid: false };

  const ageNum = typeof age === "string" ? parseInt(age, 10) : age;
  if (isNaN(ageNum)) return { score: 0, isValid: false };

  if (ageNum < 40) return { score: 0, isValid: true };
  else if (ageNum < 66) return { score: 1, isValid: true };
  else return { score: 2, isValid: true };
};
