// src/BarcodeScanner.jsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { BrowserMultiFormatReader } from '@zxing/library';

const BarcodeScannerComponent = () => {
  const [barcodeData, setBarcodeData] = useState('');
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  // Configuración de constraints para usar la cámara trasera
  const videoConstraints = {
    facingMode: { exact: 'environment' }, // Usa 'environment' para la cámara trasera
    width: 400,
    height: 300,
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      try {
        const result = await codeReader.current.decodeFromImageUrl(imageSrc);
        setBarcodeData(result.getText());
      } catch (err) {
        console.error('Error al detectar código:', err);
        setBarcodeData('Código no detectado');
      }
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
        videoConstraints={videoConstraints} // Aquí se aplica la configuración de la cámara
      />
      <button onClick={capture}>Capturar</button>
      {barcodeData && <p>Código detectado: {barcodeData}</p>}
    </div>
  );
};

export default BarcodeScannerComponent;
