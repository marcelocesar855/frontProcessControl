import React, {useState} from 'react';
import './styles/global.css'
import Pesquisa from './components/Pesquisa';
import CadastroProcesso from './components/CadastroProcesso';
import CadastroSetor from './components/CadastroSetor';
import CadastroAssunto from './components/CadastroAssunto';
import CadastroCaixa from './components/CadastroCaixa';
import EditarProcesso from './components/EditarProcesso';
import EditarSetor from './components/EditarSetor';
import EditarAssunto from './components/EditarAssunto';
import EditarCaixa from './components/EditarCaixa';
import { Row, Container, Badge, Nav, NavItem, NavLink, TabContent, TabPane, Col } from 'reactstrap';
import classnames from 'classnames';

function App() {
  
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className='main'>
      <Container>
        <Row>
          <h1 className='title'>Controle de Processos <Badge>SODF</Badge></h1>
        </Row>
        <Nav tabs className='mb-4'>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
            Pesquisar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}>
            Registrar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}>
            Editar
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
            <Pesquisa/>
        </TabPane>
        <TabPane tabId='2'>
          <Row >
            <Col>
              <CadastroProcesso/>
              <CadastroAssunto/>
            </Col>
            <Col>
              <CadastroSetor/>
              <CadastroCaixa/>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='3'>
          <Row>
            <Col>
              <EditarProcesso/>
            </Col>
            </Row>
            <Row>
            <Col>
            <EditarSetor/>
            </Col>
            <Col className='col-lg-5'>
            <EditarAssunto/>
            </Col>
          </Row>
          <Row>
            <Col>
              <EditarCaixa/>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      </Container>
    </div>
  );
}

export default App;
