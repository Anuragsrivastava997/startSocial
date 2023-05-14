const catchAsync = (function_) => {
  return (request, response, next) => {
    function_(request, response, next).catch(next);
  };
};

export default catchAsync;
