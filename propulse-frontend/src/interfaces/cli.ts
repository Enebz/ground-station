export enum CLIMessageType {
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INPUT = 'input'
}


export interface CLIMessage {
  time: Date | null;
  message: string;
  type: CLIMessageType;
}