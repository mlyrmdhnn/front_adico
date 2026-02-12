declare module '@/composables/pdf/usePdf' {
  export function usePdf(): {
    exportPdf: (el: HTMLElement, filename: string) => Promise<void>
  }
}
