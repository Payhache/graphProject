import { PDFDocument, StandardFonts, rgb, RotationTypes, ColorTypes } from 'pdf-lib';
import { languages } from '../available-languages';

export async function createPdfFromGraphInfos(result, canvas, currentLanguage) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize()
  // width = 595.28, height = 841.89
  const fontSize = 30;

  // Logo Hopitox
  let img = document.getElementById('hopitox_logo')
  let logoCanvas = document.createElement('canvas');
  const ctx = logoCanvas.getContext('2d');
  
  logoCanvas.width = img.width * 1.6;
  logoCanvas.height = img.height * 1.5;
  ctx.drawImage(img, 0, 0);

  const pngLogo = await pdfDoc.embedPng(logoCanvas.toDataURL());
  const pngLogoDims = pngLogo.scale(0.8);
  page.drawImage(pngLogo, {
    x: 320,
    y:  40,
    width: pngLogoDims.width * 1.5,
    height: pngLogoDims.height * 1.5,
    rotate: {angle:  70, type: RotationTypes.Degrees},
    opacity: 0.1,
  })

  // Date du jour
  page.drawText(new Date().toLocaleDateString(), {
    x: width - 60 ,
    y: height - 30,
    size: fontSize / 3,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  // Titre du nomogramme
  page.drawText(languages[currentLanguage]['nomogram_title'], {
    x: 30,
    y: height - 40,
    size: fontSize,
    maxWidth: width - 30,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  // Nomogramme
  const pngImage = await pdfDoc.embedPng(canvas.toDataURL());
  const pngDims = pngImage.scale(0.7)
  // Rectangle pour faire un fond au nomogramme, à garder ou pas
  // page.drawRectangle({
  //   x: width / 2 - pngDims.width / 2 + 30,
  //   y: height - 650  ,
  //   width: pngDims.width - 70,
  //   height: pngDims.height,
  //   color: rgb(1, 1, 1) ,
  //   opacity: 0.8,
  // })
  page.drawImage(pngImage, {
    x: width / 2 - pngDims.width / 2 + 30,
    y:  height - 650,
    width: pngDims.width - 70,
    height: pngDims.height,
    opacity: 1,
  })

  // Résultat du nomogramme
  page.drawText(result, {
    x: 30,
    y: height - 150,
    size: fontSize * 75 / 100,
    maxWidth: width - 50,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })
    
  
  const pdfBytes = await pdfDoc.save()
  let pdfFile = new Blob([pdfBytes], {type: 'application/pdf'});
  let fileURL = URL.createObjectURL(pdfFile);
  window.open(fileURL);
}
