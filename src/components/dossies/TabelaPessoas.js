import React, {Component} from 'react';
import {Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../../services/Api'
import * as pessoasActions from '../../actions/pessoas';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../../utils/toasts'

class TabelaPessoas extends Component {

  state = {
    currentPage : 0,
    selected : {nome : '', matricula : '', observacao : '', dossie : {numero: 'Caixa', id : 0}},
    dropdownOpenDossie : false,
    showModalEdit: false,
    showModalDel: false,
    pessoas : []
  }

  componentWillReceiveProps() {
    this.setState({pessoas : this.props.pessoasEdit})
  }

  shouldComponentUpdate() {
    return true;
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

  toggleDossie = () => this.setState({dropdownOpenDossie : !this.state.dropdownOpenDossie})

  changeNome = (e) => this.setState({selected: {...this.state.selected, nome : e.target.value}})
    
  changeMatricula = (e) => this.setState({selected: {...this.state.selected, matricula : e.target.value}})
    
  changeObservacao = (e) => this.setState({selected: {...this.state.selected, observacao : e.target.value}})

  changeDossie = (e) => this.setState({
    selected : {...this.state.selected,
      dossie : {
          numero : e.target.textContent,
          id : e.target.value
        }
      }  
    })

  updatePessoa = () => {
    const { nome, matricula, observacao, id } = this.state.selected;
    const dossieId = this.state.selected.dossie.id
    if (nome !== '') {
      if (matricula !== 0 ) {
          if (dossieId !== 0) {
              Api.put(`pessoa/${id}`, {nome, matricula, observacao, dossieId}).then( () => {
                alert('a')
                const pessoas = this.props.pessoasEdit.filter(p => this.state.selected.id !== p.id)
                alert('a')
                this.props.onChange([this.state.selected].concat(pessoas))
                alert('a')
                toast.sucesso("Dossiê atualizado com sucesso")
              }).catch( () => {
                  toast.erro("Erro ao atualizar o dossiê")
              })
          }else {
              toast.erro("Informe a caixa do dossiê")
          }
      }else {
          toast.erro("Informe a matrícula da pessoa")
      }
    }else {
        toast.erro("Informe o nome da pessoa")
    }
  }

  deletePessoa = () => {
    const { id } = this.state.selected;
    Api.delete(`pessoa/${id}`).then( () => {
      this.props.removePessoa(this.state.selected)
      const pessoas = this.props.pessoasEdit.filter(p => this.state.selected.id !== p.id)
      this.props.change({pessoas})
      toast.sucesso("Dossiê excluído com sucesso")
    }).catch( (err) => {
        toast.erro("Erro ao excluir o dossiê")
    })
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Caixa</th>
                  <th>Armário</th>
                  <th>Prateleira</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.props.pessoasEdit
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(pessoa => {
                return (
                  <React.Fragment key={pessoa.id}>
                    <tr>
                      <td>{pessoa.nome}</td>
                      <td>{pessoa.matricula}</td>
                      <td>{pessoa.dossie.numero}</td>
                      <td>{pessoa.dossie.armario}</td>
                      <td>{pessoa.dossie.prateleira}</td>
                      <td>
                        <Button onClick={() => {this.setState({selected : pessoa}); this.toggleEdit()}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {this.setState({selected : pessoa}); this.toggleDel()}}>Excluir</Button>                     </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.state.pessoas.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar dossiê</ModalHeader>
            <ModalBody>
              <Form>
                  <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="nome">Nome</Label>
                            <Input value={this.state.selected.nome} id="nome" onChange={this.changeNome}/>
                        </Col>
                      </Row>
                      <Row form>
                        <Col>
                            <Label for="matricula">Matrícula</Label>
                            <Input value={this.state.selected.matricula} id="matricula" className='w-50' onChange={this.changeMatricula}/>
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpenDossie} toggle={this.toggleDossie}  className="pt-4">
                                <DropdownToggle caret>
                                    {this.state.selected.dossie.numero}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.dossies.map(dossie => {
                                        return(
                                            <DropdownItem key={dossie.id} disabled={dossie.id === 0 ? true : false} onClick={this.changeDossie} value={dossie.id}>{dossie.numero}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="nome">Observações</Label>
                            <textarea Style='resize:none' className='form-control' value={this.state.selected.observacao} rows="2" id="observacao" onChange={this.changeObservacao}/>
                        </Col>
                      </Row>
                  </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updatePessoa(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir dossiê</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o dossiê da pessoa<br/> <span className='font-weight-bold'>{this.state.selected.nome}</span>
            , com a matrícula nº <span className='font-weight-bold'>{this.state.selected.matricula}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deletePessoa(); this.toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dossies: state.dossies
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(pessoasActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaPessoas);
