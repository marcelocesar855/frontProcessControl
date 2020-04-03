import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../services/Api'
import moment from 'moment'
import * as processosActions from '../actions/processos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../utils/toasts'

class TabelaProcesso extends Component {

  state={
    caixas:[],
    currentPage: 0,
    selected:{numero : '', data : '', assunto : {descricao : 'Assunto', id : 0}, caixa : {numero : 'Caixa', id : 0, setor : {sigla : 'Setor', id : 0}}},
    showModalEdit: false,
    showModalDel: false,
    dropdownOpenSetor : false,
    dropdownOpenAssunto : false,
    dropdownOpenCaixa : false
  }

  handlePageClick = (e, index) => {
    e.preventDefault();
    this.setState({currentPage: index});
  };

  handlePreviousClick = (e) => {
    e.preventDefault();
    this.setState({currentPage: this.state.currentPage - 1});
  }

  handleNextClick = (e) => {
    e.preventDefault();
    this.setState({currentPage: this.state.currentPage + 1});
  }

  toggleEdit = () => this.setState({showModalEdit: !this.state.showModalEdit})

  toggleDel = () => this.setState({showModalDel: !this.state.showModalDel})

  toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})

  toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})
  
  toggleCaixa = () => this.setState({dropdownOpenCaixa : !this.state.dropdownOpenCaixa})

  changeSetor = async (e) => {
    this.setState({
      selected : {...this.state.selected,
        caixa : {
          numero : 'Caixa', id : 0, setor : {
            sigla : e.target.textContent,
            id : e.target.value
          }
        }  
      }
    })
    const setorId = e.target.value;
    this.getCaixaSetor(setorId)
}

  getCaixaSetor = async (setorId) => {
    await Api.post('caixas-setor/', {setorId}).then( response => {
      if (response.data.length > 0){
          this.setState({caixas : response.data})
      }else{
          this.setState({caixas : [{numero : 'Setor sem caixas', id : 0}]})
      }
  }).catch(erro => {
      console.log(erro)
  })
  }

  changeAssunto = (e) => this.setState({
    selected : {...this.state.selected,
      assunto : {
          descricao : e.target.textContent,
          id : e.target.value
      }  
    }
  })

  changeNumeroProcesso = (e) => this.setState({
    selected :{
      ...this.state.selected, 
      numero : e.target.value
  }})

  changeCaixa = (e) => this.setState({
    selected : {...this.state.selected,
      caixa : {
          ...this.state.selected.caixa,
          numero : e.target.textContent,
          id : e.target.value
      }  
    }
  })

  changeData = (e) => this.setState({
    selected :{
      ...this.state.selected, 
      data : e.target.value
  }})

  updateProcesso = () => {
    const { numero, data, id } = this.state.selected;
      const caixaId = this.state.selected.caixa.id
      const assuntoId = this.state.selected.assunto.id
      if (numero !== '') {
          if(data !== ''){
              if (caixaId !== 0 ) {
                  if (assuntoId !== 0) {
                      Api.put(`processo/${id}`, {numero, data ,caixaId, assuntoId}).then( response => {
                          toast.sucesso("Processo atualizado com sucesso")
                      }).catch( () => {
                          toast.erro("Erro ao atualizar o processo")
                      })
                  }else {
                      toast.erro("Informe o assunto do processo")
                  }
              }else {
                  toast.erro("Informe a caixa do processo")
              }
          }else {
              toast.erro("Informe a data de autuação do processo")
          }
      }else {
          toast.erro("Informe o número do processo")
      }
  }

  deleteProcesso = () => {
    const { id } = this.state.selected;
    Api.delete(`processo/${id}`).then( response => {
        toast.sucesso("Processo excluído com sucesso")
    }).catch( () => {
        toast.erro("Erro ao excluir o processo")
    })         
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Número</th>
                  <th>Data Autuação</th>
                  <th>Setor</th>
                  <th>Assunto</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.props.processosEdit
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(processo => {
                return (
                  <React.Fragment key={processo.key}>
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{moment(processo.data).format('DD/MM/YYYY')}</td>
                      <td>{processo.caixa.setor.sigla}</td>
                      <td>{processo.assunto.descricao}</td>
                      <td>
                        <Button onClick={() => {this.setState({selected: processo}); this.toggleEdit(); this.getCaixaSetor(processo.caixa.setor.id)}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {this.setState({selected: processo}); this.toggleDel()}}>Excluir</Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          currentPage={this.state.currentPage}
          pagesCount={Math.round((this.props.processosEdit.length / 10) + 0.5)}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar processo</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="processo">Número do processo</Label>
                        <Input value={this.state.selected.numero} id="processo" onChange={this.changeNumeroProcesso}/>
                        <Label for="data">Data autuação</Label>
                        <Input value={moment(this.state.selected.data).format('YYYY-MM-DD')} id="data" type="date" className='w-75' onChange={this.changeData}/>
                    </FormGroup>
                    <FormGroup>
                        <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                            <DropdownToggle caret>
                                {this.state.selected.caixa.setor.sigla}
                            </DropdownToggle>
                            <DropdownMenu>
                              {this.props.setores.map(setor => {
                                return(
                                  <DropdownItem key={setor.id} disabled={setor.id === 0 ? true : false} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                )
                              })}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown isOpen={this.state.dropdownOpenCaixa} toggle={this.toggleCaixa} className='ml-2'>
                            <DropdownToggle caret>
                                {this.state.selected.caixa.numero}
                            </DropdownToggle>
                            <DropdownMenu>
                              {this.state.caixas.map(caixa => {
                                return(
                                  <DropdownItem key={caixa.id} onClick={this.changeCaixa} disabled={caixa.id === 0 ? true : false} value={caixa.id}>{caixa.numero}</DropdownItem>
                                )
                              })}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown className='ml-2' isOpen={this.state.dropdownOpenAssunto} toggle={this.toggleAssunto}>
                            <DropdownToggle caret>
                                {this.state.selected.assunto.descricao}
                            </DropdownToggle>
                            <DropdownMenu>
                              {this.props.assuntos.map(assunto => {
                                return(
                                  <DropdownItem key={assunto.id} disabled={assunto.id === 0 ? true : false} onClick={this.changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                )
                              })}
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateProcesso(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir processo</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o processo<br/>nº <span className='font-weight-bold'>{this.state.selected.numero}</span>,
            autuado em <span className='font-weight-bold'>{moment(this.state.selected.data).format('DD/MM/YYYY')}</span><br/>pertencente ao setor <span className='font-weight-bold'>{this.state.selected.caixa.setor.sigla}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deleteProcesso(); this.toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  setores: state.setores,
  assuntos: state.assuntos,
  processos: state.processos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(processosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaProcesso);
