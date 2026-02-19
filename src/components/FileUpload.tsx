import { useRef } from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Product } from '../types';

interface FileUploadProps {
  onDataLoaded: (products: Product[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función helper para buscar un valor usando múltiples nombres de columna
  const getColumnValue = (row: any, columnNames: string[]): any => {
    for (const name of columnNames) {
      if (row[name] !== undefined && row[name] !== null && row[name] !== '') {
        return row[name];
      }
    }
    return '';
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData)

        const products: Product[] = jsonData.map((row: any) => ({
          // Código o SKU
          codigo: String(getColumnValue(row, ['CÓDIGO', 'Código', 'SKU', 'CODIGO']) || ''),
          
          // Descripción o Producto
          descripcion: String(getColumnValue(row, ['DESCRIPCIÓN', 'Descripción', 'Descripcion', 'DESCRIPCION', 'Producto', 'PRODUCTO']) || ''),
          
          // Categoría o Tipo de Producto
          categoria: String(getColumnValue(row, ['CATEGORIA', 'Categoria', 'Categoría', 'CATEGORÍA', 'Tipo de Producto', 'TIPO DE PRODUCTO']) || ''),
          
          // Código de Barras (con o sin tilde, con o sin "de")
          codigoBarras: String(getColumnValue(row, ['CODIGO DE BARRAS', 'Codigo de Barras', 'Código de Barras', 'CÓDIGO DE BARRAS', 'Código Barras', 'CÓDIGO BARRAS', 'Codigo Barras', 'codigoBarras']) || ''),
          
          // Unidad de Medida
          unidadMedida: String(getColumnValue(row, ['UNIDAD DE MEDIDA', 'Unidad de Medida', 'unidadMedida']) || ''),
          
          // Moneda (por defecto PEN)
          moneda: String(getColumnValue(row, ['MONEDA', 'Moneda', 'moneda']) || 'PEN'),
          
          // Precio o Precio Venta Bruto
          precio: parseFloat(getColumnValue(row, ['PRECIO UNITARIO', 'Precio Unitario', 'PRECIO', 'Precio', 'precio', 'Precio Venta Bruto', 'PRECIO VENTA BRUTO']) || 0),
          
          // Origen
          origen: String(getColumnValue(row, ['Origen', 'origen', 'ORIGEN', 'Pais', 'País', 'PAÍS']) || ''),
          
          // Nombre Empresa
          nombreEmpresa: String(getColumnValue(row, ['Nombre Empresa', 'nombreEmpresa', 'NOMBRE EMPRESA', 'Empresa', 'EMPRESA']) || ''),
        }));

        onDataLoaded(products);
      } catch (error) {
        console.error('Error procesando archivo:', error);
        alert('Error al procesar el archivo. Verifica que tenga el formato correcto.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-blue-400 rounded-lg p-12 text-center cursor-pointer hover:border-blue-600 transition-colors bg-white"
    >
      <Upload className="mx-auto mb-4 text-blue-500" size={48} />
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Arrastra o haz clic para cargar archivo
      </p>
      <p className="text-sm text-gray-500">
        Soporta archivos .CSV y .XLSX
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
