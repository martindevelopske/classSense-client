import ErrorComponent from "@/components/Error";
import SuccessLogo from "@/components/SuccessLogo";
import axios from "axios";
import {
  Html5QrcodeResult,
  Html5QrcodeScanner,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QRCodeScanner({ redo }: { redo: boolean }) {
  const [scanResult, setScanResult] = useState<Html5QrcodeResult | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showReader, setShowReader] = useState<boolean>(true);
  const navigate = useNavigate();

  const execute = async () => {
    const config = {
      fps: 10,
      qrbox: { width: 100, height: 100 },
      rememberLastUsedCamera: true,
      // Only support camera scan type.
      // supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    };

    const onScanSuccess: QrcodeSuccessCallback = async (
      decodedText,
      decodedResult: Html5QrcodeResult,
    ) => {
      console.log("scan success callback");
      // const parsed = JSON.parse(decodedText);
      // const { action, page, id } = parsed;
       const parsedUrl = new URL(decodedText);
      const pathname = parsedUrl.pathname;
      console.log(pathname);

      try {
        navigate(pathname)
        // if (action === "addAttendance") {
        //   const res = await axios.post(
        //     page,
        //     { sessionId: id },
        //     { withCredentials: true },
        //   );
        //   if (res.status !== 200 && res.status !== 201) {
        //     setError(res.data.message);
        //   } else {
        //     setSuccess("Attendance added successfully");
        //   }
        // } else if (action === "addSessionMember") {
        //   const res = await axios.post(
        //     page,
        //     { sessionId: id },
        //     { withCredentials: true },
        //   );
        //   if (res.status !== 200 && res.status !== 201) {
        //     setError(res.data.message);
        //   } else {
        //     setSuccess("Session member added successfully");
        //   }
        // } else {
        //   setError(
        //     "Provide a valid QR code. This should be scanned from the Instructors Dashboard",
        //   );
        // }
        // setScanResult(decodedResult);

      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          if (err.response.status === 409) {
            setError("Conflict error: " + err.response.data.message);
          } else {
            setError("Error: " + err.response.data.message);
          }
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setShowReader(false);
      }
    };

    const onScanFailure = (error: unknown) => {
      console.warn(`Code scan error = ${error}`);
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scanner.render(onScanSuccess, onScanFailure);

    return () => {
      scanner.clear(); // Clean up the scanner when the component unmounts
    };
  };

  useEffect(() => {
    execute();
  }, []); // This effect runs only once when the component mounts

  useEffect(() => {
    if (redo) {
      setScanResult(null); // Clear the scan result when redo is true
    }
  }, [redo]);

  return (
    <div className="flex items-center justify-center m-5 w-full h-full">
      <div
        id="reader"
        className={`border border-red-800 m-5 w-full md:w-3/4 h-5/6 ${
          !showReader && "hidden"
        }`}
      ></div>
      {success && (
        <div>
          <SuccessLogo message={success} />
        </div>
      )}
      {error && <ErrorComponent errorMessage={error} />}
    </div>
  );
}

export default QRCodeScanner;
