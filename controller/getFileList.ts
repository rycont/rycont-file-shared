import { findUser } from "../drawer";
import { Controller } from "../types";

const formatBytes = (bytes: number, digits: number) => {
  if (bytes == 0) return '0 Bytes';
  const unit = 1024,
    digitLength = digits || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    numbers = Math.floor(Math.log(bytes) / Math.log(unit));

  return parseFloat((bytes / Math.pow(unit, numbers)).toFixed(digitLength)) + ' ' + sizes[numbers];
}

export const getPublicFileList: Controller = async (ctx) => {
  const user = findUser()
  const directoryId = ctx.params.directoryId

  const files = (await user.getDirectoryFiles(directoryId)).map(e => ({
    ...e,
    date: (new Date(e.createdAt)).toLocaleDateString(),
    readableFileSize: formatBytes(e.size, 2)
  }))

  const info = await user.getDirectoryInfo(directoryId)

  await ctx.render('files', {
    files,
    info
  })
}
