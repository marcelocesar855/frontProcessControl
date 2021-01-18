export function addPessoa(pessoa) {
  return {
    type: 'ADD_PESSOA',
    pessoa
  }
}

export function removePessoa(pessoa) {
  return {
    type: 'REMOVE_PESSOA',
    pessoa,
  }
}

export function updatePessoa(pessoa) {
  return {
    type: 'UPDATE_PESSOA',
    pessoa,
  }
}

export function searchPessoa(pessoas) {
  return {
    type: 'SEARCH_PESSOAS',
    pessoas
  }
}