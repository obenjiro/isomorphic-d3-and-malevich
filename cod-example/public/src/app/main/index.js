import MainController from './controller.js'
import MainStore from './store.js'
import MainViewModel from './viewmodel.js'
import MainView from './view.js'
import MainD3View from './view-d3.js'
//import MainAngularish from './view-angularish.js'

export default class Main {
    init() {
        this.controller = new MainController();
        this.store = new MainStore();
        this.viewmodel = new MainViewModel();
        //this.view = new MainView();
        //this.view = new MainD3View();
        //this.view = new MainAngularish();

        this.view.init();
        this.viewmodel.init();
        this.store.init();
        this.controller.init();


        this.controller.subscribe('first load',
            this.controller, 'onFirstLoad');
        this.controller.subscribe('update',
            this.store, 'onUpdate');
        this.controller.subscribe('item selected',
            this.viewmodel, 'onItemSelected');


        this.store.subscribe('update',
            this.viewmodel, 'onUpdate');

        this.viewmodel.subscribe('update',
            this.view, 'onUpdate');

        this.view.subscribe('item click',
            this.controller, 'onItemClick');

    }
}
