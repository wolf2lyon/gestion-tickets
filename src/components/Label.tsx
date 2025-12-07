import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';
import { Product } from '../types';

interface LabelProps {
  product: Product;
}

export function Label({ product }: LabelProps) {
  const barcodeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (barcodeRef.current && product.codigoBarras) {
      try {
        JsBarcode(barcodeRef.current, product.codigoBarras, {
          format: 'CODE128',
          width: 1,
          height: 30,
          displayValue: false,
          margin: 0,
        });
      } catch (error) {
        console.error('Error generando código de barras:', error);
      }
    }
  }, [product.codigoBarras]);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const getPriceInteger = () => Math.floor(product.precio);
  const getPriceDecimal = () => {
    const decimal = (product.precio - Math.floor(product.precio)) * 100;
    return Math.round(decimal).toString().padStart(2, '0');
  };

  return (
    <div className="label-container">
      <div className="label-header">
        <div className="label-header-left">
          <h2 className="label-product-name">{product.descripcion}</h2>
        </div>
      </div>

      <div className="label-price-section">
        <div className="label-footer">
          <div className="label-footer-left">
            {product.codigoBarras && (
              <div className="label-barcode-container">
                <p className="label-barcode-text">Codificar: {product.codigoBarras}</p>
                <svg ref={barcodeRef} className="label-barcode"></svg>
              </div>
            )}
          </div>
        </div>
        <div className="label-price">
          <span className="label-price-integer">{getPriceInteger()}</span>
          <div className="label-price-decimal-group">
            <span className="label-price-decimal">{getPriceDecimal()}</span>
            <span className="label-currency">{product.moneda}</span>
          </div>
        </div>
      </div>


    </div>
  );
}
