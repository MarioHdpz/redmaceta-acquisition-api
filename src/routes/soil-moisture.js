import { createController } from 'awilix-koa'

// This is our API controller.
// All it does is map HTTP calls to service calls.
// This way our services could be used in any type of app, not
// just over HTTP.
const api = soilMoistureService => ({
  createEvent: async ctx =>
    ctx.created(await soilMoistureService.create(ctx.request.body)),
})

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
  .prefix('/soil-moisture')
  .post('', 'createEvent')
