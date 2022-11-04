
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

export {
  handlerCheck,
  handlerChange,
  countryChange,
  saveCountryId,
  deleteCountrie
};
