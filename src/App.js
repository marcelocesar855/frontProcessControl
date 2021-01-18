import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './styles/global.css'
import PesquisaProcesso from './components/processos/Pesquisa';
import PesquisaDossie from './components/dossies/Pesquisa';
import CadastroProcesso from './components/processos/CadastroProcesso';
import CadastroSetor from './components/processos/CadastroSetor';
import CadastroAssunto from './components/processos/CadastroAssunto';
import CadastroCaixa from './components/processos/CadastroCaixa';
import CadastroPessoa from './components/dossies/CadastroPessoa';
import CadastroDossie from './components/dossies/CadastroDossie';
import EditarProcesso from './components/processos/EditarProcesso';
import EditarSetor from './components/processos/EditarSetor';
import EditarAssunto from './components/processos/EditarAssunto';
import EditarCaixa from './components/processos/EditarCaixa';
import EditarPessoa from './components/dossies/EditarPessoa';
import EditarDossie from './components/dossies/EditarDossie';
import { Row, Container, Badge, Nav, NavItem, NavLink, TabContent, TabPane, Col } from 'reactstrap';
import classnames from 'classnames';

class App extends Component {
  
  state = {
    activeTab : '1',
    activeTabTwo : '1',
    activeTabThree : '1',
    titulo : 'Processos'
  }

  toggle = (tab) => {
    if(this.state.activeTab !== tab) {
      this.setState({activeTab : tab});
      if(tab === '1'){
        this.setState({titulo : 'Processos'});
      }else{
        this.setState({titulo : 'Dossiês'});
      }
    }
  }
  
  toggleTwo = (tab) => {
    if(this.state.activeTabTwo !== tab) this.setState({activeTabTwo : tab});
  }

  toggleThree = (tab) => {
    if(this.state.activeTabThree !== tab) this.setState({activeTabThree : tab});
  }

  render () {
    return (
      <Provider store={store}>
        <div className='main'>
          <Container>
            <Row>
              <h1 className='title mb-3'>Controle de {this.state.titulo} <Badge>SODF</Badge></h1>
            </Row>
            <Nav tabs className='mb-3'>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTab === '1' })}
                onClick={() => {
                  this.forceUpdate(); this.toggle('1'); }}>
                Processos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}>
                Dossiês
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
          <Nav tabs className='mb-3 bg-light'>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabTwo === '1' })}
                onClick={() => {
                  this.forceUpdate(); this.toggleTwo('1'); }}>
                Pesquisa
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabTwo === '2' })}
                onClick={() => { this.toggleTwo('2'); }}>
                Cadastro
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabTwo === '3' })}
                onClick={() => { this.toggleTwo('3'); }}>
                Edição
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTabTwo}>
            <TabPane tabId='1' className='bg-light'> 
                <PesquisaProcesso/>
            </TabPane>
            <TabPane tabId='2' className='bg-light'>
              <Row >
                <Col>
                  <CadastroCaixa/>
                  <CadastroSetor/>
                </Col>
                <Col>
                  <CadastroProcesso/>
                  <CadastroAssunto/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='3' className='bg-light'>
              <Row>
                <Col>
                  <EditarProcesso/>
                </Col>
                </Row>
              <Row>
                <Col>
                  <EditarCaixa/>
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
            </TabPane>
          </TabContent>
          </TabPane>
          <TabPane tabId='2'>
          <Nav tabs className='mb-3 bg-light'>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabThree === '1' })}
                onClick={() => {
                  this.forceUpdate(); this.toggleThree('1'); }}>
                Pesquisa
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabThree === '2' })}
                onClick={() => { this.toggleThree('2'); }}>
                Cadastro
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active : this.state.activeTabThree === '3' })}
                onClick={() => { this.toggleThree('3'); }}>
                Edição
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTabThree}>
            <TabPane tabId='1' className='bg-light'>
                <PesquisaDossie/>
            </TabPane>
            <TabPane tabId='2' className='bg-light'>
              <Row >
                <Col>
                  <CadastroDossie/>
                </Col>
                <Col>
                <CadastroPessoa/>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='3' className='bg-light'>
                <Row>
                <Col>
                <EditarDossie/>
                </Col>
                </Row>
                <Row>
                <Col>
                <EditarPessoa/>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
          </TabPane>
          </TabContent>
          </Container>
        </div>
      </Provider>
  )};
}

export default App;
