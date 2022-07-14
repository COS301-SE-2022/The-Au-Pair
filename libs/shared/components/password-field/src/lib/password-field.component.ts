import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'the-au-pair-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordFieldComponent,
      multi: true,
    },
  ],
})
export class PasswordFieldComponent implements ControlValueAccessor {
  disabled = false;
  val = "";
  showPassword = false;

  @Input()
  labelContent!: string;

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
    this.disabled = disabled;
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
  }
}