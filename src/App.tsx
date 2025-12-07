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

  return (
    <div className="min-h-screen bg-gray-100">
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
                <h3 className="font-semibold text-blue-900 mb-2">
                  Formato de archivo requerido:
                </h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Codigo</li>
                  <li>• Descripcion</li>
                  <li>• Categoria</li>
                  <li>• Codigo de Barras</li>
                  <li>• Unidad de Medida</li>
                  <li>• Moneda</li>
                  <li>• Precio</li>
                  <li>• Origen</li>
                  <li>• Nombre Empresa</li>
                </ul>
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
      />
    )}
    </div>
  );
}

export default App;
