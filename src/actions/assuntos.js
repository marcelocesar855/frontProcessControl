export function addAssunto(assunto) {
  return {
    type: 'ADD_ASSUNTO',
    assunto
  }
}

export function removeAssunto(assunto) {
  return {
    type: 'REMOVE_ASSUNTO',
    assunto,
  }
}

export function updateAssunto(assunto) {
  return {
    type: 'UPDATE_ASSUNTO',
    assunto,
  }
}

export function searchAssunto(assuntos) {
  return {
    type: 'SEARCH_ASSUNTOS',
    assuntos
  }
}