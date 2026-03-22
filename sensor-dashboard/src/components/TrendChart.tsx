import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { SensorReading, SensorType } from '../types';
import { SENSOR_CONFIGS } from '../types';
import { format } from 'date-fns';

interface Props {
  data: Record<SensorType, SensorReading[]>;
  selectedSensors: SensorType[];
  metric: 'temperature' | 'powerUsage';
}

export default function TrendChart({ data, selectedSensors, metric }: Props) {
  // Merge all sensor data by timestamp index
  const maxLen = Math.max(...selectedSensors.map(s => data[s]?.length || 0));
  const chartData = [];

  for (let i = 0; i < maxLen; i++) {
    const point: Record<string, any> = {};
    for (const sensor of selectedSensors) {
      const reading = data[sensor]?.[i];
      if (reading) {
        point.time = reading.timestamp;
        point[sensor] = reading[metric];
      }
    }
    if (point.time) chartData.push(point);
  }

  const label = metric === 'temperature' ? 'Temperature' : 'Power Usage (W)';

  return (
    <div className="chart-container">
      <h3 className="chart-title">{label} — Trends Over Time</h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis
            dataKey="time"
            tickFormatter={(t) => format(new Date(t), 'HH:mm:ss')}
            stroke="#718096"
            fontSize={11}
            minTickGap={40}
          />
          <YAxis stroke="#718096" fontSize={11} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #2d3748', borderRadius: 8 }}
            labelFormatter={(t) => format(new Date(t as number), 'HH:mm:ss')}
          />
          <Legend />
          {selectedSensors.map(sensor => (
            <Line
              key={sensor}
              type="monotone"
              dataKey={sensor}
              name={SENSOR_CONFIGS[sensor].label}
              stroke={SENSOR_CONFIGS[sensor].color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
