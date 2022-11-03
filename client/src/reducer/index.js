const initialState = {
  countries: [],
  countryDetail: {}
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case "GET-COUNTRIES":
      return {
        ...state,
        countries: actions.payload
      }

    /* case "ADD-ACTIVITY":
      let algo = []
      actions.payload.selecCountrie.forEach(element => {
        algo = [...algo, state.countries.filter(e => e.name.common === element)]
      });

      algo.forEach(element => {
        return {
          ...state,
          countries: [...state.countries, element[0].activity = actions.payload.newActivity]
        }
      }) */

      case "GET-COUNTRY":
        return {
          ...state,
          countryDetail: actions.payload
        }

    default:
      return { ...state };
  }
}