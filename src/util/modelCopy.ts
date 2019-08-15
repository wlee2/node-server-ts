export function MongoModelToViewModel(from: any, target: any, cb: any) {
    if(Object.keys(target).length === 0) {
        return cb("target model is not initilized!");
    }
    if (Object.keys(from._doc).length < Object.keys(target).length) {
        return cb("target model has more fields then from model");
    }
    let targetModel = target;
    Object.keys(from._doc).forEach(key => {
        if (key in target) {
            targetModel[key] = from[key]
        }
    });
    return cb(null, targetModel);
}

export function ModelCopy(from: any, target: any, cb: CallableFunction) {
    if(Object.keys(target).length === 0) {
        return cb("target model is not initilized!");
    }
    if(Object.keys(from).length === 0){
        return cb("from model is not initilized!");
    }
    if(Object.keys(from).length < Object.keys(target).length) {
        return cb("target model has more fields then from model");
    }

    let newCopyedTargetModel = target;
    Object.keys(from).forEach(key => {
        if(key in target) {
            newCopyedTargetModel[key] = from[key];
        }
    });

    return cb(null, newCopyedTargetModel);

}