import { Search as SearchIcon, Barcode } from 'lucide-react';

interface SearchProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  barcodeText: string;
  onBarcodeChange: (text: string) => void;
}

export function Search({ searchText, onSearchChange, barcodeText, onBarcodeChange }: SearchProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por descripción o categoría..."
            value={searchText}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="relative">
          <Barcode className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Escanear código de barras..."
            value={barcodeText}
            onChange={(e) => onBarcodeChange(e.target.value)}
            autoFocus
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>
    </div>
  );
}
