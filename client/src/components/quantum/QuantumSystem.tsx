import { useQuantumSystem } from "@/hooks/useQuantumSystem";
import { QuantumSidebar } from "./QuantumSidebar";
import { QuantumCircuit } from "./QuantumCircuit";
import { QuantumMetrics } from "./QuantumMetrics";
import { LoadingModal } from "./LoadingModal";

export function QuantumSystem() {
  const quantum = useQuantumSystem();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Copyright Notice */}
      <div className="fixed top-0 left-0 w-full copyright-banner text-white text-xs py-1 px-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <span>© 2025 Ervin Remus Radosavlevici | ervin210@sky.com | radosavlevici.ervin@gmail.com | ervin210@icloud.com</span>
          <span>RADOS Quantum System v3.0.0-ENTERPRISE</span>
        </div>
      </div>

      {/* Main Application */}
      <div className="flex h-screen pt-8 bg-gray-900">
        <QuantumSidebar quantum={quantum} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Quantum Circuit Designer</h2>
                <p className="text-gray-400">Design and simulate quantum algorithms</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Real-time timestamp */}
                <div className="text-right">
                  <div className="text-sm font-medium text-white" id="current-time">
                    {quantum.currentTime}
                  </div>
                  <div className="text-xs text-gray-400">Quantum Synchronized</div>
                </div>
                <div className="w-px h-8 bg-gray-600"></div>
                <button 
                  onClick={quantum.saveCircuit}
                  className="bg-quantum-indigo hover:bg-quantum-blue px-4 py-2 rounded-lg transition-colors"
                >
                  <i className="fas fa-save mr-2"></i>Save Circuit
                </button>
                <button 
                  onClick={quantum.executeCircuit}
                  className="bg-quantum-teal hover:bg-quantum-green px-4 py-2 rounded-lg transition-colors"
                >
                  <i className="fas fa-play mr-2"></i>Execute
                </button>
              </div>
            </div>
          </header>

          {/* Main Workspace */}
          <div className="flex-1 flex overflow-hidden">
            <QuantumCircuit quantum={quantum} />
            <QuantumMetrics quantum={quantum} />
          </div>
        </div>
      </div>

      <LoadingModal isOpen={quantum.isLoading} />
    </div>
  );
}
