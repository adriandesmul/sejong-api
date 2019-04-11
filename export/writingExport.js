const PDF = require('pdfkit');
const fs = require('fs');

const regularFont = './export/KoPubBatang-Light.ttf';
const boldFont = './export/KoPubBatang-Bold.ttf';

function generatePdf(body, type, res) {
  const doc = new PDF({ autoFirstPage: false });

  let oblique = false,
      underline = false,
      continued = false;

  doc.on('pageAdded', () => {
    console.log(oblique, underline, continued)
    doc.font(boldFont);
    doc.text('Sejong Cultural Society | Writing Competition\n', (type === 'essay') ? 42 : 72, 72, {
      indent: (type === 'essay') ? 30 : 0,
      continued: false
    });
    doc.moveTo(72, 92)
    doc.lineTo(540, 92).lineWidth(1).stroke();
    doc.font(regularFont)
    doc.text(' ', 72, 72, {
      lineGap: 5,
      indent: (type === 'essay') ? 30 : 0,
      oblique: oblique,
      underline: underline,
      continued: false
    });
    doc.moveDown();
  })

  doc.font(regularFont).addPage();

  const bodyArray = body.split(/(<[\/]{0,1}(?:p(?: class="ql-indent-\d")?)?(?:em)?(?:u)?(?:strong)?>|\t|&nbsp;)/g);

  bodyArray.forEach(item => {
    switch (item) {
      case "<strong>":
        doc.font(boldFont);
        break;
      case "</strong>":
        doc.font(regularFont);
        break;
      case "<em>":
        oblique = true;
        continued = true;
        break;
      case "</em>":
        oblique = false;
        continued = true;
        break;
      case "<u>":
        underline = true;
        continued = true;
        break;
      case "</u>":
        underline = false;
        continued = true;
        break;
      case "<p>":
        continued = true;
        break;
      case "</p>":
        doc.text(" ", {
          continued: false
        })
        if (type === 'essay') { doc.moveDown() }
        break;
      case '<p class="ql-indent-1">':
        doc.text("    ", {
          continued: true
        })
        break;
      case '<p class="ql-indent-2">':
        doc.text("        ", {
          continued: true
        })
        break;
      case "<br>":
        doc.moveDown();
        break;
      case "\t":
        doc.text('    ', {
          continued: true
        })
        break;
      case "":
        break;
      case "&nbsp;":
        doc.text(' ', {
          continued: true
        })
        break;
      default:
        doc.text(item, {
          lineGap: 5,
          indent: (type === 'essay') ? 30 : 0,
          oblique: oblique,
          underline: underline,
          continued: continued
        })
    }
  })

  doc.pipe(fs.createWriteStream('./export/file.pdf'))
  doc.pipe(res);

  doc.end();
}

module.exports = {
  generatePdf: generatePdf
}
