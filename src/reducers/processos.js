export default function processos(state = [], action) {
  switch (action.type) {
    case 'ADD_PROCESSO':
      return null
      case 'REMOVE_PROCESSO':
      return null
      case 'UPDATE_PROCESSO':
      return null
      case 'SEARCH_PROCESSOS':
      return state = [action.processos]
    default:
      return state;
  }
}
