import { PDFDocument, StandardFonts, rgb, RotationTypes, ColorTypes, PDFTextField, PDFFont } from 'pdf-lib';
import { languages } from '../available-languages';

export async function createPdfFromGraphInfos(graph, result, canvas, currentLanguage) {
  const primaryFontColor = rgb(0.2, 0.2, 0.6);
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize()
  //PDF dimensions de base : width = 595.28, height = 841.89
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
    size: fontSize / 2.75,
    font: timesRomanFont,
    color: primaryFontColor,
  })

  // Titre du nomogramme
  page.drawText(languages[currentLanguage]['nomogram_title'], {
    x: 30,
    y: height - 40,
    size: fontSize,
    maxWidth: width - 100,
    font: timesRomanFont,
    color: primaryFontColor,
  })

  // Identifiant du patient
  page.drawText(languages[currentLanguage]['pdf_patient_id'], {
    x: 30 ,
    y: height - 150,
    size: fontSize / 2,
    font: timesRomanFont,
    color: primaryFontColor,
  })

  // TextInput
  const form = pdfDoc.getForm();
  const textField = form.createTextField('patient.id');
  textField.setMaxLength(14);

  textField.addToPage(page, {
    x: 30,
    y: height - 180,
    width: 150,
    height: 25,
    backgroundColor: rgb(0.95, 0.95, 0.95),
  })

  // Résultat du nomogramme
  page.drawText(result, {
    x: 30,
    y: height - 250,
    size: fontSize * 75 / 100,
    maxWidth: width - 50,
    font: timesRomanFont,
    color: primaryFontColor,
  })

  // Concentration en mg/L au dernier prélèvement
  // TODO à traduire si on le garde
  let lastPatientConcentration = document.getElementsByClassName("interval_paracetamol_concentration")[document.getElementsByClassName("interval_paracetamol_concentration").length - 1].value;
  page.drawText("Concentration de " + lastPatientConcentration + " mg/L de sang", {
    x: width - 430 ,
    y: height - 300,
    size: fontSize / 1.75,
    font: timesRomanFont,
    color: primaryFontColor,
  })

  // Nomogramme
  const pngImage = await pdfDoc.embedPng(canvas.toDataURL());
  const pngDims = pngImage.scale(0.7)
  // Rectangle pour faire un fond au nomogramme, à garder ou pas
  // page.drawRectangle({
  //   x: width / 2 - pngDims.width / 2 + 30,
  //   y: height - 750  ,
  //   width: pngDims.width - 70,
  //   height: pngDims.height,
  //   color: rgb(1, 1, 1) ,
  //   opacity: 0.8,
  // })
  page.drawImage(pngImage, {
    x: width / 2 - pngDims.width / 2 + 30,
    y:  height - 750,
    width: pngDims.width - 70,
    height: pngDims.height,
    opacity: 1,
  })

  // Notes
  page.drawText("Notes :", {
    x: width - 560 ,
    y: height - 780,
    size: fontSize / 1.75,
    font: timesRomanFont,
    color: primaryFontColor,
  })
 
  
  const pdfBytes = await pdfDoc.save()
  let pdfFile = new Blob([pdfBytes], {type: 'application/pdf'});
  let fileURL = URL.createObjectURL(pdfFile);
  window.open(fileURL);
}
