export function addSetor(setor) {
    return {
      type: 'ADD_SETOR',
      setor
    }
  }
  
  export function removeSetor(setor) {
    return {
      type: 'REMOVE_SETOR',
      setor
    }
  }
  
  export function updateSetor(setor) {
    return {
      type: 'UPDATE_SETOR',
      setor
    }
  }
  
  export function searchSetor(setores) {
    return {
      type: 'SEARCH_SETORES',
      setores
    }
  }