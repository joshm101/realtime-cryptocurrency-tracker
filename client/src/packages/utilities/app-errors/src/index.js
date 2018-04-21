import ErrorEnum from 'error-enum';

const networkConnectionDisplayMessage = 'The request failed because ' +
'of a network connectivity error. Check your connection and try again.';

const noCurrencyPairsSpecifiedDisplayMessage = 'The connection could not be ' +
'opened because no currency pairs were specified for tracking.';

const AppErrors = {
  [ErrorEnum.NO_CONNECTION]: {
    displayMessage: networkConnectionDisplayMessage,
    errorCode: ErrorEnum.NO_CONNECTION,
  },
  [ErrorEnum.NO_CURRENCY_PAIRS_SPECIFIED]: {
    displayMessage: noCurrencyPairsSpecifiedDisplayMessage,
    errorCode: ErrorEnum.NO_CURRENCY_PAIRS_SPECIFIED,
  }
}

export default AppErrors;