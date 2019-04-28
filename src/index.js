import { browser } from "@hickory/browser"
import { createRouter } from "@curi/router"

import 'bulma/css/bulma.min.css'
import './styles/main.css'

import routes from "./routes"
import App from './modules/main/App.svelte'

const router = createRouter(browser, routes)

const app = new App({
  target: document.body,
  props: { router }
})
