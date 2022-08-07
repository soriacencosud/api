const respondWithInvalidRequest = (res, e, status=400) => {
  return res.status(status).json({
    status,
    error: e,
  })
}

const respondWithInternalError = (e, res, status=500) => {
  console.log(e)
  return res.status(status).send({
    message: 'Ha ocurrido un error.'
  })
}

module.exports = {
  respondWithInvalidRequest,
  respondWithInternalError
}
