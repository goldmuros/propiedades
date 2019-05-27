const home = { 
  template: `
    <v-parallax src="http://cdn28.us1.fansshare.com/photograph/miniaturemodels/miniature-model-home-sitting-on-laptop-keyboard-real-estate-on-the-internet-concept-wallpaper-1514417922.jpg">
      <v-container grid-list-md>
        <v-layout column align-center justify-center class="white--text">
          <h1 class="mb-2 display-3 text-xs-center">Properati</h1>
          <h2 class="mb-2 display-4 text-xs-center"> It's awesomeee</h2>
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
                <v-img src="../static/imagenes/Picture1.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-2 text-xs-center">Verónica</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/imagenes/Picture2.png"></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-4 text-xs-center">Esteban</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/imagenes/Picture3.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-2 text-xs-center">Hugo</h3>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex md3>
            <v-container grid-list-md>
              <v-layout>
                <v-img src="../static/imagenes/Picture4.png" ></v-img>
              </v-layout>
              <v-layout justify-center>
                <h3 class="mt-4 text-xs-center">Jesús</h3>
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
    <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" class="text-md-center" height="850">
      <v-container grid-list-md>
        <v-layout column align-center justify-center class="white--text">
          <h1>Entrenemos los modelos (Linear Regression, Lasso y Ridge)</h1>

          <form id="model_form" class="pt-2" role="form" enctype="multipart/form-data" method="POST">
            <v-container grid-list-md>
              <v-layout>
                <v-flex md3>
                  <v-select :items="pruebas" label="Pruebas" solo v-model="prueba"></v-select>
                </v-flex>
                <v-flex md6>
                  <input type="file" name="file" id="file_modelos" color="primary" style='width: 100%;'>
                </v-flex>
                <v-flex md3>
                  <v-btn large color="primary" @click="fitear">
                    <v-icon left>fitness_center</v-icon> Entrenar
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </form>
          <div class="text-xs-center" v-if="progreso">
            <v-progress-circular :size="80" indeterminate color="white"></v-progress-circular>
          </div>
        </v-layout>
        <v-layout column align-center justify-center class="white--text" v-if="showModelos"
          color="transparent">
          <h2 class="mdisplay-2 text-xs-center">Linear Regression</h2>
          <v-data-table
            :headers="cabecera_linear_regression"
            :items="resultado_linear_regression"
            class="elevation-1"
            hide-actions
            dark
          >
            <template v-slot:items="props">
              <td class="text-xs-right">{{ props.item.intercept_ }}</td>
              <td class="text-xs-right">{{ props.item.score }}</td>
              <td class="text-xs-right">{{ props.item.r2 }}</td>
              <td class="text-xs-right">{{ props.item.mae }}</td>
              <td class="text-xs-right">{{ props.item.mse }}</td>
              <td class="text-xs-right">{{ props.item.rmse }}</td>
            </template>
          </v-data-table>
          <h2 class="mdisplay-2 text-xs-center">Lasso</h2>
          <v-data-table
            :headers="cabecera"
            :items="resultado_lasso"
            class="elevation-1"
            hide-actions
            dark
          >
            <template v-slot:items="props">
              <tr @click="openDialog('Lasso')">
                <td class="text-xs-right">{{ props.item.intercept_ }}</td>
                <td class="text-xs-right">{{ props.item.score }}
                <td class="text-xs-right">{{ props.item.r2 }}</td>
                <td class="text-xs-right">{{ props.item.mae }}</td>
                <td class="text-xs-right">{{ props.item.mse }}</td>
                <td class="text-xs-right">{{ props.item.rmse }}</td>
                <td class="text-xs-right">{{ props.item.alpha }}</td>
              </tr>
            </template>
          </v-data-table>
          <h2 class="mdisplay-2 text-xs-center">Ridge</h2>
          <v-data-table
            :headers="cabecera"
            :items="resultado_ridge"
            class="elevation-1"
            hide-actions
            dark
          >
            <template v-slot:items="props">
              <tr @click="openDialog('Ridge')">
                <td class="text-xs-right">{{ props.item.intercept_ }}</td>
                <td class="text-xs-right">{{ props.item.score }}
                <td class="text-xs-right">{{ props.item.r2 }}</td>
                <td class="text-xs-right">{{ props.item.mae }}</td>
                <td class="text-xs-right">{{ props.item.mse }}</td>
                <td class="text-xs-right">{{ props.item.rmse }}</td>
                <td class="text-xs-right">{{ props.item.alpha }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
      </v-container>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title primary-title>
            <h1> {{ modelo }} </h1>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :items="coef"
              class="elevation-1"
              hide-actions
              hide-headers
              dark
            >
              <template v-slot:items="props">
                <td class="text-xs-right">{{ props.item.columna }}</td>
                <td class="text-xs-right">{{ props.item.valor }}</td>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-parallax>
  `,
  data () {
    return {
      dialog: false,
      pruebas: ['Simple', 'Cross Validation'],
      prueba: '',
      cabecera_linear_regression: [
        { text: 'Intercept', align: 'center', value: 'intercept_' },
        { text: 'Score', align: 'center', value: 'score' },
        { text: 'R2', align: 'center', value: 'r2' },
        { text: 'MAE', align: 'center', value: 'mae' },
        { text: 'MSE', align: 'center', value: 'mse' },
        { text: 'RMSE', align: 'center', value: 'rmse' }
      ],
      cabecera: [
        { text: 'Intercept', align: 'center', value: 'intercept_' },
        { text: 'Score', align: 'center', value: 'score' },
        { text: 'R2', align: 'center', value: 'r2' },
        { text: 'MAE', align: 'center', value: 'mae' },
        { text: 'MSE', align: 'center', value: 'mse' },
        { text: 'RMSE', align: 'center', value: 'rmse' },
        { text: 'Alpha', align: 'center', value: 'alpha' }
      ],
      showModelos: false,
      resultado_linear_regression: [],
      resultado_lasso: [],
      resultado_ridge: [],
      coef: [],
      modelo: '',
      progreso: false
    }
  },
  methods: {
    openDialog(nombre_modelo) {
      this.dialog = true
      this.modelo = nombre_modelo
      this.coef = []

      if (nombre_modelo === 'Lasso')
        sCoef = JSON.stringify(this.resultado_lasso[0].coef).substring(1,JSON.stringify(this.resultado_lasso[0].coef).length - 1)//Lasso
      else
        sCoef = JSON.stringify(this.resultado_ridge[0].coef).substring(1,JSON.stringify(this.resultado_ridge[0].coef).length - 1)//Ridge

      aCoef = sCoef.split(',')
      for(i= 0; i < aCoef.length; i++){
        dato = aCoef[i].split(':')
        this.coef.push({'columna': dato[0].split('"').join(''), 'valor': dato[1]}) 
      }
    },
    fitear () {
      this.dialogResultado = false
      this.showModelos = false
      this.resultados = []

      if (this.prueba === 'Cross Validation')
        this.prueba = 'CV'
        
      let datos = new FormData()
      datos.append('file', document.getElementById('file_modelos').files[0])
      datos.append('test', this.prueba)

      this.progreso = true
      self = this
      axios.post('/modelo',datos).then(function (response) {
        self.progreso = false
        
        self.resultado_lasso = [{
          'intercept_': response.data.result.Lasso.intercept,
          'score': response.data.result.Lasso.score,
          'r2': response.data.result.Lasso.r2,
          'mae': response.data.result.Lasso.mae,
          'mse': response.data.result.Lasso.mse,
          'rmse': response.data.result.Lasso.rmse,
          'alpha': response.data.result.Lasso.alpha,
          'coef': response.data.result.Lasso.coef,
        }]

        self.resultado_ridge = [{
          'intercept_': response.data.result.Ridge.intercept,
          'score': response.data.result.Ridge.score,
          'r2': response.data.result.Ridge.r2,
          'mae': response.data.result.Ridge.mae,
          'mse': response.data.result.Ridge.mse,
          'rmse': response.data.result.Ridge.rmse,
          'alpha': response.data.result.Ridge.alpha,
          'coef': response.data.result.Ridge.coef,
        }]

        self.resultado_linear_regression = [{
          'intercept_': response.data.result.LinearRegression.intercept,
          'score': response.data.result.LinearRegression.score,
          'r2': response.data.result.LinearRegression.r2,
          'mae': response.data.result.LinearRegression.mae,
          'mse': response.data.result.LinearRegression.mse,
          'rmse': response.data.result.LinearRegression.rmse
        }]

        self.showModelos = true
      });
    }
  }
}

const produccion = {
  template: `
    <v-card color="primary">
      <v-parallax src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="720" class="text-md-center">
        <v-container >
          <v-layout column align-center class="white--text">
            <v-select :items="modelos" label="Modelos" solo v-model="modelo"></v-select>
            <form>
              <v-card dark elevation="4" color="transparent" class="pl-4 pr-4">
                <v-layout align-center class="white--text">
                  <v-flex md4 class="mr-2">
                    
                  </v-flex>
                  <v-flex md4 class="mr-2">
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
                  <v-flex md4 class="mr-2">
                    <v-text-field
                      color="white"
                      v-model="precio_total_usd"
                      label="Precio Total en USD"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4 class="mr-2">
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
                <v-layout>
                  <v-flex md4 class="mr-2">
                    <v-text-field
                      color="white"
                      v-model="bus_stop"
                      label="Paradas de Colectivos"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4 class="mr-2">
                    <v-text-field
                      color="white"
                      v-model="subway"
                      label="Subte"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="park"
                      label="Parques"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout>
                  <v-flex md4 class="mr-2">
                    <v-text-field
                      color="white"
                      v-model="school"
                      label="Escuelas"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4 class="mr-2">
                    <v-text-field
                      color="white"
                      v-model="police"
                      label="Estaciones de Policia"
                    ></v-text-field>
                  </v-flex>
                  <v-flex md4>
                    <v-text-field
                      color="white"
                      v-model="hospital"
                      label="Hospital"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-card>
              <v-card dark elevation="4" color="transparent" class="mt-3 pl-5">
                <v-layout align-center class="white--text">
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="parrilla" label="Parrilla"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-3">
                    <v-checkbox color="white" v-model="gimnasio" label="Gimnasio"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-1">
                    <v-checkbox color="white" v-model="sum" label="Sum"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-4">
                    <v-checkbox color="white" v-model="pileta" label="Pileta"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="hidromasaje" label="Hidromasaje"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="vigilancia" label="Vigilancia"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-3 ">
                    <v-checkbox color="white" v-model="playrooom" label="Playrooom"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-1">
                    <v-checkbox color="white" v-model="cancha" label="Cancha"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-4">
                    <v-checkbox color="white" v-model="solarium" label="Solarium"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="al_frente" label="Al Frente"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="nuevo" label="Nuevo"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-3">
                    <v-checkbox color="white" v-model="lavadero" label="Lavadero"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-1">
                    <v-checkbox color="white" v-model="aire" label="AA"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-4">
                    <v-checkbox color="white" v-model="calefaccion" label="Calefaccion"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="luminoso" label="Luminoso"></v-checkbox>
                  </v-flex>
                </v-layout>
                <v-layout align-center class="white--text">
                  <v-flex md2 class="mr-2">
                    <v-checkbox color="white" v-model="garage" label="Garage"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-3">
                    <v-checkbox color="white" v-model="balcon" label="Balcon"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-1">
                    <v-checkbox color="white" v-model="baulera" label="Baulera"></v-checkbox>
                  </v-flex>
                  <v-flex md2 class="mr-4">
                    <v-checkbox color="white" v-model="terraza" label="Terraza"></v-checkbox>
                  </v-flex>
                  <v-flex md2>
                  </v-flex>
                </v-layout>
              </v-card>

              <v-btn large class="primary mt-3" :disabled="form" @click="predict">Estimar</v-btn>
              <v-btn large class="mt-3" @click="clear">Limpiar</v-btn>
            </form>
          </v-layout>
        </v-container>
      </v-parallax>
      <v-dialog v-model="dialogResultado" width="500">
        <v-data-table
          :headers="cabecera"
          :items="resultado"
          class="elevation-1"
          hide-actions
          dark
        >
          <template v-slot:items="props" class="display-3">
            <td>{{ props.item.model }}</td>
            <td class="text-xs-right">{{ props.item.predic }}</td>
          </template>
        </v-data-table>
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
      bus_stop: '',
      subway: '',
      park: '',
      school: '',
      police: '',
      hospital: '',
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
      dialogResultado: false,
      resultado: [],
      cabecera: [
        { text: 'Modelo', align: 'left', sortable: false, value: 'model'},
        { text: 'Predic', align: 'center', sortable: false, value: 'predic' }
      ],
      modelos: ['Linear Regression', 'Lasso', 'Ridge'],
      modelo: ''
    }
  },
  computed: {
    form () {
      if (this.precio_total_usd.length > 0 && this.sup_total.length > 0 && this.sup_cub.length > 0 && 
          this.precio_metro_usd.length > 0 && this.habitaciones.length > 0 &&
          this.bus_stop.length > 0 && this.subway.length > 0 && this.park.length > 0 && 
          this.school.length > 0 && this.police.length > 0 && this.hospital.length > 0 &&
          this.modelo.length > 0)
        return false
      else
        return true
    }
  },
  methods: {
    predict () {
      this.dialogResultado = false

      let modelo = ''
      switch (this.modelo) {
        case 'Linear Regression':
          modelo = 'lr'
          break
        case 'Lasso':
          modelo = 'lasso'
          break
        case 'Ridge':
          modelo = 'ridge'
          break
      }

      let datos = {
        'model': modelo,
        'precio_total_usd': this.precio_total_usd,
        'sup_total': this.sup_total,
        'sup_cub': this.sup_cub,
        'precio_metro_usd': this.precio_metro_usd,
        'habitaciones': this.habitaciones,
        'bus_stop': this.bus_stop,
        'subway': this.subway,
        'park': this.park,
        'school': this.school,
        'police': this.police,
        'hospital': this.hospital,
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

      self = this
      axios.post('/produccion',datos).then(function (response) {
        self.resultado = []

        let modelo = ''
        switch (response.data.result.model) {
          case 'lr':
            modelo = 'Linear Regression'
            break
          case 'lasso':
            modelo = 'Lasso'
            break
          case 'ridge':
            modelo = 'Ridge'
            break
        }

        self.resultado.push({
          'model': modelo,
          'predic': response.data.result.predic[0]
        })
        self.dialogResultado = true
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
      this.bus_stop = ''
      this.subway = ''
      this.park = ''
      this.school = ''
      this.police = ''
      this.hospital = ''
      
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
  component: modelos
},
{
  path: '/produccion',
  name: 'produccion',
  component: produccion
},
{
  path: '/about',
  name: 'about',
  component: about
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
    produccion
  }
})
