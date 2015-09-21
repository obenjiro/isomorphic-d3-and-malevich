import Observer from './observer.js'
import angularish from './angularish.js'

export default class AngularishView extends Observer {
    onUpdate(data) {
        var element;

        if (!this.template) {
            throw 'template is required';
        }

        if (this.viewName) {
            element = document.querySelector('.' + this.viewName);
        } else {
            element = document.body;
        }

        if (element) {
            // simplest way to remove all dom elements, ugly - but simple :)
            element.innerHTML = '';
            element.appendChild(angularish(this.template, data, this));
        } else {
            throw 'element with class viewName must be in the DOM';
        }
    }
}
