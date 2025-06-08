interface QuantumSidebarProps {
  quantum: any;
}

export function QuantumSidebar({ quantum }: QuantumSidebarProps) {
  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-quantum-indigo to-quantum-teal rounded-lg flex items-center justify-center">
            <i className="fas fa-atom text-white text-lg"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">RADOS Quantum</h1>
            <p className="text-sm text-gray-400">Enterprise Edition</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="p-4 border-b border-gray-700">
        <div className="metric-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">System Status</span>
            <div className="w-3 h-3 bg-quantum-green rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Quantum Core:</span>
              <span className="text-quantum-green">{quantum.systemHealth.quantum_core}</span>
            </div>
            <div className="flex justify-between">
              <span>Network:</span>
              <span className="text-quantum-green">{quantum.systemHealth.network}</span>
            </div>
            <div className="flex justify-between">
              <span>Security:</span>
              <span className="text-quantum-green">{quantum.systemHealth.security}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-quantum-indigo bg-opacity-20 text-quantum-teal rounded-lg quantum-glow">
          <i className="fas fa-project-diagram"></i>
          <span>Quantum Circuit</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
          <i className="fas fa-chart-line"></i>
          <span>Analytics</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
          <i className="fas fa-network-wired"></i>
          <span>Network</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
          <i className="fas fa-shield-alt"></i>
          <span>Security</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors">
          <i className="fas fa-cogs"></i>
          <span>Settings</span>
        </a>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-quantum-indigo rounded-full flex items-center justify-center">
            <i className="fas fa-user text-sm"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Ervin Radosavlevici</p>
            <p className="text-xs text-gray-400">Root Administrator</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
