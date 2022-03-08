/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {NbIconLibraries} from '@nebular/theme';
import {FileElement} from './Modelos/element';
import {Observable} from 'rxjs';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  public fileElements: Observable<FileElement[]>;

  constructor(private analytics: AnalyticsService, private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('font-awesome', {packClass: 'fas', iconClassPrefix: 'fa'});
    this.iconLibraries.setDefaultPack('font-awesome');
  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
