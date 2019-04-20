import Vue from "vue"
import App from "./App.vue"
import "normalize.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faCheck)
library.add(faArrowLeft)
library.add(faChevronRight)
library.add(faTimes)

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")
