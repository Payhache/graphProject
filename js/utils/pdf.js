import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function createPdfFromGraph(graph, result, canvasBytes) {
  let dataGraph = createData(graph)
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize()
    const fontSize = 30
    page.drawText('Nommogramme de Rumack', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0.53, 0.71),
      })

      const pngImage = await pdfDoc.embedPng(canvasBytes)
      const pngDims = pngImage.scale(0.5)
    
      page.drawImage(pngImage, {
        x: page.getWidth() / 2 - pngDims.width / 2,
        y: page.getHeight() / 2 - pngDims.height / 2 + 250,
        width: pngDims.width,
        height: pngDims.height,
      })
    
      const pdfBytes = await pdfDoc.save()
      let pdfFile = new Blob([pdfBytes], {type: 'application/pdf'});
      let fileURL = URL.createObjectURL(pdfFile);
      window.open(fileURL);
    }

function createData(graph) {
  // let resultForPdf = graph.data.datasets[4].map()
  // console.log( graph.data.datasets[4].data)
  }

