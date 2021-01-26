module.exports = () => {
  return (req, res, next) => {
    req.user = {
      sub: 'test'
    };
    next();
  };
};
