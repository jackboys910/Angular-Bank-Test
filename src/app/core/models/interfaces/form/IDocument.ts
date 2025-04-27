export interface IDocument {
  documentType: 'passport' | 'snils' | 'inn';
  documentNumber: string;
  issueDate: Date;
}
