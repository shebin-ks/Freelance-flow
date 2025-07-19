import * as xlsx from 'xlsx';

export const parseExcelBuffer = (buffer: Buffer): any[] => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: any[] = xlsx.utils.sheet_to_json(worksheet);

  return data;
};
