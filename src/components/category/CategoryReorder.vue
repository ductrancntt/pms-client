<template>
    <div>
        <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" title="Project Dialog" width="40%">
            <div class="padding-10">
                <draggable :list="listCategory"
                           @change="log($event, listCategory)"
                           class="list-group"
                           v-bind="dragOptions">
                    <transition-group type="transition" name="flip-list">
                    <el-card class="margin-bottom-10" style="background: #E7EAF0" :key="cat.id" shadow="never" v-for="cat in listCategory">
                        <div class="row">
                            <div class="flex">{{cat.pos}} - {{cat.name}}</div>
                        </div>
                    </el-card>
                    </transition-group>
                </draggable>
            </div>
            <div class="text-center">
                <el-button @click="hide">Close</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import CategoryService from "@/service/category.service";
    import draggable from "vuedraggable";
    import AlertService from "@/service/alert.service";

    export default {
        name: "CategoryReorder",
        props: {
            projectId: Number,
        },
        components: {draggable},
        data() {
            return {
                listCategory: [],
                isSaving: false,
                dialogVisible: false,
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 300,
                    group: "category",
                    ghostClass: "ghost",
                };
            }
        },
        methods: {
            show() {
                this.dialogVisible = true;
                this.loadData();
            },
            hide() {
                let vm = this;
                vm.dialogVisible = false;
                vm.$emit("categorySaved");
            },
            log(e, listCategory) {
                let vm = this;
                const idx = e.moved.newIndex;
                let update = vm.getNewPos(idx, listCategory);
                let newPos = update.newPos;
                vm.$utils.setAttrs(vm, e.moved.element, {pos: newPos});
                CategoryService.updatePos(e.moved.element).then(response => {
                    if (update.updateList) CategoryService.updateList(listCategory).then(response => {
                        vm.loadData();
                    })
                }).catch(error => AlertService.error("Change order failed"));
            },
            getNewPos(idx, category) {
                const increment = Math.pow(2, 16);
                let before = category[idx - 1], after = category[idx + 1], current = category[idx];
                let newPos = current.pos;
                let updateList = false;

                if (before && after) {
                    /* Neu co the truoc va sau thi lay trung binh */
                    newPos = Math.floor((before.pos + after.pos) / 2);
                    if (newPos === before.pos || newPos === after.pos || newPos === 0) updateList = true;
                } else if (before) {
                    /* New co the truoc */
                    if (before.pos >= current.pos) /* Neu the truoc lon hon the hien tai thi tang */
                        newPos = before.pos + increment;
                } else if (after) {
                    if (after.pos <= current.pos) {
                        newPos = Math.floor(after.pos / 2);
                        if (newPos === after.pos || newPos === 0) updateList = true;
                    }
                }
                return {
                    newPos: newPos,
                    updateList: updateList
                }
            },
            loadData() {
                let vm = this;
                CategoryService.getByProject(vm.projectId).then(response => {
                    vm.listCategory = response;
                })
            },
        }
    }
</script>

<style scoped>
    /deep/ .el-dialog__body {
        padding: 10px;
    }

    .list-group {
        height: 100%;
    }

    .list-group-item {

    }

    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }

    .ghost {
        font-size: 0;
        opacity: 1;
        background-color: transparent;
        border: 2px dashed #026AA7;
        border-radius: 5px;
    }
</style>