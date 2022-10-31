
export const getCountries =()=>{
  return async function (dispatch){
    const resp = await fetch("https://restcountries.com/v3/all")
    const data = await resp.json()
    return dispatch({ type: "GET-COUNTRIES", payload: data})
  }
}

export const addTouristActivity =(newActivity, selecCountrie)=>{
  return {type: "ADD-ACTIVITY", payload: {newActivity, selecCountrie}}
}