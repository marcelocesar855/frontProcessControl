export function addProcesso(processo, filtros) {
  return {
    type: 'ADD_PROCESSO',
    processo,
    filtros
  }
}

export function removeProcesso(processo) {
  return {
    type: 'REMOVE_PROCESSO',
    processo,
  }
}

export function updateProcesso(processo) {
  return {
    type: 'UPDATE_PROCESSO',
    processo,
  }
}

export function searchProcesso(processos) {
  return {
    type: 'SEARCH_PROCESSOS',
    processos
  }
}