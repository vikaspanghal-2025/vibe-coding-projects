import { Thermometer, Flame, Snowflake, Waves, Wind, Zap, AlertTriangle } from 'lucide-react';
import type { SensorReading, SensorType } from '../types';
import { SENSOR_CONFIGS } from '../types';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Thermometer, Flame, Snowflake, Waves, Wind,
};

interface Props {
  sensorType: SensorType;
  readings: SensorReading[];
}

export default function SensorCard({ sensorType, readings }: Props) {
  const config = SENSOR_CONFIGS[sensorType];
  const latest = readings[readings.length - 1];
  if (!latest) return null;

  const Icon = iconMap[config.icon] || Thermometer;
  const isAnomaly = latest.status === 'error' || latest.status === 'warning';

  return (
    <div
      className="sensor-card"
      style={{ borderColor: isAnomaly ? '#ef4444' : config.color }}
    >
      <div className="sensor-card-header">
        <div className="sensor-icon" style={{ backgroundColor: config.color + '20', color: config.color }}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="sensor-name">{config.label}</h3>
          <span className={`sensor-status status-${latest.status}`}>
            {isAnomaly && <AlertTriangle size={12} />}
            {latest.status}
          </span>
        </div>
      </div>
      <div className="sensor-metrics">
        <div className="metric">
          <span className="metric-value">{latest.temperature}{config.unit}</span>
          <span className="metric-label">Temperature</span>
        </div>
        <div className="metric">
          <Zap size={14} style={{ color: '#f59e0b' }} />
          <span className="metric-value">{latest.powerUsage}W</span>
          <span className="metric-label">Power</span>
        </div>
        {latest.humidity !== undefined && (
          <div className="metric">
            <span className="metric-value">{latest.humidity}%</span>
            <span className="metric-label">Humidity</span>
          </div>
        )}
      </div>
    </div>
  );
}
