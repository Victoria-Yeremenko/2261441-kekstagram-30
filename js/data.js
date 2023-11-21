const ERROR_MESSAGE_TIMEOUT = 5000;

const body = document.querySelector('body');
const dataErrorTemplate = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

const showLoadError = () => {
  const loadErrorMessage = dataErrorTemplate.cloneNode(true);
  body.append(loadErrorMessage);
  setTimeout(() => loadErrorMessage.remove(), ERROR_MESSAGE_TIMEOUT);
};

//Получение данных от сервера
const getData = (onSuccess, onError) => () => fetch(
  'https://30.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((err) => {
    onError(err);
  });

// Отправка данных на сервер
const sendData = (onSuccess, onFail, dataBody) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: dataBody
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getData, showLoadError, sendData };
