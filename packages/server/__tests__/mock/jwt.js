module.exports = () => {
  return (req, res, next) => {
    req.auth = {
      sub: 'test'
    };
    next();
  };
};
