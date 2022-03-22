// Import Depencies For the Pipi.ts File

import { Pipe, PipeTransform } from '@angular/core';

// Pipe Decorators

@Pipe({
  name: 'filesize' // Pipe Name 
})

export class FileSizePipe implements PipeTransform 
{
  transform(size: number, extension: string ) {

    let extensionBytes = 1 ; 

    if(extension=="KB") // If User Want KB size
    {
      extensionBytes = 1024;
    }
    else if(extension=="MB") // If User Want MB size
    {
      extensionBytes = 1024 * 1024 ;
    }
    else if(extension=="GB") // If User Want GB size
    {
      extensionBytes = 1024 * 1024 *1024 ;
    }

    return (size / extensionBytes).toFixed(2)+' '+extension; // File Size with Two Decimal Values with Extension Name
  }
}