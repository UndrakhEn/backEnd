module.exports = {
  SUCCESS: data => {
    return {
      code: 200,
      message: 'Амжилттай.',
      result: data
    };
  },
  TOKEN_ERROR: {
    code: 407,
    status: 'error',
    message: 'Алдаатай токен.'
  },
  NOT_FOUND: {
    code: 404,
    status: 'error',
    message: 'Мэдээлэл олдсонгүй.'
  },
  ERROR: {
    code: 500,
    status: 'error',
    message: 'Сервэрийн алдаа.'
  },
  PARAMETR_ERROR: {
    code: 400,
    status: 'error',
    message: 'Параметрүүд алдаатай.'
  }
};
