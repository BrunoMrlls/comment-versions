import {DatePipe} from "@angular/common";

export class MaskUtils {
  static HUMAN_DATETIME_PATTERN = 'dd/MM/yyyy hh:mm:ss'
  static LOCALE = 'pt-BR'
  static dateToHumanString (datetime: Date) : string {
    return <string>new DatePipe(this.LOCALE).transform(datetime, this.HUMAN_DATETIME_PATTERN);
  }
}
