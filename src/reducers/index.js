import { combineReducers } from 'redux';
import processos from './processos';
import setores from './setores'
import assuntos from './assuntos'
import pessoas from './pessoas'
import dossies from './dossies'

export default combineReducers({
  processos,
  setores,
  assuntos,
  pessoas,
  dossies
});
