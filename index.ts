import Koa, { Context, DefaultState } from 'koa'
import Router from 'koa-router'
import views from 'koa-views'
import serve from 'koa-static'
import { downloadFile } from './controller/downloadFile'
import { getPublicFileList } from './controller/getFileList'
import { getFileInfo } from './controller/getFileInfo'
import { login, loginWithEnvInfo } from './controller/login'
import { getPublicDirectories } from './controller/getPublicDirectories'
// import  from "koa";

const app = new Koa()

app.use(serve('./public'));

const rootRouter = new Router<DefaultState, Context>();

const render = views('./view', {
  map: {
    mustache: "mustache"
  },
  extension: "mustache"
})

app.use(render)

rootRouter.get('/login', login)
rootRouter.get('/file/:fileId', getFileInfo)
rootRouter.get('/:directoryId', getPublicFileList)
rootRouter.get('/download/:id', downloadFile)
rootRouter.get('/', getPublicDirectories)

app.use(rootRouter.routes())
app.use(rootRouter.allowedMethods())

const port = process.env['PORT'] || 8080

loginWithEnvInfo().then(() => {
  app.listen(port, () => {
    console.log('Drawer CDN is listening on port ' + port)
  })
})
