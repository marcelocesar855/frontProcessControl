export default function setores(state = [], action) {
    switch (action.type) {
      case 'ADD_SETOR':
        return [...state, action.setor]
      case 'REMOVE_SETOR':
        const setores = state.filter(s => action.setor.id !== s.id)
        return setores
      case 'UPDATE_SETOR': 
      const setoresUp = state.filter(s => action.setor.id !== s.id)
      return [action.setor].concat(setoresUp)
      case 'SEARCH_SETORES':
          return action.setores
      default:
        return state;
    }
  }
  