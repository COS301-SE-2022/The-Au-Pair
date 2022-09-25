import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'the-au-pair-location-field',
  templateUrl: './location-field.component.html',
  styleUrls: ['./location-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LocationFieldComponent,
      multi: true,
    },
  ],
})
export class LocationFieldComponent implements ControlValueAccessor {
  disabled = false;
  val="";

  //Possible locations searched for
  location = "";
  potentialLocations : string[] = [];
  spinnerActive = false;

  @Input()
  labelContent!: string;

  @Input() errorContent = "";

  @Input() showError = false;

  constructor(private http: HttpClient) {}

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

  async getLocations()
  {
    const loc = this.val;
    
    //Building the API query according to what is in the location input field
    const locationParam = loc.replace(' ', '+');
    const params = locationParam + '&limit=10&format=json&polygon_geojson=1&addressdetails=1';

    //Make the API call
    this.spinnerActive = true;
    await this.http.get('https://nominatim.openstreetmap.org/search?q='+params)
    .toPromise()
    .then(data=>{ // Success
      //Populate potential Locations Array
      const json_data = JSON.stringify(data);

      const res = JSON.parse(json_data);

      //Jump out if no results returned
      if(json_data === "{}")
      {
        return;
      }

      //Clear previous suggested locations
      this.potentialLocations.splice(0);
  
      //Add returned data to the array
      const len = res.length;
      for (let j = 0; j < len && j<5; j++)
      {
        if (this.potentialLocations.includes(res[j].display_name) === false){
          this.potentialLocations.push(res[j].display_name); 
        }
      }
    })
    .catch(error=>{ // Failure
      console.log(error);
    });

    this.spinnerActive = false;
    
  }

  validateSelection()
  {    
    const len = this.potentialLocations.length;

    if(len <= 0) {
      return false;
    }

    for (let j = 0; j < len; j++) 
    { 
      if(this.potentialLocations[j] == this.val){
        return true;
      }
    }
    return false;
  }

  radioChecked(event: any){
    this.value = event.target.value;
  }
}
