import { useQuantumSystem } from '@/hooks/useQuantumSystem';

export default function NetworkPage() {
  const quantum = useQuantumSystem();
  const networkMetrics = quantum.networkManager.getNetworkMetrics();
  const activeNodes = quantum.networkManager.getActiveNodes();
  const connectionStatus = quantum.networkManager.getConnectionStatus();
  const securityLevel = quantum.networkManager.getSecurityLevel();
  const protocols = quantum.networkManager.getProtocols();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-quantum-teal mb-2">Quantum Network</h1>
          <p className="text-gray-400">Monitor and manage quantum network connections</p>
        </div>

        {/* Network Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Connection Status</h3>
              <div className="w-3 h-3 bg-quantum-green rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-quantum-green">{connectionStatus}</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Network Health</h3>
            <p className="text-2xl font-bold text-quantum-teal">{(networkMetrics.networkHealth * 100).toFixed(1)}%</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Latency</h3>
            <p className="text-2xl font-bold text-quantum-purple">{networkMetrics.latency.toFixed(1)}ms</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Security Level</h3>
            <p className="text-sm font-bold text-quantum-green">{securityLevel}</p>
          </div>
        </div>

        {/* Active Nodes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Active Quantum Nodes</h3>
            <div className="space-y-4">
              {activeNodes.map((node, index) => (
                <div key={node.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{node.location}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      node.status === 'online' ? 'bg-quantum-green bg-opacity-20 text-quantum-green' :
                      node.status === 'warning' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' :
                      'bg-red-500 bg-opacity-20 text-red-400'
                    }`}>
                      {node.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                    <div>
                      <span className="block">Qubits: {node.qubits}</span>
                      <span className="block">Latency: {node.latency}ms</span>
                    </div>
                    <div>
                      <span className="block">Tunnel: {node.tunnel}</span>
                      <span className="block">Encryption: {node.encryption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Protocols */}
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Network Protocols</h3>
            <div className="space-y-3">
              {Object.entries(protocols).map(([protocol, status]) => (
                <div key={protocol} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                  <span className="font-medium">{protocol}</span>
                  <span className="text-quantum-green text-sm">{status}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Security Events</h4>
              <div className="bg-gray-800 rounded-lg p-3 max-h-40 overflow-y-auto">
                {networkMetrics.securityEvents.map((event, index) => (
                  <div key={index} className="text-xs text-gray-400 mb-1">
                    {event}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Network Metrics Chart */}
        <div className="mt-8 metric-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Network Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-purple mb-1">
                {(networkMetrics.bandwidth / 1000).toFixed(1)}GB/s
              </div>
              <div className="text-sm text-gray-400">Bandwidth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-teal mb-1">
                {networkMetrics.coherenceTime.toFixed(2)}μs
              </div>
              <div className="text-sm text-gray-400">Coherence Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-quantum-green mb-1">
                {(networkMetrics.fidelity * 100).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-400">Fidelity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}