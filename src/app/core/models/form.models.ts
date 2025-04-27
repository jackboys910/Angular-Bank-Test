import { IAddress } from './interfaces/form/IAddress';
import { IBankDetails } from './interfaces/form/IBankDetails';
import { IClientInfo } from './interfaces/form/IClientInfo';
import { IDocument } from './interfaces/form/IDocument';
import { ITransactionInfo } from './interfaces/form/ITransactionInfo';

export interface IFormModel {
  clientInfo: IClientInfo;
  address: IAddress;
  bankDetails: IBankDetails;
  transactionInfo: ITransactionInfo;
  documents: IDocument[];
}
