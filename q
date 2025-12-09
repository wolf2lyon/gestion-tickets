warning: in the working copy of 'src/App.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/components/PrintArea.tsx', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/components/ProductList.tsx', LF will be replaced by CRLF the next time Git touches it
[1mdiff --git a/src/App.tsx b/src/App.tsx[m
[1mindex 0689867..157a8ce 100644[m
[1m--- a/src/App.tsx[m
[1m+++ b/src/App.tsx[m
[36m@@ -52,6 +52,10 @@[m [mfunction App() {[m
     setSelectedProducts([]);[m
   };[m
 [m
[32m+[m[32m  const handleRemoveProduct = (index: number) => {[m
[32m+[m[32m    setSelectedProducts((prev) => prev.filter((_, i) => i !== index))[m
[32m+[m[32m  }[m
[32m+[m
   return ([m
     <div className="min-h-screen bg-gray-100 print:min-h-0 print:h-auto">[m
       <div className="no-print">[m
[36m@@ -108,12 +112,13 @@[m [mfunction App() {[m
         </main>[m
       </div>[m
       {/* PrintArea FUERA del div no-print */}[m
[31m-    {products.length > 0 && ([m
[31m-      <PrintArea[m
[31m-        selectedProducts={selectedProducts}[m
[31m-        onClear={handleClearSelected}[m
[31m-      />[m
[31m-    )}[m
[32m+[m[32m      {products.length > 0 && ([m
[32m+[m[32m        <PrintArea[m
[32m+[m[32m          selectedProducts={selectedProducts}[m
[32m+[m[32m          onClear={handleClearSelected}[m
[32m+[m[32m          onRemoveProduct={handleRemoveProduct}[m
[32m+[m[32m        />[m
[32m+[m[32m      )}[m
     </div>[m
   );[m
 }[m
[1mdiff --git a/src/components/PrintArea.tsx b/src/components/PrintArea.tsx[m
[1mindex 37bea18..1c58771 100644[m
[1m--- a/src/components/PrintArea.tsx[m
[1m+++ b/src/components/PrintArea.tsx[m
[36m@@ -1,13 +1,14 @@[m
[31m-import { Printer, Trash2 } from 'lucide-react';[m
[32m+[m[32mimport { Printer, Trash2, X } from 'lucide-react';[m
 import { Label } from './Label';[m
 import { SelectedProduct } from '../types';[m
 [m
 interface PrintAreaProps {[m
   selectedProducts: SelectedProduct[];[m
   onClear: () => void;[m
[32m+[m[32m  onRemoveProduct: (index: number) => void;[m
 }[m
 [m
[31m-export function PrintArea({ selectedProducts, onClear }: PrintAreaProps) {[m
[32m+[m[32mexport function PrintArea({ selectedProducts, onClear, onRemoveProduct }: PrintAreaProps) {[m
   const handlePrint = () => {[m
     window.print();[m
   };[m
[36m@@ -57,6 +58,30 @@[m [mexport function PrintArea({ selectedProducts, onClear }: PrintAreaProps) {[m
             </button>[m
           </div>[m
         </div>[m
[32m+[m
[32m+[m[32m        {/* Lista de productos seleccionados con opción de eliminar */}[m
[32m+[m[32m        <div className="space-y-2 max-h-60 overflow-y-auto">[m
[32m+[m[32m          {selectedProducts.map((product, index) => ([m
[32m+[m[32m            <div[m
[32m+[m[32m              key={`selected-${product.codigo}-${index}`}[m
[32m+[m[32m              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"[m
[32m+[m[32m            >[m
[32m+[m[32m              <div className="flex-1">[m
[32m+[m[32m                <p className="font-medium text-gray-900">{product.descripcion}</p>[m
[32m+[m[32m                <p className="text-sm text-gray-600">[m
[32m+[m[32m                  Código: {product.codigo} | Cantidad: {product.cantidad} etiqueta{product.cantidad !== 1 ? 's' : ''}[m
[32m+[m[32m                </p>[m
[32m+[m[32m              </div>[m
[32m+[m[32m              <button[m
[32m+[m[32m                onClick={() => onRemoveProduct(index)}[m
[32m+[m[32m                className="ml-3 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"[m
[32m+[m[32m                title="Eliminar este producto"[m
[32m+[m[32m              >[m
[32m+[m[32m                <X size={20} />[m
[32m+[m[32m              </button>[m
[32m+[m[32m            </div>[m
[32m+[m[32m          ))}[m
[32m+[m[32m        </div>[m
       </div>[m
 [m
       <div className="print-area" style={{ pageBreakAfter: 'avoid' }}>[m
[1mdiff --git a/src/components/ProductList.tsx b/src/components/ProductList.tsx[m
[1mindex d640436..3b594d5 100644[m
[1m--- a/src/components/ProductList.tsx[m
[1m+++ b/src/components/ProductList.tsx[m
[36m@@ -26,6 +26,13 @@[m [mexport function ProductList({ products, onAddProduct }: ProductListProps) {[m
     }));[m
   };[m
 [m
[32m+[m[32m  const handleSelectAll = () => {[m
[32m+[m[32m    products.forEach((product) => {[m
[32m+[m[32m      const cantidad = selectedQuantities[product.codigo] || 1;[m
[32m+[m[32m      onAddProduct(product, cantidad)[m
[32m+[m[32m    })[m
[32m+[m[32m  }[m
[32m+[m
   if (products.length === 0) {[m
     return ([m
       <div className="text-center py-12 text-gray-500">[m
[36m@@ -36,6 +43,18 @@[m [mexport function ProductList({ products, onAddProduct }: ProductListProps) {[m
 [m
   return ([m
     <div className="bg-white rounded-lg shadow-md overflow-hidden">[m
[32m+[m[32m      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">[m
[32m+[m[32m        <p className="text-sm text-gray-600">[m
[32m+[m[32m          Mostrando {products.length} producto{products.length !== 1 ? 's' : ''}[m
[32m+[m[32m        </p>[m
[32m+[m[32m        <button[m
[32m+[m[32m          onClick={handleSelectAll}[m
[32m+[m[32m          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"[m
[32m+[m[32m        >[m
[32m+[m[32m          <Plus size={16} />[m
[32m+[m[32m          Seleccionar Todos[m
[32m+[m[32m        </button>[m
[32m+[m[32m      </div>[m
       <div className="overflow-x-auto max-h-[600px] overflow-y-auto">[m
         <table className="w-full">[m
           <thead className="bg-gray-50 border-b border-gray-200">[m
