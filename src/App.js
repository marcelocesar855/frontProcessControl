import React from 'react';
import './styles/global.css'
import Tabela from './components/Tabela'
import Pesquisa from './components/Pesquisa';
import { Row, Container } from 'reactstrap';

function App() {
  return (
    <div className='main'>
      <Container>
        <Row>
          <Pesquisa/>
        </Row>
        <Row>
          <Tabela/>
        </Row>
      </Container>
    </div>
  );
}

export default App;
