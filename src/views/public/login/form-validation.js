export default {
    data(){
        return {
            rules: {
                username: [
                    { required: true, message: "Please enter username", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "Please enter password", trigger: "blur" }
                ]
            }
        }   
    },
    methods :{

    }
}