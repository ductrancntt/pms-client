export default {
    data(){
        return {
            rules: {
                username: [
                    { required: true, message: "Please enter username", trigger: "blur" },
                    { validator: this.isEmail, message: "Please enter valid email", trigger:"blur"}
                ],
                password: [
                    { required: true, message: "Please enter password", trigger: "blur" }
                ]
            }
        }   
    },
    methods :{
        isEmail(rule,value, callback){
            if(value.split("@").length > 0){
                callback();
            }else{
                callback(new Error(rule.message));
            }
        }
    }
}