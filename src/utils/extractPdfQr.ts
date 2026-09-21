import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import jsQR from "jsqr";
import QrScanner from "qr-scanner";

// Worker for PDF.js v3
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export async function extractQRCodeFromPDF(
  file: File
): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    console.log("📄 PDF loaded. Total pages:", pdf.numPages);

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      console.log(`🔍 Scanning page ${pageNum}`);

      const page = await pdf.getPage(pageNum);

      // Higher scale improves QR detection for small QR codes.
      const viewport = page.getViewport({
        scale: 4,
      });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.warn(`⚠️ Could not create canvas context for page ${pageNum}`);
        continue;
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      // PDF.js v3 expects canvasContext, not canvas.
      await page.render({
        canvasContext: ctx,
        viewport,
      }).promise;

      const imgData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Try jsQR first.
      const qr = jsQR(
        imgData.data,
        imgData.width,
        imgData.height
      );

      if (qr?.data) {
        console.log("✅ jsQR found QR:", qr.data);
        return qr.data;
      }

      // Fallback to QrScanner.
      try {
        const qrStrong = await QrScanner.scanImage(canvas);

        if (qrStrong) {
          console.log("🔥 QrScanner found QR:", qrStrong);
          return qrStrong;
        }
      } catch (qrScannerError) {
        console.warn(
          `⚠️ QrScanner failed on page ${pageNum}:`,
          qrScannerError
        );
      }

      console.log(`⚠️ No QR found on page ${pageNum}`);

      // Release the canvas resources before processing the next page.
      canvas.width = 0;
      canvas.height = 0;
    }

    console.warn("❌ No QR code detected in PDF.");
    return null;
  } catch (err) {
    console.error("PDF QR extraction failed:", err);
    return null;
  }
}