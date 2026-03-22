import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SensorReading, SensorType } from '../types';
import { SENSOR_CONFIGS } from '../types';

interface Props {
  data: Record<SensorType, SensorReading[]>;
  sensorX: SensorType;
  sensorY: SensorType;
}

export default function CorrelationChart({ data, sensorX, sensorY }: Props) {
  const xReadings = data[sensorX] || [];
  const yReadings = data[sensorY] || [];
  const len = Math.min(xReadings.length, yReadings.length);

  const points = [];
  for (let i = 0; i < len; i++) {
    points.push({
      x: xReadings[i].temperature,
      y: yReadings[i].temperature,
    });
  }

  // Simple Pearson correlation
  const n = points.length;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumY2 = points.reduce((s, p) => s + p.y * p.y, 0);
  const denom = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
  const r = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;

  return (
    <div className="chart-container">
      <h3 className="chart-title">
        Correlation: {SENSOR_CONFIGS[sensorX].label} vs {SENSOR_CONFIGS[sensorY].label}
        <span className="correlation-badge" style={{ color: Math.abs(r) > 0.5 ? '#10b981' : '#718096' }}>
          r = {r.toFixed(3)}
        </span>
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis
            dataKey="x"
            type="number"
            name={SENSOR_CONFIGS[sensorX].label}
            stroke="#718096"
            fontSize={11}
            label={{ value: `${SENSOR_CONFIGS[sensorX].label} (°F)`, position: 'bottom', fill: '#718096', fontSize: 11 }}
          />
          <YAxis
            dataKey="y"
            type="number"
            name={SENSOR_CONFIGS[sensorY].label}
            stroke="#718096"
            fontSize={11}
            label={{ value: `${SENSOR_CONFIGS[sensorY].label} (°F)`, angle: -90, position: 'insideLeft', fill: '#718096', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #2d3748', borderRadius: 8 }}
            formatter={(value: any, name: any) => [Number(value).toFixed(1) + '°F', name]}
          />
          <Scatter data={points} fill="#8b5cf6" opacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
