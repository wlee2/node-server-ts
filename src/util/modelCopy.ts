export default function MongoModelToViewModel(from: any, target: any, cb: CallableFunction) {
    if(Object.keys(target).length === 0) {
        cb("target model is not initilized!");
    }
    if (Object.keys(from._doc).length < Object.keys(target).length) {
        cb("target model has more fields then from model");
    }
    let targetModel = target;
    Object.keys(from._doc).forEach(key => {
        if (key in target) {
            targetModel[key] = from[key]
        }
    });
    cb(null, targetModel);
}