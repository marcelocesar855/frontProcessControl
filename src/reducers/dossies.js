export default function dossies(state = [], action) {
  switch (action.type) {
    case 'ADD_DOSSIE':
      return [...state, action.dossie]
    case 'REMOVE_DOSSIE':
      const dossies = state.filter(d => action.dossie.id !== d.id)
      return dossies
    case 'UPDATE_DOSSIE':
      const dossiesUp = state.filter(d => action.dossie.id !== d.id)
      return [action.dossie].concat(dossiesUp)
    case 'SEARCH_DOSSIES':
        return action.dossies
    default:
      return state;
  }
}
