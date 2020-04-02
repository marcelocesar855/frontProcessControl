import { combineReducers } from 'redux';
import processos from './processos';
import setores from './setores'
import assuntos from './assuntos'

export default combineReducers({
  processos,
  setores,
  assuntos
});
