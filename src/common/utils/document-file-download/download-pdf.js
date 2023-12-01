import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { enqueueSnackbar } from 'notistack';

const handleDownloadPdf = async ({
  canvasElement,
  data,
  module,
  setOpenPopup,
  setZIPOpenPopup,
  view
}) => {
  const doc = new jsPDF({
    // orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  const padding = 10;

  // Create an array of promises for capturing images
  const capturePromises = data.map(async (item, index) => {
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
    }
  });

  // Wait for all capture promises to complete
  await Promise.all(capturePromises);
  setOpenPopup(false);
  setZIPOpenPopup('');

  if (view) {
    // Convert the PDF to a Blob
    const pdfBlob = doc.output('blob');

    // Create a Blob URL
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    const newTab = window.open(pdfBlobUrl, '_blank');
    if (!newTab) {
      console.error('Failed to open new tab.');
    }

    // Clean up the Blob URL
    URL.revokeObjectURL(pdfBlobUrl);
  } else {
    // Save the PDF file
    doc.save(`${module}-items.pdf`);
    enqueueSnackbar('PDF file downloaded successfully!', {
      variant: 'success'
    });
  }
};

export default handleDownloadPdf;
