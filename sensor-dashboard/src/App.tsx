import { useState, useEffect, useCallback } from 'react';
import { Activity } from 'lucide-react';
import type { SensorType, SensorReading } from './types';
import { SENSOR_CONFIGS } from './types';
import { generateInitialData, generateNewReadings } from './sensorData';
import SensorCard from './components/SensorCard';
import TrendChart from './components/TrendChart';
import AnomalyChart from './components/AnomalyChart';
import CorrelationChart from './components/CorrelationChart';
import './App.css';

const ALL_SENSORS: SensorType[] = ['thermostat', 'oven', 'refrigerator', 'washer', 'dryer'];

function App() {
  const [data, setData] = useState<Record<SensorType, SensorReading[]>>(() => generateInitialData());
  const [selectedSensors, setSelectedSensors] = useState<SensorType[]>(ALL_SENSORS);
  const [metric, setMetric] = useState<'temperature' | 'powerUsage'>('temperature');
  const [corrX, setCorrX] = useState<SensorType>('thermostat');
  const [corrY, setCorrY] = useState<SensorType>('oven');
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setData(prev => generateNewReadings(prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  const toggleSensor = useCallback((sensor: SensorType) => {
    setSelectedSensors(prev =>
      prev.includes(sensor) ? prev.filter(s => s !== sensor) : [...prev, sensor]
    );
  }, []);

  const totalPower = ALL_SENSORS.reduce((sum, s) => {
    const latest = data[s]?.[data[s].length - 1];
    return sum + (latest?.powerUsage || 0);
  }, 0);

  const anomalyCount = ALL_SENSORS.reduce((sum, s) => {
    return sum + data[s].filter(r => r.status === 'error' || r.status === 'warning').length;
  }, 0);

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <Activity size={28} className="header-icon" />
          <div>
            <h1>Smart Home Sensor Dashboard</h1>
            <p className="header-subtitle">Real-time monitoring · 5 sensors · 1s intervals</p>
          </div>
        </div>
        <div className="header-right">
          <div className="header-stat">
            <span className="stat-value">{totalPower.toLocaleString()}W</span>
            <span className="stat-label">Total Power</span>
          </div>
          <div className="header-stat">
            <span className="stat-value" style={{ color: anomalyCount > 0 ? '#ef4444' : '#10b981' }}>{anomalyCount}</span>
            <span className="stat-label">Anomalies</span>
          </div>
          <button className={`pause-btn ${paused ? 'paused' : ''}`} onClick={() => setPaused(p => !p)}>
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>
      </header>

      {/* Sensor Cards */}
      <section className="sensor-cards">
        {ALL_SENSORS.map(sensor => (
          <SensorCard key={sensor} sensorType={sensor} readings={data[sensor]} />
        ))}
      </section>

      {/* Controls */}
      <section className="controls">
        <div className="control-group">
          <label>Sensors:</label>
          {ALL_SENSORS.map(s => (
            <button
              key={s}
              className={`chip ${selectedSensors.includes(s) ? 'active' : ''}`}
              style={selectedSensors.includes(s) ? { backgroundColor: SENSOR_CONFIGS[s].color, borderColor: SENSOR_CONFIGS[s].color } : {}}
              onClick={() => toggleSensor(s)}
            >
              {SENSOR_CONFIGS[s].label}
            </button>
          ))}
        </div>
        <div className="control-group">
          <label>Metric:</label>
          <button className={`chip ${metric === 'temperature' ? 'active' : ''}`} onClick={() => setMetric('temperature')}>Temperature</button>
          <button className={`chip ${metric === 'powerUsage' ? 'active' : ''}`} onClick={() => setMetric('powerUsage')}>Power Usage</button>
        </div>
      </section>

      {/* Charts */}
      <section className="charts-grid">
        <TrendChart data={data} selectedSensors={selectedSensors} metric={metric} />
        <AnomalyChart data={data} />
      </section>

      <section className="correlation-section">
        <div className="correlation-controls">
          <label>Correlation X:</label>
          <select value={corrX} onChange={e => setCorrX(e.target.value as SensorType)}>
            {ALL_SENSORS.map(s => <option key={s} value={s}>{SENSOR_CONFIGS[s].label}</option>)}
          </select>
          <label>vs Y:</label>
          <select value={corrY} onChange={e => setCorrY(e.target.value as SensorType)}>
            {ALL_SENSORS.map(s => <option key={s} value={s}>{SENSOR_CONFIGS[s].label}</option>)}
          </select>
        </div>
        <CorrelationChart data={data} sensorX={corrX} sensorY={corrY} />
      </section>
    </div>
  );
}

export default App;
