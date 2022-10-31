const initialState = {
  countries : [],
  continentsFilter: []
};

export default function reducer(state=initialState, actions){
  switch (actions.type) {
    case "GET-COUNTRIES":
      return{
        ...state,
        countries: actions.payload
      }
/* 
    case "FILTER":
      console.log(actions.payload)
      return{
        ...state,
        continentsFilter : state.countries.filter(ch => ch.continents[0] === actions.payload)
      } */

      case "ADD-ACTIVITY":
        let algo = []
        actions.payload.selecCountrie.forEach(element => {
          algo = [...algo, state.countries.filter(e=> e.name.common === element)]
        });

        algo.forEach(element=> {
          return{
            ...state,
            countries:[...state.countries, element[0].activity = actions.payload.newActivity]
          }
        })
  
    default:
      return {...state};
  }
}