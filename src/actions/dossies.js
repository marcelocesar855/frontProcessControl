export function addDossie(dossie) {
  return {
    type: 'ADD_DOSSIE',
    dossie
  }
}

export function removeDossie(dossie) {
  return {
    type: 'REMOVE_DOSSIE',
    dossie,
  }
}

export function updateDossie(dossie) {
  return {
    type: 'UPDATE_DOSSIE',
    dossie,
  }
}

export function searchDossie(dossies) {
  return {
    type: 'SEARCH_DOSSIES',
    dossies
  }
}