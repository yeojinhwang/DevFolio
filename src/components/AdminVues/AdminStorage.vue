<template>
  <v-container>
    <div>
      Storage Page
    </div>
    <v-data-table
      :headers="headers"
      :items="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>
          {{ props.item.displayName }}
        </td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right">{{ props.item.emailVerified }}</td>
        <td class="text-xs-right">{{ props.item.disabled }}</td>
        <td class="text-xs-right">{{ props.item.metadata.lastSignInTime }}</td>
        <td class="text-xs-right">{{ props.item.metadata.creationTime }}</td>
        <td>
          <v-menu bottom offset-y>
            <v-icon slot="activator" style="font-size: 1rem;">fas fa-ellipsis-v</v-icon>
            <v-list>
              <v-list-tile v-for="(item, i) in items" :key="i">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>

    <!-- <button @click="deleteUser(props.item.uid, props.index)">delete</button>
    <button @click="">edit</button> -->
    <v-btn @click="searchItem()">불러오기</v-btn>

  </v-container>
</template>

<script>
export default {
  name: 'adminuser',
  components: {
  },
  data () {
    return {
      headers: [
        {
          text: 'UserName',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { 
          text: 'Email',
          sortable: false,
          value: 'calories'
        },
        {
          text: 'EmailVerified',
          sortable: false,
          value: 'fat'
        },
        { 
          text: 'Disabled',
          sortable: false,
          value: 'carbs'
        },
        { 
          text: 'lastSign',
          sortable: false,
          value: 'protein'
        },
        { 
          text: 'creation',
          sortable: false,
          value: 'iron'
        },
        { 
          text: 'apiCall',
          sortable: false,
          value: 'iron'
        }
      ],
      items: [
        {
          title: 'edit'
        },
        {
          title: 'delete'
        },
        {
          title: 'disabled'
        }
      ],
      users: []
    }
  },
  methods: {
    searchItem: function() {
      this.$http.get("http://localhost:3000/api/users")
        .then((result) => {
          this.users = result.data
        })
    },
    deleteUser: function(uid, index) {
      let _this = this
      this.$http.post("http://localhost:3000/api/users", { user: uid })
        .then((result) => {
        })
        .then(
          _this.users.splice(index, 1)
        )
    }
  }
}
</script>

<style scoped>
  
</style>

