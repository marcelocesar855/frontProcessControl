export default function pessoas(state = [], action) {
  switch (action.type) {
    case 'ADD_PESSOA':
      return [...state, action.pessoa]
    case 'REMOVE_PESSOA':
      const pessoas = state.filter(p => action.pessoa.id !== p.id)
      return pessoas
    case 'UPDATE_PESSOA':
      const pessoasUp = state.filter(p => action.pessoa.id !== p.id)
      return [action.pessoa].concat(pessoasUp)
    case 'SEARCH_PESSOAS':
        return action.pessoas
    default:
      return state;
  }
}
