import { useQuantumSystem } from '@/hooks/useQuantumSystem';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const quantum = useQuantumSystem();

  // Generate sample data for charts
  const performanceData = Array.from({ length: 20 }, (_, i) => ({
    time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${String((i % 2) * 30).padStart(2, '0')}`,
    coherence: Math.random() * 30 + 70,
    operations: Math.random() * 100 + 50,
    networkHealth: Math.random() * 20 + 80
  }));

  const operationTypes = [
    { name: 'Hadamard', count: quantum.operations.filter(op => op.name === 'hadamard').length, color: '#06b6d4' },
    { name: 'CNOT', count: quantum.operations.filter(op => op.name === 'cnot').length, color: '#8b5cf6' },
    { name: 'QFT', count: quantum.operations.filter(op => op.name === 'qft').length, color: '#10b981' },
    { name: 'Grover', count: quantum.operations.filter(op => op.name === 'grover').length, color: '#f59e0b' },
    { name: 'Other', count: quantum.operations.filter(op => !['hadamard', 'cnot', 'qft', 'grover'].includes(op.name)).length, color: '#ef4444' }
  ];

  const qubitStates = quantum.stateDistribution.length > 0 ? quantum.stateDistribution : [
    { state: '|00⟩', probability: 0.4, color: '#06b6d4' },
    { state: '|01⟩', probability: 0.3, color: '#8b5cf6' },
    { state: '|10⟩', probability: 0.2, color: '#10b981' },
    { state: '|11⟩', probability: 0.1, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-quantum-teal mb-2">Quantum Analytics</h1>
          <p className="text-gray-400">Real-time performance monitoring and quantum circuit analysis</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Operations</h3>
            <p className="text-3xl font-bold text-quantum-teal">{quantum.operations.length}</p>
            <p className="text-sm text-gray-400 mt-1">Circuit depth: {quantum.circuitDepth}</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Quantum Coherence</h3>
            <p className="text-3xl font-bold text-quantum-purple">{(quantum.metrics.quantum_coherence * 100).toFixed(1)}%</p>
            <p className="text-sm text-green-400 mt-1">↗ +2.3% from last hour</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Operations/sec</h3>
            <p className="text-3xl font-bold text-quantum-green">{quantum.metrics.operations_per_second.toFixed(1)}</p>
            <p className="text-sm text-green-400 mt-1">↗ +15.2% from last hour</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Network Health</h3>
            <p className="text-3xl font-bold text-quantum-yellow">{(quantum.metrics.network_health * 100).toFixed(1)}%</p>
            <p className="text-sm text-yellow-400 mt-1">~ Stable</p>
          </div>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">System Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="coherence" 
                  stroke="#06b6d4" 
                  strokeWidth={2}
                  name="Coherence %"
                />
                <Line 
                  type="monotone" 
                  dataKey="operations" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  name="Operations/min"
                />
                <Line 
                  type="monotone" 
                  dataKey="networkHealth" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Network Health %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Operation Types</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={operationTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quantum State Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Quantum State Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={qubitStates}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="probability"
                  label={({ state, probability }) => `${state}: ${(probability * 100).toFixed(1)}%`}
                >
                  {qubitStates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Recent Operations</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {quantum.operations.slice(-10).reverse().map((operation, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-quantum-teal capitalize">{operation.name}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(operation.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Targets: [{operation.targets.join(', ')}] | Depth: {operation.depth}
                  </div>
                </div>
              ))}
              {quantum.operations.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No operations performed yet. Start by applying quantum gates in the circuit designer.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Resources */}
        <div className="mt-8 metric-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-quantum-teal">System Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-purple mb-2">
                {quantum.metrics.cpu_usage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">CPU Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-quantum-purple h-2 rounded-full transition-all duration-500"
                  style={{ width: `${quantum.metrics.cpu_usage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-teal mb-2">
                {quantum.metrics.memory_usage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-400">Memory Usage</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-quantum-teal h-2 rounded-full transition-all duration-500"
                  style={{ width: `${quantum.metrics.memory_usage}%` }}
                ></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-green mb-2">
                {quantum.currentQubits}
              </div>
              <div className="text-sm text-gray-400">Active Qubits</div>
              <div className="text-xs text-gray-500 mt-1">
                Max: 100,000 (Unlimited)
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-yellow mb-2">
                {(quantum.metrics.uptime / 3600).toFixed(1)}h
              </div>
              <div className="text-sm text-gray-400">Uptime</div>
              <div className="text-xs text-gray-500 mt-1">
                Since last restart
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}