import { Drawer } from '../drawer'
import getEnv from '../getEnv';
import { Controller } from '../types';
// import { Context } from 'vm';
import { Context, Next } from 'koa'

export const loginWithEnvInfo = () => new Promise<void>(success => {
  const newUser = new Drawer(
    getEnv('email'),
    getEnv('password'),
    process.env['public_folder'],
    () => {
      newUser.registerToStore()
      success()
    }
  )
})

export const login: Controller = (ctx, next) => {
  loginWithEnvInfo()
  ctx.body = {
    message: 'Successfully Logged in'
  }
}
