import { Printer, Trash2 } from 'lucide-react';
import { Label } from './Label';
import { SelectedProduct } from '../types';

interface PrintAreaProps {
  selectedProducts: SelectedProduct[];
  onClear: () => void;
}

export function PrintArea({ selectedProducts, onClear }: PrintAreaProps) {
  const handlePrint = () => {
    window.print();
  };

  const renderLabels = () => {
    const labels: JSX.Element[] = [];
    selectedProducts.forEach((product, index) => {
      for (let i = 0; i < product.cantidad; i++) {
        labels.push(<Label key={`${product.codigo}-${index}-${i}`} product={product} />);
      }
    });
    return labels;
  };

  if (selectedProducts.length === 0) {
    return null;
  }

  const totalLabels = selectedProducts.reduce((acc, prod) => acc + prod.cantidad, 0);

  return (
    <div className="mt-8">
      <div className="no-print bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Etiquetas Seleccionadas
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {totalLabels} etiquetas
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClear}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              <Trash2 size={18} />
              Limpiar Todo
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Printer size={18} />
              Imprimir Etiquetas
            </button>
          </div>
        </div>
      </div>

      <div className="print-area">
        {renderLabels()}
      </div>
    </div>
  );
}
