export default function processos(state = [], action) {
  switch (action.type) {
    case 'ADD_PROCESSO':
      return null
    case 'REMOVE_PROCESSO':
      const processos = state.filter(p => action.processo.id !== p.id)
      return processos
    case 'UPDATE_PROCESSO':
      const processosUp = state.filter(p => action.processo.id !== p.id)
      return [action.processo].concat(processosUp)
    case 'SEARCH_PROCESSOS':
        return action.processos
    default:
      return state;
  }
}
