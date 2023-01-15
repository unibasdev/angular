export const ERROR = 'ERROR';
export const OK = 'OK';

export class AlertMessage {
  constructor(readonly message: string,
              readonly type: string = OK,
              readonly keepAfterNavigation: boolean = false) {
  }
}
