import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then((register) => {
          console.log('Service worker installed');
        })
        .catch((error) => {
          console.error('Error dugin servie worker registation', error);
        });
    }
  })
  .catch(err => console.log(err));
