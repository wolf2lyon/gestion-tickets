import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddProduct: (product: Product, cantidad: number) => void;
}

export function ProductList({ products, onAddProduct }: ProductListProps) {
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (codigo: string, cantidad: number) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [codigo]: cantidad,
    }));
  };

  const handleAddProduct = (product: Product) => {
    const cantidad = selectedQuantities[product.codigo] || 1;
    onAddProduct(product, cantidad);
    setSelectedQuantities((prev) => ({
      ...prev,
      [product.codigo]: 1,
    }));
  };

  const handleSelectAll = () => {
    products.forEach((product) => {
      const cantidad = selectedQuantities[product.codigo] || 1;
      onAddProduct(product, cantidad)
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No se encontraron productos
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Mostrando {products.length} producto{products.length !== 1 ? 's' : ''}
        </p>
        <button
          onClick={handleSelectAll}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          Seleccionar Todos
        </button>
      </div>
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Código</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Descripción</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Precio</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cantidad</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.codigo} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-900">{product.codigo}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{product.descripcion}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{product.categoria}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                  {product.moneda} {product.precio.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantities[product.codigo] || 1}
                    onChange={(e) => handleQuantityChange(product.codigo, parseInt(e.target.value) || 1)}
                    className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAddProduct(product)}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Plus size={16} />
                    Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
