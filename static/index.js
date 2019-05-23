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

const about = { 
  template: `
    <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-container grid-list-md>
        <v-layout column align-center justify-center class="white--text">
          <h1 class="mb-2 display-4 text-xs-center">Grupo 4</h1>
        <v-layout>
        <v-layout class="white--text">
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/Picture1.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-2 text-xs-center">Verónica Ainsa</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/Picture2.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-4 text-xs-center">Esteban Gold</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/Picture3.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-2 text-xs-center">Hugo Giusti</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/Picture4.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-4 text-xs-center">Jesús Lasserre</h3>
              </v-layout>
            </v-container>
          </v-flex>
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
      <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="650" class="text-md-center">
        <v-container grid-list-md>
          <v-layout column align-center class="white--text">
            <h1>Selecione un modelo para entrenar</h1>
          </v-layout>
          <form>
            <v-container grid-list-md>
              <v-card dark elevation="4" color="transparent">
                <v-layout align-center class="white--text">
                  <v-flex md4>
                    <v-select 
                      color="white"
                      v-model="barrio"
                      :items="barrios"
                      label="Barrios"
                    ></v-select>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field 
                      color="white"
                      v-model="sup_total"
                      label="Superficie Total"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="sup_cub"
                      label="Superficie Cubierta"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="precio_total_usd"
                      label="Precio Total en USD"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="precio_metro_usd"
                      label="Precio Metro^2 en USD"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="habitaciones"
                      label="Habitaciones"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-card dark elevation="4" color="transparent" class='mt-3'>
                <v-layout align-center class="white--text">
                  <v-flex md2>
                    <v-checkbox color="white" v-model="parrilla" label="Parrilla"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="gimnasio" label="Gimnasio"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="sum" label="Sum"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="pileta" label="Pileta"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="hidromasaje" label="Hidromasaje"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="vigilancia" label="Vigilancia"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2>
                    <v-checkbox color="white" v-model="playrooom" label="Playrooom"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="cancha" label="Cancha"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="solarium" label="Solarium"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="al_frente" label="Al Frente"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="nuevo" label="Nuevo"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="lavadero" label="Lavadero"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2>
                    <v-checkbox color="white" v-model="aire" label="AA"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="calefaccion" label="Calefaccion"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="luminoso" label="Luminoso"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="garage" label="Garage"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="balcon" label="Balcon"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                    <v-checkbox color="white" v-model="baulera" label="Baulera"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2>
                    <v-checkbox color="white" v-model="terraza" label="Terraza"></v-checkbox>
                  </v-flex>
                  <v-flex md10>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-container>

            <v-btn large class="primary" :disabled="form" @click="predict">Estimar</v-btn>
            <v-btn large @click="clear">Limpiar</v-btn>
          </form>

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
      // Parametros para el modelo
      precio_total_usd: '',
      sup_total: '',
      sup_cub: '',
      precio_metro_usd: '',
      habitaciones: '',
      parrilla: true,
      gimnasio: true,
      sum: true,
      pileta: true,
      hidromasaje: true,
      vigilancia: true,
      playrooom: true,
      cancha: true,
      solarium: true,
      al_frente: true,
      nuevo: true,
      lavadero: true,
      aire: true,
      calefaccion: true,
      luminoso: true,
      garage: true,
      balcon: true,
      baulera: true,
      terraza: true,
      //Parametros UI
      barrios: ['Almagro', 'Barrio Norte', 'Belgrano', 'Caballito', 'Flores', 'Palermo', 'Recoleta', 'San Telmo', 'Villa Crespo', 'Villa Urquiza'],
      barrio: '',
      dialogResultado: false,
      resultado: '',
      progreso: false
    }
  },
  computed: {
    form () {
      if (this.precio_total_usd.length > 0 && this.sup_total.length > 0 && this.sup_cub.length > 0 && 
          this.precio_metro_usd.length > 0 && this.habitaciones.length > 0 && this.barrio.length > 0)
        return false
      else
        return true
    }
  },
  methods: {
    predict () {
      this.dialogResultado = false

      let datos = {
        'precio_total_usd': this.precio_total_usd,
        'sup_total': this.sup_total,
        'sup_cub': this.sup_cub,
        'precio_metro_usd': this.precio_metro_usd,
        'habitaciones': this.habitaciones,
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
        'parrilla': ((this.parrilla)? 1 : 0),
        'gimnasio': ((this.gimnasio)? 1 : 0),
        'sum': ((this.sum)? 1 : 0),
        'pileta': ((this.pileta)? 1 : 0),
        'hidromasaje': ((this.hidromasaje)? 1 : 0),
        'vigilancia': ((this.vigilancia)? 1 : 0),
        'playrooom': ((this.playrooom)? 1 : 0),
        'cancha': ((this.cancha)? 1 : 0),
        'solarium': ((this.solarium)? 1 : 0),
        'al_frente': ((this.al_frente)? 1 : 0),
        'nuevo': ((this.nuevo)? 1 : 0),
        'lavadero': ((this.lavadero)? 1 : 0),
        'aire': ((this.aire)? 1 : 0),
        'calefaccion': ((this.calefaccion)? 1 : 0),
        'luminoso': ((this.luminoso)? 1 : 0),
        'garage': ((this.garage)? 1 : 0),
        'balcon': ((this.balcon)? 1 : 0),
        'baulera': ((this.baulera)? 1 : 0),
        'terraza': ((this.terraza)? 1 : 0)
      }

      switch (this.barrio) {
        case 'Almagro':
          datos.almagro = 1
          break
        case 'Barrio Norte':
          datos.barrio_norte = 1
          break
        case 'Belgrano':
          datos.belgrano = 1        
          break
        case 'Caballito':
          datos.caballito = 1
          break
        case 'Flores':
          datos.flores = 1
          break
        case 'Palermo':
          datos.palermo = 1
          break
        case 'Recoleta':
          datos.recoleta = 1
            break
        case 'San Telmo':
          datos.san_telmo = 1
          break
        case 'Villa Crespo':
          datos.villa_crespo = 1
          break
        case 'Villa Urquiza':
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
      //Textfields
      this.barrio = ''
      this.sup_total = ''
      this.sup_cub = ''
      this.precio_total = ''
      this.precio_total_usd = ''
      this.precio_metro_usd = ''
      this.habitaciones = ''
      
      //Checks
      this.garage = true
      this.pileta = true
      this.parrilla = true
      this.gimnasio = true
      this.sum = true
      this.pileta = true
      this.hidromasaje = true
      this.vigilancia = true
      this.playrooom = true
      this.cancha = true
      this.solarium = true
      this.al_frente = true
      this.nuevo = true
      this.lavadero = true
      this.aire = true
      this.calefaccion = true
      this.luminoso = true
      this.garage = true
      this.balcon = true
      this.baulera = true
      this.terraza = true
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
},
{
  path: '/about',
  name: 'about',
  component: about,
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
