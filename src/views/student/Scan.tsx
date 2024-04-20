// import React, { useRef } from "react";

// const Scan = () => {
//   const videoRef = useRef(null);

//   const handleOpenCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });

//       // Attach the stream to the video element
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleOpenCamera}>Open Camera</button>
//       <div>
//         <video
//           ref={videoRef}
//           autoPlay
//           playsInline
//           muted
//           style={{ maxWidth: "100%" }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Scan;
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import { useEffect, useRef, useState } from "react";

const QrReader = () => {
  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  useEffect(() => {
    console.log("scanner hit..");

    const hasCam = QrScanner.hasCamera();
    console.log(hasCam);

    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);
  return (
    <div className="">
      {/* QR */}
      <video ref={videoEl}></video>
      <div ref={qrBoxEl} className="">
        <img
          src={QrFrame}
          alt="Qr Frame"
          width={256}
          height={256}
          className=""
        />
      </div>
    </div>
  );
};

export default QrReader;
