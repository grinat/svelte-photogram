import {ROOT_API, SCORE_API} from '../config'

export const common = {
  upload: () => `${ROOT_API}v1/upload/file`,
  nsfwScore: () => `${SCORE_API}v1/detect`,
}

export const photo = {
  create: () => `${ROOT_API}v1/sv_photo`,
  view: (id) => `${ROOT_API}v1/sv_photo/${id}`,
  delete: (id) => `${ROOT_API}v1/sv_photo/${id}`,
  feed: (query = {}) => `${ROOT_API}v1/sv_photo?page=${query.page}&per-page=${query['per-page']}&sort=-id`,
}
