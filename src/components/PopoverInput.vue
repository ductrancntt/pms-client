<template>
    <el-popover
            placement="top"
            width="180"
            v-model="visible">
        <div>
            <el-form ref="projectForm" :model="form">
                <el-form-item prop="name" label="Name">
                    <el-input v-model="taskForm.name"></el-input>
                </el-form-item>
                <el-form-item class="margin-bottom-0">
                    <div class="row">
                        <div class="text-left flex">
                            <el-button size="medium" :disabled="isSaving" type="primary" @click="submit">Save
                            </el-button>
                        </div>
                        <div class="text-right flex">
                            <el-button size="medium" @click="hide">Cancel</el-button>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" style="height: 100%; width: 100%" slot="reference">Add Task</el-button>
    </el-popover>
</template>

<script>
    export default {
        name: "PopoverInput",
        props: {
            submit: {
                type: Function,
                required: true,
            }
        },
        data() {
            return {
                isSaving: false,
                visible: false,
                form: {
                    name: null,
                },
                rules: {
                    name: [
                        {required: true, message: "This field is required", trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>

<style scoped>

</style>
