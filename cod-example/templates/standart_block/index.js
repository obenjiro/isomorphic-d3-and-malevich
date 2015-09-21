import {{name}}Controller from './controller.js'
import {{name}}Store from './store.js'
import {{name}}ViewModel from './viewmodel.js'
import {{name}}View from './view.js'

export default class {{name}} {
    init() {
        this.controller = new {{name}}Controller();
        this.store = new {{name}}Store();
        this.viewmodel = new {{name}}ViewModel();
        this.view = new {{name}}View();

        this.view.init();
        this.viewmodel.init();
        this.store.init();
        this.controller.init();


        this.controller.subscribe('first load',
            this.controller, 'onFirstLoad');
        this.controller.subscribe('fire',
            this.store, 'onUpdate');

        this.store.subscribe('fire',
            this.viewmodel, 'onUpdate');

        this.viewmodel.subscribe('fire',
            this.view, 'onUpdate');
    }
}
