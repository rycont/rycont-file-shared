import { findUser } from "../drawer";
import { Controller } from "../types";

export const getPublicDirectories: Controller = async (ctx) => {
  const user = findUser()
  const publicDirectories = await user.getPublicDirectoryList()
  // ctx.body = files
  console.log(publicDirectories)
  await ctx.render('list', {
    directories: publicDirectories
  })
}
