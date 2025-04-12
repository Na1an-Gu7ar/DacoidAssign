import React, { useState } from "react";
import QRCode from "qrcode";

const QRCodeModal = ({ shortUrl }) => {
    const [qrData, setQrData] = useState(null);
    const [showQR, setShowQR] = useState(false);

    const generateQR = async () => {
        try {
            const url = await QRCode.toDataURL(shortUrl);
            setQrData(url);
            setShowQR(true);
        } catch (err) {
            console.error("QR generation error:", err);
        }
    };

    return (
        <>
            <button
                onClick={generateQR}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
                QR
            </button>

            {showQR && qrData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-4 rounded shadow">
                        <img src={qrData} alt="QR Code" />
                        <button
                            onClick={() => setShowQR(false)}
                            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default QRCodeModal;
