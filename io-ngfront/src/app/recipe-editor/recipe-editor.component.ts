import { Component, OnInit, OnDestroy } from '@angular/core';
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

  selectedRecipe: RecipeInterface = {
    name: ""
  };
  editing: any = {};
  defaultComponent: RecipeComponentsInterface = {quantity: 0, unit: 'lb', order: 0};
  materialList: MaterialInterface[] = [];
  newComponent: RecipeComponents;
  newRecipe: Recipe = this.getNewRecipe();
  editedRecipe: Recipe;

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
    return <Recipe>{
      name: "",
      description: "",
      material: this.getNewMaterial(),
      recipeComponents: []
    }
  }
  getNewMaterial(): Material {
    return <Material>{
      name: "",
      matnr: "",
      description: ""
    }
  }
  getNewComponent(): RecipeComponents {
    return <RecipeComponents>{
      material: this.getNewMaterial(),
      quantity: 0,
      unit: "",
      order: 0
    }
  }
  editRecipe(recipe) {
    for (const edit of this.editing) {this.editing[edit] = false;}
    this.editing[recipe.material.matnr] = !this.editing[recipe.material.matnr];
    if (!this.editing[recipe.material.matnr]) {
      this.recipeDataService.run();
      this.displayMode = 0;
    }else{
      this.recipeDataService.suspend();
      console.log(this.editedRecipe === this.newRecipe);
      this.editedRecipe = recipe;
      this.newComponent = this.getNewComponent();
      this.displayMode = 1;
    }
  }
  createRecipe() {
    this.newRecipe = this.getNewRecipe();
    this.editRecipe(this.newRecipe);
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
  addComponent() {
    this.newComponent.materialId = this.newComponent.material.id;
    this.newComponent.recipeId = this.editedRecipe.id;
    this.recipeComponentService.create(this.newComponent).subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('done')
    );
    return this.refreshEditedComponent();
  }
  refreshEditedComponent() {
    this.recipeService.findById(this.editedRecipe.id, this.filter).subscribe(data => this.editedRecipe = <Recipe>data);
  }
  deleteRecipe(recipe) {
    this.selectedRecipe = recipe;
  }
  cancelEditing() {
    this.editing = !this.editing;
  }
  saveEditing() {
    this.editing = !this.editing;
  }
  editChange() {
    console.log(this.selectedRecipe);
  }
  changeComponentMaterial() {}

  getRecipeList(data) {
    data.forEach(element => this.editing[element.material.matnr] = false);
    this.runtime = data;
    console.log('refreshed');
  }

  constructor(
    private recipeService: RecipeApi,
    private recipeComponentService: RecipeComponentsApi,
    private materialService: MaterialApi,
    private materialTypeService: MaterialTypeApi,
    private breakpointObserver: BreakpointObserver,
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
