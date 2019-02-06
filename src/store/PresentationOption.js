import {decorate, observable, action} from 'mobx';

class PresentationOption {
    name = '';
    checked = true;

    constructor(name, checked) {
        this.name = name;
        this.checked = checked;
    }

    setName = val => this.name = val;
    setChecked = val => this.checked = val.target.checked;

}

decorate(PresentationOption, {
    name: observable,
    checked: observable,

    setName: action,
    setChecked: action

});

export default PresentationOption;