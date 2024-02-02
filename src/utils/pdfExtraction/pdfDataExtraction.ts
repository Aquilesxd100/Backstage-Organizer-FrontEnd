import PDF from "./pdf-curso.pdf";
import pdfjs from 'pdfjs-dist';

const getPDFContent = async () => {
  // Extract text from each page
  const PDFContent = await pdfjs.getDocument({ url: PDF}).promise.then((pdf) => {
  const pagina = pdf.getPage(1).then((page) => {
    const pageContent = page.getTextContent().then((content) => {
      console.log(content.items)
    })
  });
  })

/*   const textPromises = [];
    textPromises.push(
      pdfjs.getDocument({ url: 'path/to/pdf/file.pdf' })
        .then((pdf) => pdf.getPage(i))
        .then((page) => page.getTextContent())
        .then((textContent) => {
          const pageText = textContent.items.map((item) => item.str).join(' ');
          return pageText;
        })
    );

  Promise.all(textPromises)
    .then((pageTexts) => {
      const extractedText = pageTexts.join(' ');
      setPdfText(extractedText);
    })
    .catch((error) => console.error('Failed to extract PDF text:', error)); */
};

async function getPDFData() {
  const PDFContent = await getPDFContent();
}
export default getPDFData;