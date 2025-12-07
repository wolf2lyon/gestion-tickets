import { useRef } from 'react';
import { Upload } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Product } from '../types';

interface FileUploadProps {
  onDataLoaded: (products: Product[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          codigo: String(row.CÓDIGO || row.CÓDIGO || ''),
          descripcion: String(row.DESCRIPCIÓN || row.DESCRIPCIÓN || ''),
          categoria: String(row.CATEGORIA || row.CATEGORIA || ''),
          codigoBarras: String(row['CODIGO DE BARRAS'] || row.codigoBarras || row['Código de Barras'] || ''),
          unidadMedida: String(row['UNIDAD DE MEDIDA'] || row.unidadMedida || ''),
          moneda: String(row.MONEDA || row.MONEDA || '$'),
          precio: parseFloat(row['PRECIO UNITARIO'] || row.precio || 0),
          origen: String(row.Origen || row.origen || row.Pais || row.País || ''),
          nombreEmpresa: String(row['Nombre Empresa'] || row.nombreEmpresa || row.Empresa || ''),
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
