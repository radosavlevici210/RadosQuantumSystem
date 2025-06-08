interface QuantumMetricsProps {
  quantum: any;
}

export function QuantumMetrics({ quantum }: QuantumMetricsProps) {
  const networkNodes = [
    { id: 'EU-QUANTUM-01', location: 'Frankfurt', qubits: 1000, latency: 12, status: 'online' },
    { id: 'US-QUANTUM-02', location: 'Oregon', qubits: 850, latency: 45, status: 'online' },
    { id: 'ASIA-QUANTUM-03', location: 'Tokyo', qubits: 750, latency: 78, status: 'warning' }
  ];

  const algorithms = [
    { name: 'Quantum Search', description: "Grover's algorithm implementation", icon: 'search', color: 'quantum-green' },
    { name: 'Factorization', description: "Shor's algorithm for RSA", icon: 'key', color: 'quantum-pink' },
    { name: 'Optimization', description: 'QAOA for combinatorial problems', icon: 'chart-line', color: 'quantum-orange' }
  ];

  return (
    <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Real-time Metrics */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">System Metrics</h3>
        <div className="space-y-4">
          {/* Network Status */}
          <div className="metric-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Network</span>
              <span className="text-quantum-green text-xs">CONNECTED</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-quantum-green h-2 rounded-full animate-pulse transition-all duration-500" 
                  style={{ width: `${quantum.metrics.network_health}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">{Math.round(quantum.metrics.network_health)}%</span>
            </div>
          </div>

          {/* Quantum Coherence */}
          <div className="metric-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Coherence</span>
              <span className="text-quantum-teal text-xs font-code">{quantum.metrics.quantum_coherence.toFixed(1)}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-quantum-teal h-2 rounded-full animate-pulse transition-all duration-500" 
                  style={{ width: `${quantum.metrics.quantum_coherence}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">145μs</span>
            </div>
          </div>

          {/* Operations Per Second */}
          <div className="metric-card rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Ops/Sec</span>
              <span className="text-quantum-orange text-xs font-code">{Math.round(quantum.metrics.operations_per_second).toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div className="bg-quantum-orange h-2 rounded-full w-3/4"></div>
              </div>
              <span className="text-xs text-gray-400">75%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quantum State Visualization */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Quantum States</h3>
        <div className="space-y-3">
          {quantum.stateDistribution.map((state: any, index: number) => (
            <div key={index} className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-code text-quantum-teal">{state.label}</span>
                <span className="text-xs text-gray-400">{state.probability.toFixed(1)}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-quantum-teal' :
                    index === 1 ? 'bg-quantum-green' :
                    index === 2 ? 'bg-quantum-orange' :
                    'bg-quantum-pink'
                  }`}
                  style={{ width: `${state.probability}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Library */}
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Algorithm Library</h3>
        <div className="space-y-2">
          {algorithms.map((algorithm, index) => (
            <button key={index} className="w-full text-left p-3 bg-gray-900 hover:bg-gray-700 rounded-lg transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium">{algorithm.name}</span>
                <i className={`fas fa-${algorithm.icon} text-${algorithm.color}`}></i>
              </div>
              <p className="text-xs text-gray-400 mt-1">{algorithm.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Network Nodes */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Network Nodes</h3>
        <div className="space-y-3">
          {networkNodes.map((node, index) => (
            <div key={index} className="bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{node.id}</span>
                <div className={`w-2 h-2 rounded-full ${
                  node.status === 'online' ? 'bg-quantum-green' : 'bg-quantum-orange'
                }`}></div>
              </div>
              <div className="text-xs text-gray-400">
                <div>{node.location} • {node.qubits} qubits</div>
                <div>Latency: {node.latency}ms</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
