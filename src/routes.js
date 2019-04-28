import { prepareRoutes } from "@curi/router"

import TemplateMain from './components/template/Main.svelte'

import PhotoCreate from './modules/photo/Create.svelte'
import PhotoFeed from './modules/photo/Feed.svelte'
import PhotoView from './modules/photo/View.svelte'

const routes = [
  {
    name: 'main.index',
    path: '',
    respond: () => ({redirect: { name: 'photo.feed' }})
  },
  {
    name: "photo",
    path: "photo",
    respond: () => ({redirect: { name: 'photo.feed' }}),
    children: [
      {
        name: "photo.feed",
        path: "feed",
        respond: () => ({body: {template: TemplateMain, body: PhotoFeed}})
      },
      {
        name: "photo.create",
        path: "create",
        respond: () => ({body: {template: TemplateMain, body: PhotoCreate}})
      },
      {
        name: "photo.view",
        path: "view/:id",
        respond: () => ({body: {template: TemplateMain, body: PhotoView}})
      }
    ]
  }
]


export default prepareRoutes({ routes })
