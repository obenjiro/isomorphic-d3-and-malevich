import AngularishView from './../helpers/angularishview.js'

export default class MainAngularish extends AngularishView {
    init() {
        this.viewName = null;
        this.template = `
            <div ng-loop="self">
                <div ng-click="onItemClick">
                    <span ng-text="id"></span>:
                    <span ng-text="selected"></span>
                </div>
            </div>
        `;
    }
    onItemClick(item) {
        this.fire('item click', item.id);
    }
}
