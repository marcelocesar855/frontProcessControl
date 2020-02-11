import React, {useState} from 'react';
import './styles/global.css'
import Tabela from './components/Tabela'
import Pesquisa from './components/Pesquisa';
import Cadastro from './components/Cadastro';
import { Row, Container, Badge, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

function App() {

    const processos = [
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
      {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'}]

  const [activeTab, setActiveTab] = useState('1');

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
 };

 const handlePreviousClick = (e) => {
  e.preventDefault();
  setCurrentPage(currentPage - 1);
}

const handleNextClick = (e) => {
  e.preventDefault();
  setCurrentPage(currentPage + 1);
}

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
          <Row>
            <Pesquisa/>
          </Row>
          <Row>
            <Tabela processos={processos}
              pageSize={10}
              pagesCount={Math.round((processos.length / 10) + 0.5)}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
            />
          </Row>
        </TabPane>
        <TabPane tabId='2'>
          <Row>
            <Cadastro>
              
            </Cadastro>
          </Row>
        </TabPane>
        <TabPane tabId='3'>
          <Row>
            TESTE 2
          </Row>
        </TabPane>
      </TabContent>
      </Container>
    </div>
  );
}

export default App;
