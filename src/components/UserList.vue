
<template>
  <v-container>
        <div class="weui-search-bar__box searchDiv">
                <i class="weui-icon-search2 icon-16 icon-16-magnifier"></i>
                <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="Search" v-model="searchText"/>
                <a href="javascript:" class="weui-icon-clear" id="searchClear"  @click="clearSearch"></a>
            </div>
        <ul v-for="(employee, index) in filteredEmployees" :key="index">
 
        <user-list-item
          :employee="employee"
          :userId="employee.id" 
          @delete="handleDeleteUser"
         />
   
    </ul>
    </v-container>
</template>

<script>
import UserListItem from './UserListItem.vue';

export default {
    name: 'Home',
    data(){
      return{
        employees : [],
        searchText:'',
      }
      
    },
    methods:{
  getUsers() {
    const storedEmployees = localStorage.getItem('employees');

    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees);
    } else {
      const _url = 'https://gorest.co.in/public/v2/users?page=1&per_page=40';
      const _headers = {
        'Content-Type': 'application/json',
      };

      HWH5.fetch(_url, { method: 'get', headers: _headers, timeout: 6000 })
        .then((res) => res.json())
        .then((reply) => {
          console.log('data: ', reply);
          this.employees = reply;

          localStorage.setItem('employees', JSON.stringify(this.employees));
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  },
  handleDeleteUser(userId) {
    console.log(`Deleting user with ID ${userId}`);

    const index = this.employees.findIndex((user) => user.id === userId);

    if (index !== -1) {
      this.employees.splice(index, 1);
    localStorage.setItem('employees', JSON.stringify(this.employees));
    }
  },
      clearSearch(){
        this.searchText = '';
      }

    },
    computed:{
      filteredEmployees(){
        return this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
      },
    },
    created(){
      this.getUsers()
    },
    components:{
      'user-list-item': UserListItem,

  }, 

  }
</script>

<style>
.searchDiv{
  padding: 8px;
  border: 1px solid black;
  border-radius: 60px;
  margin-bottom: 10px;
}
#searchInput{
  padding: 5px;
  margin-top: 5px;
  padding-left: 12px;
}
</style>