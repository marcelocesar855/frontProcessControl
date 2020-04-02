export default function setores(state = [], action) {
    switch (action.type) {
      case 'ADD_SETOR':
        return [...state, action.setor]
      case 'REMOVE_SETOR':
        return null
      case 'UPDATE_SETOR':
        return null
      case 'SEARCH_SETORES':
          return action.setores
      default:
        return state;
    }
  }
  