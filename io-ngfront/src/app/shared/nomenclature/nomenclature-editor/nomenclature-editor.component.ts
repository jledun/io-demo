import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NomenclatureService } from '../nomenclature.service';
import { Recipe, RecipeComponents, Material, MaterialInterface } from '../../sdk/models';
import { IoRunTimeDatasService } from '../../lib/io-run-time-datas.service';
import { DataRefresher } from '../../lib/class/dataRefresher.class';
import { LoopBackFilter } from '../../sdk';
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
  selector: 'app-nomenclature-editor',
  templateUrl: './nomenclature-editor.component.html',
  styleUrls: ['./nomenclature-editor.component.scss']
})
export class NomenclatureEditorComponent implements OnInit, OnDestroy {
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
  // materialDataService: DataRefresher;
  
  setClient( size: clientsize, result ) {
    if ( result.matches ) this.client = size;
  }

  refreshDatas() {
    this.recipeDataService.refresh();
    // this.materialDataService.refresh();
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
      this.lbdata.upsertRecipe(this.editedRecipe).concatMap(
        (data: Recipe) => {
          // update recipe components details, one upsert for each component
          return forkJoin(
            this.editedRecipe.recipeComponents.map(
              (component) => {
                if (!component.recipeId) component.recipeId = data.id;
                return this.lbdata.upsertComponent(component);
              }
            )
          );
        }
      ).concatMap(data => {
        // manage components to delete in loopback
        return forkJoin(
          this.componentsToDelete.map(
            component => this.lbdata.deleteComponentById(component.id)
          )
        );

      }).defaultIfEmpty('NO_EFFECT').concatMap((data) => {
        // init list of components to delete
        this.componentsToDelete = [];

        // update recipe list
        return this.lbdata.getRecipeList(this.filter);

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
      this.lbdata.createRecipe(this.editedRecipe).concatMap(
        (data: Recipe) => {
          // update recipe components details, one upsert for each component
          return forkJoin(this.editedRecipe.recipeComponents.map(component => {
            if (!component.recipeId) component.recipeId = data.id;
            return this.lbdata.createComponent(component);
          }));
        }
      ).concatMap((data) => {
        // init list of components to delete
        this.componentsToDelete = [];

        // update recipe list
        return this.lbdata.getRecipeList(this.filter);

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
    this.lbdata.deleteRecipeById(recipe.id)
    .concatMap(data => this.lbdata.getRecipeList(this.filter))
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
    private lbdata: NomenclatureService,
    private breakpointObserver: BreakpointObserver,
    public snackBar: MatSnackBar,
  ) {
    // responsive breakpoints integration
    breakpointObserver.observe( Breakpoints.Handset ).subscribe( result => this.setClient( clientsize.handset, result ) );
    breakpointObserver.observe( Breakpoints.Tablet ).subscribe( result => this.setClient( clientsize.tablet, result ) );
    breakpointObserver.observe( Breakpoints.Web ).subscribe( result => this.setClient( clientsize.web, result ) );
    
    this.recipeDataService = new DataRefresher();
    this.recipeDataService.filter = this.filter;
    this.recipeDataService.dataService = this.lbdata.recipeApi;
    this.recipeDataService.data.subscribe(data => this.getRecipeList(data));
    this.recipeDataService.refresh();

    // this.materialDataService = new DataRefresher();
    // this.materialDataService.filter = {
    //   where: {},
    //   include: "materialType"
    // }
    // this.materialDataService.dataService = this.lbdata.materialApi;
    // this.materialDataService.data.subscribe(data => this.materialList = data);
    // this.materialDataService.refresh();
  }

  ngOnInit() { }
  ngOnDestroy() {
    this.recipeDataService.data.unsubscribe();
    this.recipeDataService.destroy();
    // this.materialDataService.data.unsubscribe();
    // this.materialDataService.destroy();
  }

}
