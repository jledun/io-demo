import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Recipe, RecipeComponents } from '../shared/sdk/models';
import { RecipeApi, RecipeComponentsApi } from '../shared/sdk/services';
import { IoRunTimeDatasService, DataRefresher } from '../shared/io-nglib/';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../shared/sdk';
import { environment } from '../../environments/environment';

enum clientsize {
  handset = 'handset',
  tablet = 'tablet',
  web = 'web'
}

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit, OnDestroy {
  runtime: Recipe[];
  client: clientsize = clientsize.web;
  load: boolean = false;
  refresher: DataRefresher;
  
  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  constructor(
    private rtService: RecipeApi,
    private breakpointObserver: BreakpointObserver,
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
    
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.refresher = new DataRefresher();
    this.refresher.dataService = this.rtService;
    this.refresher.run();
    this.refresher.data.subscribe(data => this.runtime = data[0]);
  }

  ngOnInit() { }
  ngOnDestroy() { }

}
