<template>
    <div>
        <el-dialog title="Invite Dialog" width="30%" :visible.sync="dialogVisible">
            <el-form ref="inviteForm" :model="inviteForm">
                <el-form-item label="Email">
                    <el-input v-model="inputText">
                        <el-button slot="append"
                                   icon="el-icon-circle-plus-outline"
                                   :disabled="!inputText"
                                   @click="addEmail">Add
                        </el-button>
                    </el-input>
                    <div style="line-height: 2" class="padding-top-5">
                        <span class="padding-right-5" v-for="email in inviteForm.listEmail" :key="email">
                            <el-tag size="small">
                            <span>{{email}}</span>
                            <el-icon @click.native="removeEmail(email)"
                                     style="font-size: 12pt; padding: 0 0 0 8px"
                                     name="close"/>
                        </el-tag>
                        </span>
                    </div>
                </el-form-item>
                <el-form-item prop="content" label="Content">
                    <el-input type="textarea" :rows="3" v-model="inviteForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :disabled="isSaving || !inviteForm.listEmail.length" type="primary" @click="submit">
                        Send
                    </el-button>
                    <el-button @click="hide">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import AlertService from "@/service/alert.service";
    import UserInvitationService from "@/service/user-invitation.service";

    export default {
        name: "InviteDialog",
        props: {
            projectId: Number,
            isManager: Boolean,
        },
        data() {
            return {
                isSaving: false,
                dialogVisible: false,
                inputText: '',
                inviteForm: {
                    projectId: null,
                    content: 'Join with us!',
                    listEmail: []
                }
            }
        },
        methods: {
            addEmail() {
                this.inviteForm.listEmail.push(JSON.parse(JSON.stringify(this.inputText)));
                this.inputText = '';
            },
            removeEmail(email) {
                this.inviteForm.listEmail = this.inviteForm.listEmail.filter(e => e !== email);
            },
            show() {
                this.dialogVisible = true;
            },
            hide() {
                this.dialogVisible = false;
                this.reset();
            },
            reset() {
                this.inputText = '';
                this.isSaving = false;
                this.inviteForm = {
                    projectId: null,
                    content: 'Join with us!',
                    listEmail: []
                }
            },
            submit() {
                let vm = this;
                vm.isSaving = true;
                vm.inviteForm.projectId = vm.projectId;
                UserInvitationService.sendInvitationRequest(vm.inviteForm).then(onSuccess).catch(onError)

                function onSuccess(response) {
                    AlertService.success("Invitation sent!");
                    vm.hide();
                    vm.isSaving = false;
                }

                function onError(error) {
                    AlertService.error(error.message);
                    vm.hide();
                    vm.isSaving = false;
                }
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog__header {
        background: #026aa7;
    }

    /deep/ .el-dialog__title {
        color: white !important;
    }
</style>
