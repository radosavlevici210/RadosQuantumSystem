import { useState, useEffect, useCallback } from 'react';
import { QuantumEngine, Qubit, QuantumOperation, SystemMetrics, SystemHealth } from '@/lib/quantum/QuantumEngine';
import { NetworkManager } from '@/lib/quantum/NetworkManager';
import { TimestampManager } from '@/lib/quantum/TimestampManager';

export function useQuantumSystem() {
  const [quantumEngine] = useState(() => new QuantumEngine());
  const [networkManager] = useState(() => new NetworkManager());
  const [timestampManager] = useState(() => new TimestampManager());
  
  const [qubits, setQubits] = useState<Qubit[]>([]);
  const [operations, setOperations] = useState<QuantumOperation[]>([]);
  const [currentQubits, setCurrentQubits] = useState(5);
  const [circuitDepth, setCircuitDepth] = useState(0);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    network_health: 0,
    quantum_coherence: 0,
    operations_per_second: 0,
    cpu_usage: 0,
    memory_usage: 0,
    uptime: 0
  });
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 'HEALTHY',
    quantum_core: 'OPERATIONAL',
    network: 'CONNECTED',
    security: 'SECURE',
    performance: 'OPTIMAL',
    compliance: 'COMPLIANT'
  });
  const [stateDistribution, setStateDistribution] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Update quantum state from engine
  const updateQuantumState = useCallback(() => {
    setQubits([...quantumEngine.getQubits()]);
    setOperations([...quantumEngine.getOperations()]);
    setCurrentQubits(quantumEngine.getCurrentQubitCount());
    setCircuitDepth(quantumEngine.getCircuitDepth());
    setStateDistribution(quantumEngine.getStateDistribution());
  }, [quantumEngine]);

  // Update system metrics
  const updateSystemMetrics = useCallback(() => {
    setMetrics(quantumEngine.generateMetrics());
    setSystemHealth(quantumEngine.getSystemHealth());
    setCurrentTime(timestampManager.formatDisplayTime());
  }, [quantumEngine, timestampManager]);

  // Apply quantum operation
  const applyOperation = useCallback((operation: string, targetQubits?: number[]) => {
    setIsLoading(true);
    
    // Simulate quantum operation delay
    setTimeout(() => {
      try {
        let targets: number[] = [];
        
        switch (operation) {
          case 'hadamard':
            targets = [0];
            break;
          case 'cnot':
          case 'bell_state':
          case 'superdense_coding':
            targets = [0, 1];
            break;
          case 'teleportation':
            targets = [0, 1, 2];
            break;
          default:
            targets = Array.from({ length: Math.min(3, currentQubits) }, (_, i) => i);
        }

        if (targetQubits) {
          targets = targetQubits;
        }

        quantumEngine.applyOperation(operation, targets);
        updateQuantumState();
        
        timestampManager.logEvent('QUANTUM_OPERATION_APPLIED', {
          operation,
          targets,
          qubit_count: currentQubits,
          circuit_depth: circuitDepth
        });
      } catch (error) {
        console.error('Error applying quantum operation:', error);
      } finally {
        setIsLoading(false);
      }
    }, 1000 + Math.random() * 2000);
  }, [quantumEngine, timestampManager, currentQubits, circuitDepth, updateQuantumState]);

  // Update qubit count
  const updateQubitCount = useCallback((count: number) => {
    quantumEngine.updateQubitCount(count);
    updateQuantumState();
    timestampManager.logEvent('QUBIT_COUNT_UPDATED', { new_count: count });
  }, [quantumEngine, timestampManager, updateQuantumState]);

  // Reset circuit
  const resetCircuit = useCallback(() => {
    quantumEngine.resetCircuit();
    updateQuantumState();
    timestampManager.logEvent('CIRCUIT_RESET');
  }, [quantumEngine, timestampManager, updateQuantumState]);

  // Save circuit
  const saveCircuit = useCallback(() => {
    const circuit = quantumEngine.saveCircuit();
    timestampManager.logEvent('CIRCUIT_SAVED', circuit);
    alert('Circuit saved successfully!');
  }, [quantumEngine, timestampManager]);

  // Execute circuit
  const executeCircuit = useCallback(() => {
    setIsLoading(true);
    timestampManager.logEvent('CIRCUIT_EXECUTION_STARTED');
    
    setTimeout(() => {
      setIsLoading(false);
      timestampManager.logEvent('CIRCUIT_EXECUTION_COMPLETED');
      alert('Circuit execution completed!');
    }, 3000);
  }, [timestampManager]);

  // Export circuit
  const exportCircuit = useCallback(() => {
    const circuit = {
      qubits: currentQubits,
      operations: operations,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(circuit, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quantum-circuit-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    timestampManager.logEvent('CIRCUIT_EXPORTED');
  }, [currentQubits, operations, timestampManager]);

  // Initialize system and start monitoring
  useEffect(() => {
    updateQuantumState();
    updateSystemMetrics();

    // Start real-time monitoring
    const metricsInterval = setInterval(updateSystemMetrics, 1000);
    
    // Connect to quantum network
    networkManager.connectToQuantumNetwork().then(connection => {
      console.log('🌐 Network Status:', connection);
      timestampManager.logEvent('NETWORK_CONNECTED', connection);
    });

    return () => {
      clearInterval(metricsInterval);
    };
  }, [updateQuantumState, updateSystemMetrics, networkManager, timestampManager]);

  return {
    // State
    qubits,
    operations,
    currentQubits,
    circuitDepth,
    metrics,
    systemHealth,
    stateDistribution,
    isLoading,
    currentTime,
    
    // Actions
    applyOperation,
    updateQubitCount,
    resetCircuit,
    saveCircuit,
    executeCircuit,
    exportCircuit,
    
    // Managers
    quantumEngine,
    networkManager,
    timestampManager
  };
}
