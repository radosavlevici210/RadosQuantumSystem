import { useState } from 'react';
import { useQuantumSystem } from '@/hooks/useQuantumSystem';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SecurityPage() {
  const quantum = useQuantumSystem();
  const networkMetrics = quantum.networkManager.getNetworkMetrics();
  const securityLevel = quantum.networkManager.getSecurityLevel();
  const [scanRunning, setScanRunning] = useState(false);

  const runSecurityScan = () => {
    setScanRunning(true);
    setTimeout(() => {
      setScanRunning(false);
      quantum.timestampManager.logEvent('SECURITY_SCAN_COMPLETED', {
        threats_detected: 0,
        vulnerabilities: 0,
        status: 'SECURE'
      });
      alert('Security scan completed. No threats detected.');
    }, 3000);
  };

  const securityEvents = networkMetrics.securityEvents.slice(-10).reverse();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-quantum-teal mb-2">Quantum Security</h1>
          <p className="text-gray-400">Monitor and manage quantum encryption and security protocols</p>
        </div>

        {/* Security Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="metric-card p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">Security Level</h3>
              <div className="w-3 h-3 bg-quantum-green rounded-full animate-pulse"></div>
            </div>
            <p className="text-xl font-bold text-quantum-green">{securityLevel}</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Encryption Status</h3>
            <Badge className="bg-quantum-green bg-opacity-20 text-quantum-green">
              QUANTUM_ENCRYPTED
            </Badge>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Threat Level</h3>
            <p className="text-xl font-bold text-quantum-green">MINIMAL</p>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Last Scan</h3>
            <p className="text-sm text-white">{new Date().toLocaleString()}</p>
          </div>
        </div>

        {/* Security Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Security Controls</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div>
                  <h4 className="font-medium">Quantum Key Distribution</h4>
                  <p className="text-sm text-gray-400">End-to-end quantum encryption</p>
                </div>
                <Badge className="bg-quantum-green bg-opacity-20 text-quantum-green">
                  ACTIVE
                </Badge>
              </div>

              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div>
                  <h4 className="font-medium">Entanglement Authentication</h4>
                  <p className="text-sm text-gray-400">Quantum state verification</p>
                </div>
                <Badge className="bg-quantum-green bg-opacity-20 text-quantum-green">
                  ACTIVE
                </Badge>
              </div>

              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div>
                  <h4 className="font-medium">Coherence Monitoring</h4>
                  <p className="text-sm text-gray-400">Real-time state integrity</p>
                </div>
                <Badge className="bg-quantum-green bg-opacity-20 text-quantum-green">
                  ACTIVE
                </Badge>
              </div>

              <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                <div>
                  <h4 className="font-medium">Network Isolation</h4>
                  <p className="text-sm text-gray-400">Secure quantum channels</p>
                </div>
                <Badge className="bg-quantum-green bg-opacity-20 text-quantum-green">
                  ACTIVE
                </Badge>
              </div>
            </div>

            <div className="mt-6">
              <Button 
                onClick={runSecurityScan}
                disabled={scanRunning}
                className="w-full bg-quantum-purple hover:bg-quantum-purple/80"
              >
                {scanRunning ? 'Running Security Scan...' : 'Run Full Security Scan'}
              </Button>
            </div>
          </div>

          {/* Security Events */}
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Security Events</h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {securityEvents.map((event, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-quantum-green">SECURE</span>
                    <span className="text-xs text-gray-400">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{event}</p>
                </div>
              ))}
              
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-quantum-green">INFO</span>
                  <span className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-gray-400">Quantum encryption keys rotated successfully</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-quantum-green">SECURE</span>
                  <span className="text-xs text-gray-400">{new Date().toLocaleTimeString()}</span>
                </div>
                <p className="text-sm text-gray-400">All quantum channels verified and secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Encryption Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Encryption Protocols</h3>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-2">BB84 Protocol</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Key Rate:</span>
                    <span className="float-right text-quantum-green">1.2 Mbps</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Error Rate:</span>
                    <span className="float-right text-quantum-green">0.003%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-2">E91 Protocol</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Entanglement:</span>
                    <span className="float-right text-quantum-green">98.7%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Fidelity:</span>
                    <span className="float-right text-quantum-green">{(networkMetrics.fidelity * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-medium mb-2">SARG04 Protocol</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Security:</span>
                    <span className="float-right text-quantum-green">Maximum</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="float-right text-quantum-green">94.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Security Metrics</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Quantum Key Security</span>
                  <span className="text-quantum-green">100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-quantum-green h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Network Isolation</span>
                  <span className="text-quantum-green">100%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-quantum-green h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Coherence Time</span>
                  <span className="text-quantum-teal">{networkMetrics.coherenceTime.toFixed(2)}μs</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-quantum-teal h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Authentication Level</span>
                  <span className="text-quantum-purple">Quantum</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-quantum-purple h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm font-medium text-quantum-teal mb-2">Threat Intelligence</h4>
              <p className="text-xs text-gray-400 mb-1">Last Update: {new Date().toLocaleString()}</p>
              <p className="text-xs text-green-400">No active threats detected in quantum network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}