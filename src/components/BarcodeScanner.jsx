// // src/BarcodeScanner.jsx
// import React, { useState, useRef } from 'react';
// import { useEffect } from 'react';
// import Webcam from 'react-webcam';
// import jsBarcode from 'jsbarcode';

// const BarcodeScannerComponent = () => {
//   const [barcodeData, setBarcodeData] = useState('');
//   const webcamRef = useRef(null);

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     // Aquí puedes agregar la lógica para procesar el código de barras
//     console.log(imageSrc); // Muestra la imagen en consola (solo para verificación)
//   }, [webcamRef]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       capture();
//     }, 3000); // Captura cada 3 segundos
//     return () => clearInterval(timer);
//   }, [capture]);

//   return (
//     <div>
//       <h1>Escáner de Códigos de Barras</h1>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width={900}
//         height={300}
//       />
//       <button onClick={capture}>Capturar</button>
//       {barcodeData && <p>Código detectado: {barcodeData}</p>}
//     </div>
//   );
// };

// export default BarcodeScannerComponent;
// src/BarcodeScanner.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScannerComponent = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const image = document.createElement('img');
      image.src = imageSrc;

      // Espera a que la imagen se cargue antes de procesarla
      image.onload = async () => {
        try {
          const result = await codeReader.current.decode(image);
          setBarcodeData(result.getText());
        } catch (err) {
          console.error('Error al detectar código:', err);
          setBarcodeData('Código no detectado');
        }
      };
    }
  }, [webcamRef]);

  useEffect(() => {
    const timer = setInterval(() => {
      capture();
    }, 3000); // Captura cada 3 segundos
    return () => clearInterval(timer);
  }, [capture]);

  return (
    <div>
      <h1>Escáner de Códigos QR y de Barras</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        height={300}
      />
      <button onClick={capture}>Capturar</button>
      {barcodeData && <p>Código detectado: {barcodeData}</p>}
    </div>
  );
};

export default BarcodeScannerComponent;
