import { Observable } from "rxjs";

export default function ModelValidator(input: any, model: any, cb: CallableFunction) {
    if (Object.keys(input).length != Object.keys(model).length) {
        cb("model fields is out of range")
    }
    Object.keys(input).forEach(key => {
        if(input[key] === '') {
            cb('model has empty data');
        }
        else if (!model.hasOwnProperty(key)) {
            cb(`${key} is not belong to register model`)
        }
    });
    cb(null)
}