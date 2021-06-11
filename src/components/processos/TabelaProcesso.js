import React, {Component} from 'react';
import {Modal, ModalHeader, Row, Col, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../../services/Api'
import moment from 'moment'
import * as processosActions from '../../actions/processos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../../utils/toasts'

class TabelaProcesso extends Component {

  state={
    caixas:[],
    currentPage: 0,
    selected:{numero : '', data : '', assunto : {descricao : 'Assunto', id : 0}, caixa : {numero : 'Caixa', id : 0, setor : {sigla : 'Setor', id : 0}},
    volumes : 0, interessado : '', observacao : '', setor : {sigla : 'Setor', id : 0}},
    showModalEdit: false,
    showModalDel: false,
    showModalArq: false,
    dropdownOpenSetor : false,
    dropdownOpenAssunto : false,
    dropdownOpenCaixa : false,
    processos : []
  }

  componentWillReceiveProps() {
    this.setState({processos : this.props.processosEdit})
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

  toggleArq = () => this.setState({showModalArq: !this.state.showModalArq})

  arquivarProcesso = (processo) => {
    if(processo.setorId === null){
      processo = {...processo, setor : {sigla : 'Setor', id : 0}}
      this.setState({selected : processo, showModalArq: !this.state.showModalArq})
    }else{
      processo = {...processo, setorId : null}
      const { id, setorId } = processo;
      Api.put(`processo/${id}`, {setorId}).then( () => {
        this.props.updateProcesso(processo)
        const processos = this.state.processos.filter(p => processo.id !== p.id)
        this.setState({processos : [processo].concat(processos)})
        toast.sucesso("Processo arquivado com sucesso")
      }).catch( () => {
        toast.erro("Erro ao arquivar o processo")
      })
    }
  }

  desarquivarProcesso = () => {
      const { id } = this.state.selected;
      const setorId = this.state.selected.setor.id;
      Api.put(`processo/${id}`, {setorId}).then( () => {
        this.setState({selected : {...this.state.selected, setorId : setorId}})
        this.props.updateProcesso(this.state.selected)
        const processos = this.state.processos.filter(p => this.state.selected.id !== p.id)
        this.setState({processos : [this.state.selected].concat(processos)})
        toast.sucesso("Processo desarquivado com sucesso")
      }).catch( () => {
        toast.erro("Erro ao desarquivar o processo")
      })
  }

  toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})

  toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})
  
  toggleCaixa = () => this.setState({dropdownOpenCaixa : !this.state.dropdownOpenCaixa})

  changeSetor = async (e) => {
    this.setState({
      selected : {...this.state.selected,
        caixa : {...this.state.selected.caixa, setor : {
            sigla : e.target.textContent,
            id : e.target.value
          }
        }  
      }
    })
    const setorId = e.target.value;
    this.getCaixaSetor(setorId)
}

changeSetorArq = async (e) => {
  this.setState({
    selected : {...this.state.selected, setor : {
      sigla : e.target.textContent,
      id : e.target.value
    }}
  })
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

  changeInteressado = (e) => this.setState({
    selected :{
      ...this.state.selected, 
      interessado : e.target.value
  }})

  changeObservacao = (e) => this.setState({
    selected :{
      ...this.state.selected, 
      observacao : e.target.value
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

  changeVolumes = (e) => this.setState({
    selected :{
      ...this.state.selected, 
      volumes : e.target.value
  }})

  updateProcesso = () => {
    const { numero, data, id, volumes, interessado, observacao } = this.state.selected;
      const caixaId = this.state.selected.caixa.id
      const assuntoId = this.state.selected.assunto.id
      if (numero !== '') {
          if(data !== ''){
            if(volumes !== ''){
              if(interessado !== ''){
                  if (caixaId !== 0 ) {
                    if (assuntoId !== 0) {
                        Api.put(`processo/${id}`, {numero, data, volumes, interessado, observacao, caixaId, assuntoId}).then( () => {
                          this.props.updateProcesso(this.state.selected)
                          const processos = this.state.processos.filter(p => this.state.selected.id !== p.id)
                          this.setState({processos : [this.state.selected].concat(processos)})
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
                  toast.erro("Informe o interessado do processo")
                }
              }else {
                toast.erro("Informe o número de volumes do processo")
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
    Api.delete(`processo/${id}`).then( () => {
        this.props.removeProcesso(this.state.selected)
        const processos = this.state.processos.filter(p => this.state.selected.id !== p.id)
        this.setState({processos})
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
                  <th>Volumes</th>
                  <th>Interessado</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.state.processos
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(processo => {
                return (
                  <React.Fragment key={processo.key}>
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{moment(processo.data).format('DD/MM/YYYY')}</td>
                      <td>{processo.setorId === null ? processo.caixa.setor.sigla : `Sedido para ${processo.setor.sigla}`}</td>
                      <td>{processo.assunto.descricao}</td>
                      <td>{processo.volumes}</td>
                      <td>{processo.interessado}</td>
                      <td>
                        <Button onClick={() => {processo = {...processo, setor : {sigla : 'Setor', id : 0}};this.setState({selected: processo}); this.toggleEdit(); this.getCaixaSetor(processo.caixa.setor.id)}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {processo = {...processo, setor : {sigla : 'Setor', id : 0}};this.setState({selected: processo}); this.toggleDel()}}>Excluir</Button>
                        <Button className='ml-3' onClick={() =>this.arquivarProcesso(processo)}>{processo.setorId === null ? 'Desarquivar' : 'Arquivar'}</Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          currentPage={this.state.currentPage}
          pagesCount={Math.round((this.state.processos.length / 10) + 0.5)}
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
                        <Row form>
                            <Col>
                              <Label for="data">Data autuação</Label>
                              <Input value={moment(this.state.selected.data).format('YYYY-MM-DD')} id="data" type="date"  onChange={this.changeData}/>
                            </Col>
                            <Col>
                                <Label for="volumes">Volumes</Label>
                                <Input value={this.state.selected.volumes} id="volumes" className='w-50' onChange={this.changeVolumes}/>                                
                            </Col>
                        </Row>
                        <Label for="interessado">Interessado</Label>
                        <Input value={this.state.selected.interessado} id="interessado" onChange={this.changeInteressado}/>
                    </FormGroup>
                    <FormGroup>
                        <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                            <DropdownToggle caret>
                                {this.state.selected.caixa.setor.sigla}
                            </DropdownToggle>
                            <DropdownMenu>
                              {this.props.setores.map(setor => {
                                return(
                                  <DropdownItem key={setor.id} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
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
                        <Label for="observacao">Observação</Label>
                        <textarea Style='resize:none' className='form-control' value={this.state.selected.observacao} rows="2" id="observacao" onChange={this.changeObservacao}/>
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
        <Modal isOpen={this.state.showModalArq} toggle={this.toggleArq}>
            <ModalHeader toggle={this.toggleArq}>Desarquivar processo</ModalHeader>
            <ModalBody>
            <p className="text-center">Escolha o setor para onde o processo<br/>nº <span className='font-weight-bold'>{this.state.selected.numero}</span>,
            autuado em <span className='font-weight-bold'>{moment(this.state.selected.data).format('DD/MM/YYYY')}</span><br/>pertencente ao setor <span className='font-weight-bold'>{this.state.selected.caixa.setor.sigla}</span>,
            será sedido.<br/><br/>
            <ButtonDropdown className="text-center" isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                <DropdownToggle caret>
                    {this.state.selected.setor.sigla}
                </DropdownToggle>
                <DropdownMenu>
                  {this.props.setores.map(setor => {
                    return(
                      <DropdownItem key={setor.id} onClick={this.changeSetorArq} value={setor.id}>{setor.sigla}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
            </ButtonDropdown></p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.desarquivarProcesso(); this.toggleArq()}}>Desarquivar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleArq}>Cancelar</Button>
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
