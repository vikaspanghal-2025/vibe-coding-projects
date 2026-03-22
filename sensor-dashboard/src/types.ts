export type SensorType = 'thermostat' | 'oven' | 'refrigerator' | 'washer' | 'dryer';

export interface SensorReading {
  timestamp: number;
  sensorType: SensorType;
  temperature: number;
  humidity?: number;
  powerUsage: number;
  status: 'idle' | 'active' | 'warning' | 'error';
}

export interface SensorConfig {
  type: SensorType;
  label: string;
  color: string;
  icon: string;
  tempRange: [number, number];
  powerRange: [number, number];
  unit: string;
}

export const SENSOR_CONFIGS: Record<SensorType, SensorConfig> = {
  thermostat: { type: 'thermostat', label: 'Thermostat', color: '#3b82f6', icon: 'Thermometer', tempRange: [65, 78], powerRange: [10, 50], unit: '°F' },
  oven: { type: 'oven', label: 'Oven', color: '#ef4444', icon: 'Flame', tempRange: [150, 500], powerRange: [1000, 5000], unit: '°F' },
  refrigerator: { type: 'refrigerator', label: 'Refrigerator', color: '#06b6d4', icon: 'Snowflake', tempRange: [33, 42], powerRange: [50, 200], unit: '°F' },
  washer: { type: 'washer', label: 'Washer', color: '#8b5cf6', icon: 'Waves', tempRange: [60, 140], powerRange: [300, 1500], unit: '°F' },
  dryer: { type: 'dryer', label: 'Dryer', color: '#f59e0b', icon: 'Wind', tempRange: [125, 185], powerRange: [1800, 5400], unit: '°F' },
};
