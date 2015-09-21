import './view.css'

import JsonView from './../helpers/jsonview.js'

export default class {{name}}View extends JsonView {
    init() {
        this.viewName = '{{toLowerCase name}}'
    }
}
