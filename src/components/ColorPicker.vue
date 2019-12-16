<template>
    <div class="row">
        <div>Pick a Color&nbsp;</div>
        <div>
            <el-color-picker
                    v-model="color"
                    show-alpha
                    :predefine="predefineColors">
            </el-color-picker>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ColorPicker",
        data() {
            return {
                color:'rgba(255, 215, 0, 1)',
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ]
            }
        },
        methods: {
            getSelectedColor(){
                return this.color;
            },
            setColor(color){
                this.color = color;
            }
        }
    }
</script>

<style scoped>

</style>