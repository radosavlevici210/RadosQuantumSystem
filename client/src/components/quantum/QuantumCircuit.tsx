interface QuantumCircuitProps {
  quantum: any;
}

export function QuantumCircuit({ quantum }: QuantumCircuitProps) {
  const quantumOperations = [
    { id: 'hadamard', label: 'H', icon: 'square-root-alt', color: 'bg-quantum-indigo hover:bg-quantum-blue' },
    { id: 'cnot', label: 'CNOT', icon: 'link', color: 'bg-quantum-indigo hover:bg-quantum-blue' },
    { id: 'qft', label: 'QFT', icon: 'wave-square', color: 'bg-quantum-green hover:bg-green-600' },
    { id: 'grover', label: 'Grover', icon: 'search', color: 'bg-quantum-orange hover:bg-orange-600' },
    { id: 'shor', label: 'Shor', icon: 'key', color: 'bg-quantum-pink hover:bg-pink-600' },
    { id: 'bell_state', label: 'Bell', icon: 'infinity', color: 'bg-quantum-teal hover:bg-teal-600' },
    { id: 'teleportation', label: 'Teleport', icon: 'magic', color: 'bg-purple-600 hover:bg-purple-700' },
    { id: 'superdense_coding', label: 'Dense', icon: 'compress-alt', color: 'bg-indigo-600 hover:bg-indigo-700' }
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Qubit Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium">Qubits:</label>
            <input 
              type="range" 
              min="1" 
              max="1000" 
              value={quantum.currentQubits}
              onChange={(e) => quantum.updateQubitCount(parseInt(e.target.value))}
              className="w-32 accent-quantum-indigo"
            />
            <span className="text-quantum-teal font-code text-lg">{quantum.currentQubits}</span>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium">Depth:</label>
            <span className="text-quantum-teal font-code">{quantum.circuitDepth}/10000</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={quantum.resetCircuit}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
            >
              <i className="fas fa-undo mr-1"></i>Reset
            </button>
            <button 
              onClick={quantum.exportCircuit}
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
            >
              <i className="fas fa-download mr-1"></i>Export
            </button>
          </div>
        </div>
      </div>

      {/* Quantum Gates Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center space-x-3 flex-wrap">
          <span className="text-sm font-medium text-gray-300">Quantum Gates:</span>
          {quantumOperations.map((op) => (
            <button
              key={op.id}
              onClick={() => quantum.applyOperation(op.id)}
              className={`quantum-operation-btn ${op.color} px-3 py-2 rounded-lg text-sm transition-colors`}
            >
              <i className={`fas fa-${op.icon} mr-1`}></i>
              {op.label}
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Visualization */}
      <div className="flex-1 bg-gray-900 p-6 overflow-auto">
        <div className="bg-gray-800 rounded-xl p-6 h-full quantum-glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Quantum Circuit</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <i className="fas fa-info-circle"></i>
              <span>Interactive quantum circuit designer</span>
            </div>
          </div>

          {/* Circuit Canvas */}
          <div className="bg-gray-900 rounded-lg p-4 min-h-96 relative">
            {/* Qubit Lines */}
            <div className="space-y-12">
              {quantum.qubits.map((qubit: any, index: number) => (
                <div key={index} className="flex items-center space-x-8">
                  <div className="w-16 text-right">
                    <span className="text-quantum-teal font-code">|q₃{index}⟩</span>
                  </div>
                  <div className="flex-1 relative">
                    <div className="h-0.5 bg-quantum-indigo w-full"></div>
                    {/* Render gates for this qubit */}
                    {quantum.operations
                      .filter((op: any) => op.targets.includes(index))
                      .map((op: any, opIndex: number) => (
                        <div
                          key={opIndex}
                          className={`absolute top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold shadow-lg ${
                            op.name === 'hadamard' ? 'bg-quantum-green' :
                            op.name === 'cnot' ? 'bg-quantum-orange' :
                            op.name === 'qft' ? 'bg-quantum-purple' :
                            'bg-quantum-teal'
                          }`}
                          style={{ left: `${(opIndex + 1) * 64}px` }}
                        >
                          {op.name === 'hadamard' ? 'H' :
                           op.name === 'cnot' ? '⊕' :
                           op.name === 'qft' ? 'QFT' :
                           op.name.charAt(0).toUpperCase()}
                        </div>
                      ))}
                  </div>
                  <div className="w-16 text-left">
                    <span className="text-quantum-pink font-code">{qubit.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
