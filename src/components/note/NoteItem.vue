<template>
    <div style="margin: 5px 5px -2px 5px">
        <el-card :style="{cursor: 'pointer', backgroundColor: item.color}" shadow="never">
            <div class="row">
                <div class="flex" @click="editNote">
                    <span style="padding: 10px 0; white-space: pre-wrap;">{{item.content}}</span>
                </div>
                <div>
                    <el-button :style="{backgroundColor: '#f78989', color: 'white', border: '1px solid white'}" @click="deleteNote" circle
                               icon="el-icon-close" size="mini"/>
                </div>
            </div>
        </el-card>
        <NoteDialog @noteSaved="noteUpdated" ref="noteDialog"/>
    </div>
</template>

<script>
    import NoteService from "@/service/note.service";
    import AlertService from "@/service/alert.service";
    import NoteDialog from "@/components/note/NoteDialog";

    export default {
        name: "NoteItem",
        components: {NoteDialog},
        props: {
            item: {
                type: Object,
                required: true,
            }
        },
        methods: {
            editNote(){
                this.$refs.noteDialog.edit(this.item);
            },
            noteUpdated(){
                let vm = this;
                vm.$emit("itemUpdated");
            },
            deleteNote() {
                let vm = this;
                AlertService.confirm("Delete this note?", function () {
                    console.log("deleted");
                    NoteService.delete(vm.item.id).then(function () {
                        vm.$emit("itemUpdated");
                    })
                });
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-card__body {
        padding: 10px 10px 6px;
    }
</style>