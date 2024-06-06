import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

function QRCodeScanner({ redo }: { redo: boolean }) {
  const [scanResult, setScanResult] = useState();
  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 100, height: 100 },
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const onScanSuccess = (decodedText, decodedResult) => {
      setScanResult(decodedResult);
      console.log(`Code matched = ${decodedText}`, decodedResult);
      alert(decodedText);
    };

    const onScanFailure = (error) => {
      console.warn(`Code scan error = ${error}`);
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear(); // Clean up the scanner when the component unmounts
    };
  }, []); // This effect runs only once when the component mounts
  useEffect(() => {
    if (redo) {
      setScanResult(undefined); // Clear the scan result when redo is true
    }
  }, [redo]);
  return <div id="reader"></div>;
}
export default QRCodeScanner;
