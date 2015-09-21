import './app.css'

//import Main from './app/main/index.js'
import Test from './app/test/index.js'

class App {
    init() {
        //this.main = new Main();
        this.test = new Test();

        //this.main.init();
        this.test.init();

        //this.main.controller.fire('first load');
        this.test.controller.fire('first load');
    }
}

!function() {

    var app = new App();
    if (__DEV__) {
        // we need to have app as global variable for debugging purposes
        window.app = app;
    }
    document.addEventListener('DOMContentLoaded', app.init.bind(app), false);

}();
