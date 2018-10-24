<template>
  <v-app>
    <v-navigation-drawer
      fixed
      :clipped="clipped"
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile 
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <!-- <v-slide-y-transition mode="out-in"> -->
          <v-layout row wrap>
            <v-flex xs8 offset-xs2>
              <v-form>
                <v-text-field
                  v-model="newUser.name"
                  :counter="10"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newUser.email"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-btn @click="clear">clear</v-btn>
                <v-btn @click="submitUser">submit</v-btn>
              </v-form>
            </v-flex>
          </v-layout>
        <!-- </v-slide-y-transition> -->
          <v-layout row wrap>
            <v-flex xs8 offset-xs2>
              <v-data-table
                :headers="headers"
                :items="dataUser"
                class="elevation-1"
              ><template slot="items" slot-scope="props">
                  <td class="text-xs-left">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.email }}</td>
                  <td class="text-xs-right">
                    <v-dialog v-model="dialog" persistent max-width="500px">
                          <v-btn slot="activator"
                          color="primary"
                          fab small dark
                          @click="editUserToggle(props.item)">
                            <v-icon>edit</v-icon>
                          </v-btn>
                          <v-card>
                            <v-card-title>
                              <span class="headline">User Profile</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container grid-list-md>
                                <v-layout wrap>
                                  <v-flex xs12>
                                    <v-text-field
                                    v-model="updateUser.name"
                                    label="Name" required
                                    ></v-text-field>
                                  </v-flex>
                                  <v-flex xs12>
                                    <v-text-field
                                    v-model="updateUser.email" 
                                    label="Email" required
                                    ></v-text-field>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                              color="blue darken-1"
                              flat
                              @click.native="dialog = false"
                              >Close
                              </v-btn>
                              <v-btn
                              color="blue darken-1"
                              flat
                              @click.native="editUser(props.item.id)"
                              >Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                    <v-btn
                    color="red" 
                    fab small dark
                    @click="deleteUser(props.item.id)">
                      <v-icon>remove</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
      </v-container>
    </v-content>
    <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
const uuid = require('uuid')

  export default {
    created () {
      axios.get('http://localhost:5002/api/user')
        .then(res => {
          this.dataUser = res.data
        })
    },
    data () {
      return {
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'E-mail', value: 'email', align: 'center' },
          { text: '' }
        ],
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'bubble_chart', title: 'Inspire' }
        ],
        right: false,
        rightDrawer: false,
        title: 'Vuetify.js',
        dialog: false,
        newUser: {
          id: '',
          name: '',
          email: ''
        },
        updateUser: {
          id: '',
          name: '',
          email: ''
        },
        dataUser: []
      }
    },
    methods: {
      submitUser () {
        let user = {
          id: uuid(),
          name: this.newUser.name,
          email: this.newUser.email
        }
        axios.post('http://localhost:5002/api/user', user) 
        // console.log(user)
          .then(res => {
            this.dataUser = res.data
          })
          this.newUser.name = ''
          this.newUser.email = ''
      },
      editUserToggle (item) {
        this.dialog = true
        // console.log(item)
        this.updateUser.id = item.id
        this.updateUser.name = item.name
        this.updateUser.email = item.email
      },
      editUser () {
        this.dialog = false
        axios.post('http://localhost:5002/api/edituser', this.updateUser)
          .then (res => {
            this.dataUser = res.data
            console.log(res)
          })
      },
      deleteUser (id) {
        axios.post('http://localhost:5002/api/deleteuser', { id: id })
          .then (res => {
            this.dataUser = res.data
          })
      },
      clear () {
        this.newUser.name = ''
        this.newUser.email = ''
      }
    }
  }
</script>
