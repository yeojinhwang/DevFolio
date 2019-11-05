<!-- sidebar items -->
    <v-navigation-drawer v-model="Aboutdrawer" fixed left dark>
      <v-list>
        <!-- layout select -->
        <v-list-group
          v-for="item in layoutItems" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="switchCss(item, subItem.value)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            
            <v-list-tile-action v-show="subItem.selected">
              <v-icon small color="green darken-2">fas fa-check</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-group>

        <!-- font select -->
        <v-list-group
          v-for="item in fontItems" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <!-- 패딩조절 -->
          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              <v-slider
                v-model="subItem.value"
                step="1" max="20" min="1"
              ></v-slider>
            </v-list-tile-content>

            

            
            <v-list-tile-action v-show="subItem.selected">
              <v-icon small color="green darken-2">fas fa-check</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-group>

        <!-- theme select -->
        <v-list-group
          v-for="item in themeItems" :key="item.title" v-model="item.active"
          :prepend-icon="item.action" no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>

          <v-list-tile
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="switchTheme(subItem.title)"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            
            <v-list-tile-action v-show="subItem.selected">
              <v-icon small color="green darken-2">fas fa-check</v-icon>
            </v-list-tile-action>

          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>