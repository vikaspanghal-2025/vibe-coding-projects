import type { SensorReading, SensorType } from './types';
import { SENSOR_CONFIGS } from './types';

const HISTORY_SIZE = 120; // 2 minutes of data at 1 reading/sec

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// Simulate anomalies ~2% of the time
function maybeAnomaly(value: number, range: [number, number]): { value: number; isAnomaly: boolean } {
  if (Math.random() < 0.005) {
    const spike = Math.random() > 0.5
      ? range[1] + (range[1] - range[0]) * 0.3
      : range[0] - (range[1] - range[0]) * 0.2;
    return { value: spike, isAnomaly: true };
  }
  return { value, isAnomaly: false };
}

let lastValues: Record<SensorType, { temp: number; power: number }> = {} as any;

function generateReading(sensorType: SensorType, timestamp: number): SensorReading {
  const config = SENSOR_CONFIGS[sensorType];
  const last = lastValues[sensorType];

  // Smooth random walk
  const drift = randomBetween(-1.5, 1.5);
  const powerDrift = randomBetween(-20, 20);

  let rawTemp = last ? last.temp + drift : randomBetween(...config.tempRange);
  let rawPower = last ? last.power + powerDrift : randomBetween(...config.powerRange);

  rawTemp = clamp(rawTemp, config.tempRange[0] - 10, config.tempRange[1] + 10);
  rawPower = clamp(rawPower, 0, config.powerRange[1] * 1.3);

  const tempResult = maybeAnomaly(rawTemp, config.tempRange);
  const temperature = Math.round(tempResult.value * 10) / 10;
  const powerUsage = Math.round(rawPower);

  const isOutOfRange = temperature < config.tempRange[0] || temperature > config.tempRange[1];
  const status = tempResult.isAnomaly ? 'error' : isOutOfRange ? 'warning' : powerUsage > 0 ? 'active' : 'idle';

  lastValues[sensorType] = { temp: rawTemp, power: rawPower };

  return {
    timestamp,
    sensorType,
    temperature,
    powerUsage,
    status,
    humidity: sensorType === 'thermostat' ? Math.round(randomBetween(30, 60)) : undefined,
  };
}

export function generateInitialData(): Record<SensorType, SensorReading[]> {
  const now = Date.now();
  const sensors: SensorType[] = ['thermostat', 'oven', 'refrigerator', 'washer', 'dryer'];
  const data: Record<string, SensorReading[]> = {};

  for (const sensor of sensors) {
    data[sensor] = [];
    for (let i = HISTORY_SIZE; i >= 0; i--) {
      data[sensor].push(generateReading(sensor, now - i * 1000));
    }
  }
  return data as Record<SensorType, SensorReading[]>;
}

export function generateNewReadings(existing: Record<SensorType, SensorReading[]>): Record<SensorType, SensorReading[]> {
  const now = Date.now();
  const sensors: SensorType[] = ['thermostat', 'oven', 'refrigerator', 'washer', 'dryer'];
  const updated: Record<string, SensorReading[]> = {};

  for (const sensor of sensors) {
    const newReading = generateReading(sensor, now);
    const arr = [...existing[sensor], newReading];
    updated[sensor] = arr.slice(-HISTORY_SIZE);
  }
  return updated as Record<SensorType, SensorReading[]>;
}
