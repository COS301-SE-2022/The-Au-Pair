import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'the-au-pair-long-field',
  templateUrl: './long-field.component.html',
  styleUrls: ['./long-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LongFieldComponent,
      multi: true,
    },
  ],
})
export class LongFieldComponent implements ControlValueAccessor {
  disabled = false;
  val="";

  @Input()
  labelContent!: string;

  @Input() errorContent = "";

  @Input() showError = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: any = () => {};

  set value(val: string){
    if( val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean) {
    this.showError = disabled;
  }
}
