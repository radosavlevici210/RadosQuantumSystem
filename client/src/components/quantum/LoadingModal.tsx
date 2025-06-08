interface LoadingModalProps {
  isOpen: boolean;
}

export function LoadingModal({ isOpen }: LoadingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-quantum-indigo border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-white mb-2">Processing Quantum Operation</h3>
          <p className="text-gray-400 text-sm">Executing quantum algorithm on distributed network...</p>
        </div>
      </div>
    </div>
  );
}
