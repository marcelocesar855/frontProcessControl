export function addProcesso(processo) {
  return {
    type: 'ADD_PROCESSO',
    processo
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