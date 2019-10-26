const utils = {
    setAttrs(vm, oldObj, newObj){
        Object.keys(newObj).forEach(key => {
            vm.$set(oldObj, key, newObj[key]);
        });
    }
};

export default utils;
