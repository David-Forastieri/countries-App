
const handleChange = (ev, setControlSearch, Countries, setAllCountries) => {
  setControlSearch(ev.target.value)
  let countriesSearch = Countries.filter(ch => ch.name.toLowerCase().indexOf(ev.target.value.toLowerCase()) !== -1)
  setAllCountries(countriesSearch)
};

const handlerNextPage = (Countries, itemPerPage, currentPage, setAllCountries, setCurrentPage) => {
  const countriesTotal = Countries.length;
  const nextPage = currentPage + 1;
  const firstIndex = nextPage * itemPerPage;
  if (firstIndex >= countriesTotal) return;

  setAllCountries([...Countries].splice(firstIndex, itemPerPage))
  setCurrentPage(nextPage)
};

const handlerPrevPage = (currentPage, itemPerPage, Countries, setAllCountries, setCurrentPage) => {
  const prevPage = currentPage - 1;
  if (prevPage < 0) return;
  const firstIndex = prevPage * itemPerPage

  setAllCountries([...Countries].splice(firstIndex, itemPerPage))
  setCurrentPage(prevPage)
};

const handlerOrderAlpha = (param, allCountries, itemPerPage, setAllCountries) => {
  if (param === 'az') {
    let order = allCountries.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    setAllCountries([...order].splice(0, itemPerPage))
  } else {
    let order = allCountries.sort((a, b) => {
      if (a.name > b.name) return -1
      if (a.name < b.name) return 1
      return 0
    })
    setAllCountries([...order].splice(0, itemPerPage))
  }
};

const handlerOrderNum = (param, allCountries, itemPerPage, setAllCountries) => {
  if (param === 'az') {
    let order = allCountries.sort((a, b) => {
      if (a.population < b.population) return -1
      if (a.population > b.population) return 1
      return 0
    })
    setAllCountries([...order].splice(0, itemPerPage))
  } else {
    let order = allCountries.sort((a, b) => {
      if (a.population > b.population) return -1
      if (a.population < b.population) return 1
      return 0
    })
    setAllCountries([...order].splice(0, itemPerPage))
  }
};

const continentsFilter = (continents, Countries, setAllCountries, itemPerPage) => {
  let continentsSelected = Countries.filter(ch => ch.continents === continents)
  setAllCountries([...continentsSelected].splice(0, itemPerPage))
};

export {
  handleChange,
  handlerNextPage,
  handlerPrevPage,
  handlerOrderAlpha,
  handlerOrderNum,
  continentsFilter
};
