declare const html2canvas: any;
declare const saveAs: any;

export function exportJson(traceData: any): void {
  try {
    const jsonString = JSON.stringify(traceData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    saveAs(blob, 'trace-summary.json');
  } catch (err) {
    console.error('JSON export error:', err);
  }
}

export async function exportPng(container: HTMLElement): Promise<void> {
  try {
    const canvas = await html2canvas(container);
    canvas.toBlob((blob: Blob | null) => {
      if (blob) {
        saveAs(blob, 'trace-tree.png');
      } else {
        throw new Error('Blob creation failed');
      }
    });
  } catch (error) {
    console.error('Failed to export PNG:', error);
  }
}