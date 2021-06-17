import { ParameterizedContext, Next, DefaultState, Context } from 'koa'
import { IRouterParamContext } from 'koa-router'

export type Controller = (ctx: ParameterizedContext<DefaultState, Context & IRouterParamContext<DefaultState, Context>, any>, next: Next) => unknown;

export interface File {
  id: string;
  bookmarked: boolean;
  chatId: number;
  contentLogId: number;
  drawerId: number;
  joined: boolean;
  createdAt: number;
  updatedAt: number;
  authorId: number;
  contentType: string;
  kageToken: string;
  url: string;
  originalFileName: string;
  mimeType: string;
  size: number;
}

export interface Directory {
  id: string;
  collection: string;
  name: string;
  previewMessage: string;
  url: string;
  mimeType: string;
  extension: string;
  suspected: number;
  count: number;
  size: number;
  createdAt: number;
  processedAt: number;
  updatedAt: number;
  verticalType: string;
}

export interface DownloadableFile extends File {
  downloadableUrl: string;
}
