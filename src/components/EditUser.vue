<template>
  <div class="js_dialog" id="confirm">
    <div class="weui-mask"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd title">
        <strong class="weui-dialog__title">Edit User</strong>
      </div>
      <div class="weui-dialog__bd">
        <label class="label">Employee Name:</label>
        <div class="weui-dialog__cofirm">
          <input
            id="confirmName"
            class="weui-dialog__cofirm_item"
            v-model="editedName"
            @input="handleNameChange"
            placeholder="Edit Name"
          />
          <i
            id="confirmClear"
            class="icon-16 icon-16-clear weui-dialog__cofirm_clear"
            @click="clearNameValue"
          />
        </div>
        <label class="label">Employee Mail:</label>
        <div class="weui-dialog__cofirm">
          <input
            id="confirmMail"
            class="weui-dialog__cofirm_item"
            @input="handleEmailChange"
            v-model="editedMail"
            placeholder="Edit Email"
            @change="handleStatusChange"
          />
          <i
            id="confirmClear"
            class="icon-16 icon-16-clear weui-dialog__cofirm_clear"
            @click="clearMailValue"
          />
        </div>
        <div class="weui-cell weui-cell-list weui-cell_switch">
          <div class="weui-cell__bd status">Status: {{ getStatusLabel }}</div>
          <div class="weui-cell__ft">
            <input class="weui-switch" type="checkbox" v-model="editedStatus" @change="handleStatusChange" />
          </div>
        </div>
      </div>
      <div class="weui-dialog__ft">
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="handleCancel">
          Cancel
        </a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="handleOk" aria-disabled="editedName==null || ">Ok</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    employee: Object,
  },
  data() {
    return {
      editedName: this.employee.name,
      editedMail: this.employee.email,
      editedStatus: this.employee.status === 'active',
      changesMade: false,
    };
  },
  methods: {
    clearNameValue() {
      this.editedName = '';
      this.changesMade = true;
    },
    clearMailValue() {
      this.editedMail = '';
      this.changesMade = true;
    },
    handleCancel() {
      this.$emit('close');
      this.changesMade = true;
    },
    handleOk() {
      if (this.changesMade) {
        this.$emit('update', {
          name: this.editedName,
          email: this.editedMail,
          status: this.editedStatus ? 'active' : 'inactive',
        });
      }
      this.$emit('close');
    },
    handleNameChange() {
      this.changesMade = true;
    },
    handleEmailChange() {
      this.changesMade = true;
    },
    handleStatusChange() {
      this.changesMade = true;
    },
  },
  computed: {
    getStatusLabel() {
      return this.editedStatus ? 'active' : 'inactive';
    },
  },
};
</script>

<style>
.label {
  display: flex;
  padding-block: 8px;
  font-family: cursive;
}
.status{
    color: limegreen;
    font-family: fantasy;
}
.title{
    color: navy;
    font-family: fantasy;
}
</style>
