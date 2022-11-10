
const handlerCheck = (e, setData, data) => {
  if (e.target.checked) {
    setData({
      ...data,
      [e.target.name]: e.target.id
    })
  }
};

const handlerChange = (e, setData, data) => {
  setData({
    ...data,
    [e.target.name]: e.target.value
  })
};

const countryChange = (e, setAllCountries, Countries) => {
  let countriesSearch = Countries.filter(ch => ch.name.toLowerCase().indexOf(e.target.value) !== -1)
  setAllCountries(countriesSearch)
};

const saveCountryId = (element, setCountryId, countryId) => {
  let selecCountry = { name: element.name, codeId: element.codeId };
  setCountryId([...countryId, selecCountry])
};

const deleteCountrie = (data, setCountryId, countryId) => {
  setCountryId(countryId.filter(e => e.name !== data.name))
};

const handlerError = (e, setErrorName, setMessageError, setErrorTime, setSendForm) => {
  if (e.target.name === 'touristActivity') {
    if (e.target.value === '') {
      setErrorName(true)
      return setMessageError('Obligatory field')
    }
    if (e.target.value.match('^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$') === null) {
      setErrorName(true)
      return setMessageError('Wrong character')
    }
  }
  if (e.target.name === 'duration') {
    if (e.target.value.length > 4) {
      setErrorTime(true)
      return setMessageError('Too many characters')
    }
    if (e.target.value.length <= 1) {
      setErrorTime(true)
      return setMessageError('Required field, fill in correctly')
    }
  }
  return setSendForm(true)
}

const set = (e, setSendForm, setErrorName, setErrorTime, setRequiredMessage) => {
  if (e.target.name === 'touristActivity') {
    setSendForm(false)
    return setErrorName(false)
  }
  if (e.target.name === 'duration') {
    setSendForm(false)
    return setErrorTime(false)
  }
  if (e.target.name === 'countrySelect') {
    setRequiredMessage(false)
  }
}

export {
  handlerCheck,
  handlerChange,
  countryChange,
  saveCountryId,
  deleteCountrie,
  handlerError,
  set
};
