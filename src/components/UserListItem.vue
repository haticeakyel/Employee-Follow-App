<template>
  <div class="card">

    <div class="weui-head-icon_view__80">
      <img :src="employeeGenderSrc" />
    </div>
    <h2>{{ employee.name }}</h2>
    <p class="mail">{{ employee.email }}</p>
    <p>{{ employee.status }}</p>
    
    <div style="margin-top: 20px;">
      <button @click="editUser" class="editButton">
        Edit
      </button>
      <button @click="deleteUser" class="editButton">
        Delete
      </button>
      </div>
   <edit-user v-if="edit" @close="handleClose" :employee="employee" @update="updateEmployee"/>

  </div>
</template>

<script>
import EditUserVue from './EditUser.vue';

export default {
  props: {
    employee: Object,
    userId: Number,
  },
  data() {
    return {
      edit: false,
    };
  },
  computed: {
    employeeGenderSrc() {
      if (this.employee.gender === 'female') {
        return require('@/assets/female.png');
      } else {
        return require('@/assets/male.png');
      }
    },
  },
  components: {
    'edit-user': EditUserVue,
  },
  methods: {
    handleClose() {
      this.edit = false;
    },
    editUser() {
      console.log('click');
      this.edit = true;
    },
        updateEmployee(editedData) {
      this.employee.name = editedData.name;
      this.employee.email = editedData.email;
      this.employee.status = editedData.status;
      
      const storedEmployees = JSON.parse(localStorage.getItem('employees'));

      const updatedEmployees = storedEmployees.map((storedEmployee) => {
        if (storedEmployee.id === this.employee.id) {
          return {
            ...storedEmployee,
            name: editedData.name,
            email: editedData.email,
            status: editedData.status,
          };
        }
        return storedEmployee;
      });


      localStorage.setItem('employees', JSON.stringify(updatedEmployees));


      this.edit = false;
    },
    deleteUser(){
      this.$emit('delete', this.userId);
    },
  },
};
</script>

<style>
.card {
  border: 1px solid black;
  text-align: center;
  padding: 20px;
  border-radius: 60px;
  background-color: gainsboro;
  margin: 20px;
}
.mail {
  font-style: italic;
}
.editButton{
width: 140px;
height: 30px;
color: white;
background-color: grey;
border-radius: 20px;

}
</style>
