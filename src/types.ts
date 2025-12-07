export interface Product {
  codigo: string;
  descripcion: string;
  categoria: string;
  codigoBarras: string;
  unidadMedida: string;
  moneda: string;
  precio: number;
  origen: string;
  nombreEmpresa: string;
}

export interface SelectedProduct extends Product {
  cantidad: number;
}
