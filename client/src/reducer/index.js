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
      };

      case "GET-COUNTRY":
        return {
          ...state,
          countryDetail: actions.payload
        };

    default:
      return { ...state };
  }
}