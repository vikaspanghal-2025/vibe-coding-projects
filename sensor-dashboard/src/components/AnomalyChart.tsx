import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import type { SensorReading, SensorType } from '../types';
import { SENSOR_CONFIGS } from '../types';
import { format } from 'date-fns';

interface Props {
  data: Record<SensorType, SensorReading[]>;
}

export default function AnomalyChart({ data }: Props) {
  const anomalyWindow = Date.now() - 60_000; // show last 60 seconds only
  const anomalies: { time: number; temperature: number; sensor: string; color: string }[] = [];

  for (const [sensor, readings] of Object.entries(data)) {
    const config = SENSOR_CONFIGS[sensor as SensorType];
    for (const r of readings) {
      if (r.timestamp >= anomalyWindow && (r.status === 'error' || r.status === 'warning')) {
        anomalies.push({
          time: r.timestamp,
          temperature: r.temperature,
          sensor: config.label,
          color: r.status === 'error' ? '#ef4444' : '#f59e0b',
        });
      }
    }
  }

  if (anomalies.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">Anomaly Detection</h3>
        <div className="no-anomalies">No anomalies detected in current window</div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Anomaly Detection (last 60s) — {anomalies.length} events</h3>
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis
            dataKey="time"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(t) => format(new Date(t), 'HH:mm:ss')}
            stroke="#718096"
            fontSize={11}
          />
          <YAxis dataKey="temperature" stroke="#718096" fontSize={11} name="Temp" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #2d3748', borderRadius: 8 }}
            labelFormatter={(t) => format(new Date(t as number), 'HH:mm:ss')}
            formatter={(value: any, name: any) => [value, name]}
          />
          <Legend />
          <Scatter name="Anomalies" data={anomalies} fill="#ef4444">
            {anomalies.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
