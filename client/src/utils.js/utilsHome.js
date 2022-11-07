
const handleChange = (ev, setControlSearch, Countries, setAllCountries) => {
  setControlSearch(ev.target.value)
  let countriesSearch = Countries.filter(ch => ch.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1)
  setAllCountries(countriesSearch)
};

const handlerNextPage = (allCountries, itemPerPage, currentPage, setCountriestoShow, setCurrentPage) => {
  const countriesTotal = allCountries.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * itemPerPage;
  if (firstIndex >= countriesTotal) return;

  setCountriestoShow([...allCountries].splice(firstIndex, itemPerPage))
  setCurrentPage(nextPage)
};

const handlerPrevPage = (currentPage, itemPerPage, allCountries, setCountriestoShow, setCurrentPage) => {
  const prevPage = currentPage - 1;
  if (prevPage < 0) return;
  const firstIndex = prevPage * itemPerPage

  setCountriestoShow([...allCountries].splice(firstIndex, itemPerPage))
  setCurrentPage(prevPage)
};

const handlerOrderAlpha = (param, allCountries, setAllCountries) => {
  if (param === 'az') {
    let order = allCountries.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    setAllCountries([...order])
  } else {
    let order = allCountries.sort((a, b) => {
      if (a.name > b.name) return -1
      if (a.name < b.name) return 1
      return 0
    })
    setAllCountries([...order])
  }
};

const handlerOrderNum = (param, allCountries, setAllCountries) => {
  if (param === 'min') {
    let order = allCountries.sort((a, b) => {
      if (a.population < b.population) return -1
      if (a.population > b.population) return 1
      return 0
    })
    setAllCountries([...order])
  } else {
    let order = allCountries.sort((a, b) => {
      if (a.population > b.population) return -1
      if (a.population < b.population) return 1
      return 0
    })
    setAllCountries([...order])
  }
};

const continentsFilter = (continents, Countries, setAllCountries) => {
  let continentsSelected = Countries.filter(ch => ch.continents === continents)
  setAllCountries([...continentsSelected])
};

export {
  handleChange,
  handlerNextPage,
  handlerPrevPage,
  handlerOrderAlpha,
  handlerOrderNum,
  continentsFilter
};
