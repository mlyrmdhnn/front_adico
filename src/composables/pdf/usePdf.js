import html2pdf from 'html2pdf.js'

export function usePdf() {
  async function exportPdf(el, filename) {
    const opt = {
      margin: [15, 15, 20, 15],
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: {
        mode: ['avoid-all', 'css', 'legacy'],
      },
    }

    await html2pdf().set(opt).from(el).save()
  }

  return { exportPdf }
}
