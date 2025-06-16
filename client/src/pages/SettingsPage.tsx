import { useState } from 'react';
import { useQuantumSystem } from '@/hooks/useQuantumSystem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

export default function SettingsPage() {
  const quantum = useQuantumSystem();
  const [maxQubits, setMaxQubits] = useState(quantum.currentQubits);
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [performance, setPerformance] = useState([75]);
  const [securityLevel, setSecurityLevel] = useState(['high']);

  const handleSaveSettings = () => {
    quantum.updateQubitCount(maxQubits);
    alert('Settings saved successfully!');
  };

  const handleResetSettings = () => {
    setMaxQubits(5);
    setAutoSave(true);
    setNotifications(true);
    setPerformance([75]);
    setSecurityLevel(['high']);
    quantum.updateQubitCount(5);
    alert('Settings reset to defaults!');
  };

  const handleExportSettings = () => {
    const settings = {
      maxQubits,
      autoSave,
      notifications,
      performance: performance[0],
      securityLevel: securityLevel[0],
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rados-quantum-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-quantum-teal mb-2">System Settings</h1>
          <p className="text-gray-400">Configure your RADOS Quantum System preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quantum Configuration */}
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-6 text-quantum-teal">Quantum Configuration</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="qubits" className="text-sm font-medium text-gray-300">
                  Maximum Qubits (Current: {quantum.currentQubits})
                </Label>
                <div className="mt-2">
                  <Input
                    id="qubits"
                    type="number"
                    value={maxQubits}
                    onChange={(e) => setMaxQubits(parseInt(e.target.value) || 1)}
                    min="1"
                    max="100000"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  UNLIMITED mode: Up to 100,000 qubits available
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300">
                  Performance Level: {performance[0]}%
                </Label>
                <div className="mt-2">
                  <Slider
                    value={performance}
                    onValueChange={setPerformance}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Higher values increase computation speed but use more resources
                </p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-300">
                  Security Level: {securityLevel[0].toUpperCase()}
                </Label>
                <div className="mt-2">
                  <Slider
                    value={securityLevel[0] === 'low' ? [25] : securityLevel[0] === 'medium' ? [50] : securityLevel[0] === 'high' ? [75] : [100]}
                    onValueChange={(value) => {
                      const level = value[0] <= 25 ? 'low' : value[0] <= 50 ? 'medium' : value[0] <= 75 ? 'high' : 'maximum';
                      setSecurityLevel([level]);
                    }}
                    max={100}
                    step={25}
                    className="w-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Quantum encryption strength and monitoring level
                </p>
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="metric-card p-6">
            <h3 className="text-lg font-semibold mb-6 text-quantum-teal">System Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Auto-save Circuits</Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Automatically save quantum circuits during operations
                  </p>
                </div>
                <Switch
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-gray-300">System Notifications</Label>
                  <p className="text-xs text-gray-400 mt-1">
                    Receive alerts for quantum operations and system events
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-sm font-medium text-gray-300 mb-4">System Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Version:</span>
                    <span className="text-quantum-teal">4.0.0-UNLIMITED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Build:</span>
                    <span className="text-quantum-teal">NETLIFY-PRODUCTION-UNLIMITED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mode:</span>
                    <span className="text-quantum-green">UNLIMITED PRODUCTION</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span className="text-white">{quantum.timestampManager.getUptime(Date.now() - 3600000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button 
            onClick={handleSaveSettings}
            className="bg-quantum-teal hover:bg-quantum-teal/80"
          >
            Save Settings
          </Button>
          <Button 
            onClick={handleResetSettings}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Reset to Defaults
          </Button>
          <Button 
            onClick={handleExportSettings}
            variant="outline"
            className="border-quantum-purple text-quantum-purple hover:bg-quantum-purple/10"
          >
            Export Configuration
          </Button>
        </div>

        {/* Advanced Settings */}
        <div className="mt-8 metric-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-quantum-teal">Advanced Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                Network Synchronization
              </Label>
              <p className="text-xs text-gray-400 mb-2">
                NTP Server: {quantum.timestampManager.getTimezone()}
              </p>
              <p className="text-xs text-gray-400">
                Last Sync: {quantum.timestampManager.getLastSync() || 'Never'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-300 mb-2 block">
                Quantum Protocols
              </Label>
              <p className="text-xs text-gray-400 mb-1">
                Encryption: QUANTUM_ENCRYPTED
              </p>
              <p className="text-xs text-gray-400">
                Coherence: {(quantum.metrics.quantum_coherence * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}