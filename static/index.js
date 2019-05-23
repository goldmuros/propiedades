const home = { 
  template: `
    <v-parallax src="http://cdn28.us1.fansshare.com/photograph/miniaturemodels/miniature-model-home-sitting-on-laptop-keyboard-real-estate-on-the-internet-concept-wallpaper-1514417922.jpg">
      <v-container grid-list-md>
        <v-layout column align-center justify-center class="white--text">
          <h1 class="mb-2 display-1 text-xs-center">Properati</h1>
          <h2 class="mb-2 display-4 text-xs-center"> It's awsomeee</h2>
          <div class="subheading mb-3 text-xs-center">Powered by Group 4</div>
        </v-layout>
      </v-container>
    </v-parallax>
  `
}

const modelos = {
  template: `
    <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" class="text-md-center">
      <v-container grid-list-md>
        <v-layout column align-center justify-center class="white--text">
          <h1>Selecione un modelo para entrenar</h1>
        </v-layout>
        
        <v-select :items="items" label="Modelos" solo v-model="modelo"></v-select>
        <v-btn large color="primary" @click="fitear">Fitear</v-btn>

        <div class="text-xs-center" v-if="progreso">
          <v-progress-circular :size="80" indeterminate color="white"></v-progress-circular>
        </div>
      </v-container>
      <v-dialog v-model="dialogResultado" width="200">
        <v-card>
          <v-card-text class="text-xs-center display-4 headline font-weight-bold">
            {{ resultado }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-parallax>
  `,
  data () {
    return {
      items: ['Regresión Lineal', 'Lasso', 'Ridge'],
      modelo: '',
      dialogResultado: false,
      resultado: [],
      progreso: false
    }
  },
  methods: {
    fitear () {
      this.dialogResultado = false
      if (this.modelo === 'Regresión Lineal')
        this.modelo = 'RegresionLineal'

      let datos = {'modelo': this.modelo}

      this.progreso = true
      self = this
      axios.post('/modelo',datos).then(function (response) {
        self.progreso = false
        self.dialogResultado = true
        self.resultado = response.data.result
      });
    }
  }
}

const testing = { 
  template: `
    <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" class="text-md-center">
      <v-container grid-list-md>
        <v-layout column align-center class="white--text">
          <h1>Ingrese un archivo con datos</h1>
        </v-layout>
        
        <form id="upload_form" class="pt-2" role="form" enctype="multipart/form-data" method="POST">
          <input type="file" name="file" id="file" color="primary" style='width: 70%;'>
          <v-btn large color="primary" @click="upload">upload</v-btn>
        </form>
        
        <div class="text-xs-center" v-if="progreso">
          <v-progress-circular :size="80" indeterminate color="white"></v-progress-circular>
        </div>
      </v-container>

      <v-dialog v-model="dialogResultado" width="200">
        <v-card>
          <v-card-text class="text-xs-center display-4 headline font-weight-bold">
            {{ resultado }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-parallax>
  `,
  data () {
    return {
      progreso: false,
      dialogResultado: false,
      resultado: '',
      file: null
    }
  },
  methods: {
    upload(){
      let datos = new FormData()
      datos.append('file', document.getElementById('file').files[0])

      this.progreso = true
      self = this
      axios.post('/testing',datos).then(function (response) {
        self.progreso = false
        self. dialogResultado = true
        self.resultado = response.data.result
      });
    }
  }
}

const produccion = {
  template: `
    <v-card dark color="primary">
      <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" class="text-md-center">
        <v-container grid-list-md>
          <v-layout column align-center class="white--text">
            <h1>Selecione un modelo para entrenar</h1>
          </v-layout>
          <v-form ref="form" lazy-validation>
            <v-container grid-list-md>
              <v-layout>
                <v-flex md3>
                  <v-select 
                    color="white"
                    v-model="barrio"
                    :items="barrios"
                    label="Barrios"
                    :rules="[v => !!v || 'Elija un Barrio!!!!']">
                  </v-select>
                </v-flex>
                <v-flex md3>
                  <v-text-field 
                    color="white"
                    v-model="sup_total"
                    label="Superficie Total"
                    :rules="[v => (v && v.length > 0) || 'Ingrese un número!!!!']"
                  ></v-text-field>
                </v-flex>
                <v-flex md3>
                  <v-text-field
                    color="white"
                    v-model="sup_cub"
                    label="Superficie Cubierta"
                    :rules="[v => (v && v.length > 0) || 'Ingrese un número!!!!']"
                  ></v-text-field>
                </v-flex>
                <v-flex md3>
                  <v-text-field
                    color="white"
                    v-model="precio_total"
                    label="Precio Total"
                    :rules=" [v => (v && v.length > 0) || 'Ingrese un número!!!!']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex md4>
                  <v-checkbox color="white" v-model="garage" label="Garage"></v-checkbox>
                </v-flex>
                <v-flex md4>
                  <v-checkbox color="white" v-model="pileta" label="Pileta"></v-checkbox>
                </v-flex>
                <v-flex md4>
                  <v-checkbox color="white" v-model="parrilla" label="Parrilla"></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>

            <v-btn large class="primary" :disabled="!form" @click="predict">Estimar</v-btn>
            <v-btn large @click="clear">Limpiar</v-btn>
          </v-form>

          <div class="text-xs-center" v-if="progreso">
            <v-progress-circular :size="80" indeterminate color="white"></v-progress-circular>
          </div>
        </v-container>
      </v-parallax>
      <v-dialog v-model="dialogResultado" width="200">
        <v-card>
          <v-card-text class="text-xs-center display-4 headline font-weight-bold">
            {{ resultado }}
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  `,
  data () {
    return {
      barrios: ['Almagro', 'Barrio Norte', 'Belgrano', 'Caballito', 'Flores', 'Palermo', 'Recoleta', 'San Telmo', 'Villa Crespo', 'Villa Urquiza'],
      barrio: '',
      sup_total: '',
      sup_cub: '',
      precio_total: '',
      garage: false,
      pileta: false,
      parrilla: false,
      dialogResultado: false,
      resultado: '',
      progreso: false,
      form: false,
      rules: {
        length: len => v => (v || '').length == len || `Ingrese un valor`,
        barrio: v => (v || '').length == 0 || `Seleccione un Barrio`,
        numero: v => (v || '').match(/^(?=.*\d).+$/) || 'Ingrese un número'
      }
    }
  },
  methods: {
    predict () {
      this.dialogResultado = false

      let datos = {
        'almagro': 0,
        'barrio_norte': 0,
        'belgrano': 0,
        'caballito': 0,
        'flores': 0,
        'palermo': 0,
        'recoleta': 0,
        'san_telmo': 0,
        'villa_crespo': 0,
        'villa_urquiza': 0,

        'sup_total': this.sup_total,
        'sup_cub': this.sup_cub,
        'precio_total': this.precio_total,
        'garage': ((this.garage)? 1 : 0),
        'pileta': ((this.pileta)? 1 : 0),
        'parrilla': ((this.parrilla)? 1 : 0)
      }

      switch (this.barrio) {
        case 'Almagro':
          datos.almagro = 1
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0

          break
        case 'Barrio Norte':
          datos.almagro = 0
          datos.barrio_norte = 1
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0

          break
        case 'Belgrano':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 1
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
          break
        case 'Caballito':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 1
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
          break
        case 'Flores':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 1
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
          break
        case 'Palermo':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 1
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
          break
        case 'Recoleta':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 1
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
            break
        case 'San Telmo':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 1
          datos.villa_crespo = 0
          datos.villa_urquiza = 0
          
          break
        case 'Villa Crespo':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 1
          datos.villa_urquiza = 0
          
          break
        case 'Villa Urquiza':
          datos.almagro = 0
          datos.barrio_norte = 0
          datos.belgrano = 0
          datos.caballito = 0
          datos.flores = 0
          datos.palermo = 0
          datos.recoleta = 0
          datos.san_telmo = 0
          datos.villa_crespo = 0
          datos.villa_urquiza = 1
          
          break
      }    

      this.progreso = true
      self = this
      axios.post('/produccion',datos).then(function (response) {
        self.progreso = false
        self.dialogResultado = true
        self.resultado = response.data.result
      });
    },
    clear () {
      this.barrio = ''
      this.sup_total = ''
      this.sup_cub = ''
      this.precio_total = ''
      this.garage = false
      this.pileta = false
      this.parrilla = false

    }
  }
}

/* Router and App setup: */
var routes = [{
  path: '/',
  name: 'home',
  component: home
},
{
  path: '/modelos',
  name: 'modelos',
  component: modelos,
  // children: [{
  //   path: 'user/:userId',
  //   name: 'named_id',
  //   components: { user_details: User, sidebar: Sidebar },
  //   props: { user_details: true, sidebar: false }
  // }]
},
{
  path: '/testing',
  name: 'testing',
  component: testing,
},
{
  path: '/produccion',
  name: 'produccion',
  component: produccion,
}];

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: '#app',
  router,
  components: {
    home,
    modelos,
    testing,
    produccion
  }
})
