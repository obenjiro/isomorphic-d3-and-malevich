import Observer from './../helpers/observer.js'

export default class {{name}}ViewModel extends Observer {
    init() {

    }
    onUpdate(data) {
        this.fire('update', data.map((item) => {
            return { id: item }
        })
    }
}
