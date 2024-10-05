import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

async function prepareApp() {
  const { worker } = await import('./mocks/browser')
  let options = {}

  if (!isDevMode()) {
    options = {
      serviceWorker: {
        url: "/my-search/mockServiceWorker.js",
      },
    }
  }

  return worker.start(options)
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig)
})
