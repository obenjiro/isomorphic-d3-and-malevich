/**
 * Simplest possible template in AngularJs-ISH style
 *
 * @param {String} template - template string
 * @param {Object} ctx - template context
 * @param {Object} eventHandlerObject - object that will be used as "this" in event handling
 * @returns {Node} returns dom node element
 */
export default function angularish(template, ctx, eventHandlerObject) {
    var node;
    var container = document.createElement('div');

    container.innerHTML = template;

    var walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, null, false);
    while (node = walker.nextNode()) {

        // inheritance of context
        node.ctx = node.ctx || node.parentNode.ctx || ctx;

        // ng-scope allows you to change scope of the node (new scope can be any property of old scope)
        if (node.getAttribute('ng-scope')) {

            node.ctx = _getValue(node.ctx, node.getAttribute('ng-scope'));

        }
        // ng-loop will repeat first child (TODO: reapeat content) and assign correct context
        if (node.getAttribute('ng-loop')) {

            var child = node.children[0];
            var array = _getValue(node.ctx, node.getAttribute('ng-loop')) || [];
            node.removeChild(child);
            array.forEach((item) => {
                child = child.cloneNode(true);
                child.ctx = item;
                node.appendChild(child);
            });

        }
        // ng-value will assign value to node
        if (node.getAttribute('ng-value')) {

            node.value = _getValue(node.ctx, node.getAttribute('ng-value'));

        }
        // ng-selected will set selected attribute depending on true-finess of value
        if (node.getAttribute('ng-selected')) {

            var selected = _getValue(node.ctx, node.getAttribute('ng-selected'));
            if (selected) {
                node.setAttribute('selected', 'yes');
            }

        }
        // ng-text will assign text to node no need for escaping
        if (node.getAttribute('ng-text')) {

            node.innerText = _getValue(node.ctx, node.getAttribute('ng-text'));

        }
        // ng-class will simply assign class from defined property
        if (node.getAttribute('ng-class')) {

            var classVal = _getValue(node.ctx, node.getAttribute('ng-class'));
            if (classVal) {
                node.className += ' ' + classVal;
            }

        }
        // ng-show shows elements depending on true-finess of the value
        if (node.getAttribute('ng-show')) {

            var isVisible = _getValue(node.ctx, node.getAttribute('ng-show'));
            if (!isVisible) {
                node.style.display = 'none';
            }

        }
        // ng-hide shows elements depending on false-iness of the value
        if (node.getAttribute('ng-hide')) {

            var isHidden = _getValue(node.ctx, node.getAttribute('ng-hide'));
            if (isHidden) {
                node.style.display = 'none';
            }

        }
        // ng-change will add "change" event handler
        if (node.getAttribute('ng-change')) {
            // closure to rescue
            ((node)=> {
                node.addEventListener('change', (event) => {
                    eventHandlerObject[node.getAttribute('ng-change')].bind(eventHandlerObject)(node.ctx, event);
                }, true);
            })(node);
        }
        // ng-click will add "click" event handler
        if (node.getAttribute('ng-click')) {
            // closure to rescue
            ((node)=> {
                node.addEventListener('click', (event) => {
                    eventHandlerObject[node.getAttribute('ng-click')].bind(eventHandlerObject)(node.ctx, event);
                }, true);
            })(node);
        }
    }

    return container;
}

function _getValue(ctx, attrVal) {
    if (attrVal === 'self') {
        return ctx;
    }

    return ctx[attrVal];
}
