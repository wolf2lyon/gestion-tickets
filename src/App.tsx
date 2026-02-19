import { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { Search } from './components/Search';
import { ProductList } from './components/ProductList';
import { PrintArea } from './components/PrintArea';
import { Product, SelectedProduct } from './types';
import { Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const [barcodeText, setBarcodeText] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  useEffect(() => {
    filterProducts();
  }, [searchText, barcodeText, products]);

  const filterProducts = () => {
    let filtered = products;

    if (barcodeText.trim()) {
      filtered = filtered.filter((p) =>
        p.codigoBarras.toLowerCase().includes(barcodeText.toLowerCase())
      );
    } else if (searchText.trim()) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.descripcion.toLowerCase().includes(search) ||
          p.categoria.toLowerCase().includes(search)
      );
    }

    setFilteredProducts(filtered);
  };

  const handleDataLoaded = (loadedProducts: Product[]) => {
    setProducts(loadedProducts);
    setFilteredProducts(loadedProducts);
  };

  const handleAddProduct = (product: Product, cantidad: number) => {
    setSelectedProducts((prev) => [
      ...prev,
      { ...product, cantidad },
    ]);
  };

  const handleClearSelected = () => {
    setSelectedProducts([]);
  };

  const handleRemoveProduct = (index: number) => {
    setSelectedProducts((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-100 print:min-h-0 print:h-auto">
      <div className="no-print">
        <header className="bg-blue-600 text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <Package size={32} />
              <div>
                <h1 className="text-3xl font-bold">Sistema de Etiquetas de Inventario</h1>
                <p className="text-blue-100 text-sm mt-1">
                  Gestión y generación de etiquetas de precios
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {products.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <FileUpload onDataLoaded={handleDataLoaded} />
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">
                  Formato de archivo requerido (nombres de columnas aceptados):
                </h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• <strong>Código:</strong> Código, CÓDIGO, SKU</li>
                  <li>• <strong>Descripción:</strong> Descripción, DESCRIPCIÓN, Producto, PRODUCTO</li>
                  <li>• <strong>Categoría:</strong> Categoría, CATEGORÍA, Tipo de Producto</li>
                  <li>• <strong>Código de Barras:</strong> Código de Barras, CÓDIGO DE BARRAS</li>
                  <li>• <strong>Unidad de Medida:</strong> Unidad de Medida, UNIDAD DE MEDIDA</li>
                  <li>• <strong>Moneda:</strong> Moneda, MONEDA</li>
                  <li>• <strong>Precio:</strong> Precio, PRECIO, Precio Venta Bruto, PRECIO VENTA BRUTO</li>
                  <li>• <strong>Origen:</strong> Origen, País, Pais</li>
                  <li>• <strong>Nombre Empresa:</strong> Nombre Empresa, Empresa</li>
                </ul>
                <p className="text-xs text-blue-700 mt-3">
                  Tip: El sistema detecta automáticamente múltiples variantes de nombres de columnas
                </p>
              </div>
            </div>
          ) : (
            <>
              <Search
                searchText={searchText}
                onSearchChange={setSearchText}
                barcodeText={barcodeText}
                onBarcodeChange={setBarcodeText}
              />

              <ProductList
                products={filteredProducts}
                onAddProduct={handleAddProduct}
              />
            </>
          )}
        </main>
      </div>
      {/* PrintArea FUERA del div no-print */}
      {products.length > 0 && (
        <PrintArea
          selectedProducts={selectedProducts}
          onClear={handleClearSelected}
          onRemoveProduct={handleRemoveProduct}
        />
      )}
    </div>
  );
}

export default App;
