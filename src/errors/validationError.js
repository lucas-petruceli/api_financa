// eslint-disable-next-line no-undef
module.exports = function validationError(msg)
{
    this.name = 'validationError'
    this.message = msg
}