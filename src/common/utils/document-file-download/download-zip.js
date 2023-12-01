import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip'; // Import JSZip library
import { enqueueSnackbar } from 'notistack';

const handleDownloadPdfAsZip = async ({
  canvasElement,
  data,
  module,
  setOpenPopup,
  setZIPOpenPopup
}) => {
  const zip = new JSZip(); // Create a new zip archive
  const doc = new jsPDF({
    // orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  const padding = 10;

  // Create an array of promises for capturing images
  const capturePromises = data.map(async (item) => {
    const chunkSize = 5;
    const numberOfArrays = Math.ceil(
      item[`${module}Products`] && item[`${module}Products`].length / chunkSize
    );

    for (let i = 0; i < numberOfArrays; i++) {
      const capture = document.querySelector(`.${canvasElement}-${item.id}-${i}`);
      if (!capture) {
        console.error('Element for capture not found.');
        return null;
      }

      // eslint-disable-next-line no-await-in-loop
      const canvas = await html2canvas(capture);
      const imgData = canvas.toDataURL('image/jpeg');

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight(); // Get the page height

      const imageWidth = pageWidth - padding;
      let imageHeight = (canvas.height * imageWidth) / canvas.width;

      // Check if the image height exceeds the page height
      if (imageHeight > pageHeight) {
        // Add a new page
        data.length > 1 && doc.addPage();
        imageHeight = pageHeight; // Reset imageHeight to pageHeight
      }

      // Add the image to the current page
      doc.addImage(imgData, 'JPEG', padding, padding, imageWidth, imageHeight);

      // Add a new page if not the last item
      if (i !== numberOfArrays - 1) {
        doc.addPage();
      }

      // Add page number
      doc.setFontSize(12);
      doc.text(`Page ${i + 1}/${numberOfArrays}`, pageWidth / 2, pageHeight - 3, 'right');
      // Convert the PDF Blob to Uint8Array for adding to the zip
      const pdfBytes = doc.output('arraybuffer');
      zip.file(`${module}-${item.id}.pdf`, pdfBytes);
      enqueueSnackbar('ZIP file downloaded successfully!', {
        variant: 'success'
      });
    }
  });

  // Wait for all capture promises to complete
  await Promise.all(capturePromises);
  setOpenPopup(false);
  setZIPOpenPopup('');

  // Generate the zip file and module it for download
  zip.generateAsync({ type: 'blob' }).then((zipBlob) => {
    const zipBlobUrl = URL.createObjectURL(zipBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = zipBlobUrl;
    downloadLink.download = `${module}.zip`; // Set the zip file name
    downloadLink.click();

    URL.revokeObjectURL(zipBlobUrl);
  });
};

export default handleDownloadPdfAsZip;
