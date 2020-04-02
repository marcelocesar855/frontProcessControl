export default function assunto(state = [], action) {
  switch (action.type) {
    case 'ADD_ASSUNTO':
      return [...state, action.assunto]
    case 'REMOVE_ASSUNTO':
      return null
    case 'UPDATE_ASSUNTO':
      return null
    case 'SEARCH_ASSUNTOS':
        return action.assuntos
    default:
      return state;
  }
}
