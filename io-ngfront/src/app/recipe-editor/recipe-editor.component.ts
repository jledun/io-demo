import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Recipe,
  RecipeComponents,
  Material,
  MaterialType,
  RecipeInterface,
  RecipeComponentsInterface,
  MaterialInterface,
  MaterialTypeInterface } from '../shared/sdk/models';
import { 
  RecipeApi,
  RecipeComponentsApi,
  MaterialApi,
  MaterialTypeApi } from '../shared/sdk/services';
import { IoRunTimeDatasService, DataRefresher } from '../shared/io-nglib/';
import { LoopBackConfig, LoopBackAuth, LoopBackFilter } from '../shared/sdk';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/combineLatest';

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
  defaultLength: number = 15;
  filter: LoopBackFilter = {
    where: {},
    skip: 0,
    limit: this.defaultLength,
    include: [
      {
        recipeComponents: {
          material: "materialType"
        }
      },
      {
        material: "materialType"
      }
    ]
  }
  columnsToDisplay = ['name', 'matnr', 'description', 'componentCount','actions'];
  editorColumnsToDisplay = ['matnr', 'quantity', 'unit', 'order'];
  displayMode: number = 0;
  mDisplayMode: number = 0;

  editing: any = {};
  materialList: MaterialInterface[] = [];
  newComponent: RecipeComponents;
  newRecipe: Recipe = this.getNewRecipe();
  editedRecipe: Recipe;
  componentsToDelete: RecipeComponents[] = [];

  recipeDataService: DataRefresher;
  materialDataService: DataRefresher;
  
  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  refreshDatas() {
    this.recipeDataService.refresh();
    this.materialDataService.refresh();
  }
  toggleAutoRefresh() {
    if (this.recipeDataService.status.autorisation) {
      this.recipeDataService.suspend();
    }else{
      this.recipeDataService.run();
    }
  }

  getNewRecipe(): Recipe {
    return new Recipe({
      name: "",
      description: "",
      material: this.getNewMaterial(),
      recipeComponents: []
    });
  }
  getNewMaterial(): Material {
    return new Material({
      name: "",
      matnr: "",
      description: ""
    });
  }
  getNewComponent(): RecipeComponents {
    return new RecipeComponents({
      material: this.getNewMaterial(),
      quantity: 0,
      unit: "",
      order: 0
    });
  }
  createRecipe() {
    this.newRecipe = this.getNewRecipe();
    this.newComponent = this.getNewComponent();
    this.editedRecipe = this.newRecipe;
    this.displayMode = 2;
  }
  actionEditRecipe(recipe){
    this.editedRecipe = recipe;
    this.newComponent = this.getNewComponent();
    this.displayMode = 1;
  }
  getEditedMatnr(): string {
    let matnr;
    Object.keys(this.editing).forEach( key => {
      if (this.editing[key]) matnr = key;
    });
    return matnr;
  }
  getEditedRecipe(): Recipe {
    let matnr = this.getEditedMatnr();
    return this.runtime.find(recipe => recipe.material.matnr === matnr);
  }
  editRecipe(recipe) {

    switch(this.displayMode) {
      case 1:
      // editing existing recipe
      // update recipe general details
      this.recipeService.upsert(this.editedRecipe).concatMap(
        (data: Recipe) => {
          // update recipe components details, one upsert for each component
          return forkJoin(
            this.editedRecipe.recipeComponents.map(
              (component) => {
                if (!component.recipeId) component.recipeId = data.id;
                return this.recipeComponentService.upsert(component);
              }
            )
          );
        }
      ).concatMap(data => {
        // manage components to delete in loopback
        return forkJoin(
          this.componentsToDelete.map(
            component => this.recipeComponentService.deleteById(component.id)
          )
        );

      }).defaultIfEmpty('NO_EFFECT').concatMap((data) => {
        // init list of components to delete
        this.componentsToDelete = [];

        // update recipe list
        return this.recipeService.find(this.filter);

      }).subscribe(
        data => this.getRecipeList(data),
        err => console.error(err),
        () => this.displayMode = 0

      );
      break;

      case 2:
      // creating a new recipe
      // if it has been modified, of course
      if (!this.editedRecipe.name) {
        this.recipeDataService.refresh();
        this.displayMode = 0;
        break;
      }

      // create recipe general details
      this.recipeService.create(this.editedRecipe).concatMap(
        (data: Recipe) => {
          console.log(data);
          // update recipe components details, one upsert for each component
          return forkJoin(this.editedRecipe.recipeComponents.map(component => {
            if (!component.recipeId) component.recipeId = data.id;
            return this.recipeComponentService.create(component);
          }));
        }
      ).concatMap((data) => {
        // init list of components to delete
        this.componentsToDelete = [];
          console.log(data);

        // update recipe list
        return this.recipeService.find(this.filter);

      }).subscribe(
        data => this.getRecipeList(data),
        err => console.log(err),
        () => this.displayMode = 0
      );
      break;

      default:
      this.recipeDataService.refresh();
      this.displayMode = 0;
      break;
    }

  }
  addComponent() {
    this.newComponent.materialId = this.newComponent.material.id;
    this.editedRecipe.recipeComponents.push(Object.assign({}, this.newComponent));
    this.newComponent = this.getNewComponent();
    this.alertUser('new component added :-)');
  }
  deleteRecipe(recipe) {
    if (!confirm(`Do you really want to delete ${recipe.material.matnr} ?`)) return;
    this.recipeService.deleteById(recipe.id)
    .concatMap(data => this.recipeService.find(this.filter))
    .subscribe(
      data => this.getRecipeList(data),
      err => console.log(err),
      () => this.alertUser(`${recipe.name} destroyed`)
    );
  }
  deleteComponent(component: RecipeComponents, key: number) {
    if (!confirm(`Do you really want to delete ${component.material.matnr} ?`)) return;
    this.componentsToDelete.push(Object.assign({}, component));
    this.editedRecipe.recipeComponents.splice(key);
    this.alertUser('component deleted.');
  }

  getRecipeList(data) {
    data.forEach(element => this.editing[element.material.matnr] = false);
    this.runtime = data;
    this.alertUser();
  }

  alertUser(msg: string = 'Data refreshed') {
    this.snackBar.open(msg);
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 4000);
  }

  constructor(
    private recipeService: RecipeApi,
    private recipeComponentService: RecipeComponentsApi,
    private materialService: MaterialApi,
    private materialTypeService: MaterialTypeApi,
    private breakpointObserver: BreakpointObserver,
    public snackBar: MatSnackBar,
  ) {
    LoopBackConfig.setBaseURL( `http://${environment.lbApp.ip}` );
    LoopBackConfig.setApiVersion( environment.lbApp.api );
    
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.recipeDataService = new DataRefresher();
    this.recipeDataService.filter = this.filter;
    this.recipeDataService.dataService = this.recipeService;
    this.recipeDataService.data.subscribe(data => this.getRecipeList(data));
    this.recipeDataService.refresh();

    this.materialDataService = new DataRefresher();
    this.materialDataService.filter = {
      where: {},
      include: "materialType"
    }
    this.materialDataService.dataService = this.materialService;
    this.materialDataService.data.subscribe(data => this.materialList = data);
    this.materialDataService.refresh();
  }

  ngOnInit() { }
  ngOnDestroy() {
    this.recipeDataService.data.unsubscribe();
    this.recipeDataService.destroy();
    this.materialDataService.data.unsubscribe();
    this.materialDataService.destroy();
  }

}
