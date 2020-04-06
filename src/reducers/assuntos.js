export default function assuntos(state = [], action) {
  switch (action.type) {
    case 'ADD_ASSUNTO':
      return [...state, action.assunto]
    case 'REMOVE_ASSUNTO':
      const assuntos = state.filter(a => action.assunto.id !== a.id)
      return assuntos
    case 'UPDATE_ASSUNTO':
      const assuntosUp = state.filter(a => action.assunto.id !== a.id)
      return [action.assunto].concat(assuntosUp)
    case 'SEARCH_ASSUNTOS':
        return action.assuntos
    default:
      return state;
  }
}
