import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../services/Api'
import * as setoresActions from '../actions/setores';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../utils/toasts'

class TabelaSetor extends Component {

  state = {
    currentPage : 0,
    selected : {nome : '', sigla : ''},
    showModalEdit: false,
    showModalDel: false,
    setores: []
  }

  componentWillReceiveProps() {
    this.setState({setores : this.props.setoresEdit})
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

  changeNome = (e) => this.setState({selected: {...this.state.selected, nome : e.target.value}})
    
  changeSigla = (e) => this.setState({selected: {...this.state.selected, sigla : e.target.value}})

  updateSetor = () => {
    const { nome, sigla, id } = this.state.selected;
    if (nome !== '') {
        if(sigla !== ''){
          Api.put(`setor/${id}`, {nome, sigla}).then( () => {
            this.props.updateSetor(this.state.selected)
            const setores = this.state.setores.filter(s => this.state.selected.id !== s.id)
            this.setState({setores : [this.state.selected].concat(setores)})
              toast.sucesso("Setor atualizado com sucesso")
          }).catch( () => {
              toast.erro("Erro ao atualizar o setor")
          })
        }else {
            toast.erro("Informe a sigla do setor")
        }
    }else {
        toast.erro("Informe o nome do setor")
    }
  }

  deleteSetor = () => {
    const { id } = this.state.selected;
    Api.delete(`setor/${id}`).then( () => {
        this.props.removeSetor(this.state.selected)
        const setores = this.state.setores.filter(s => this.state.selected.id !== s.id)
        this.setState(setores)
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
                  <th>Nome</th>
                  <th>Sigla</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.state.setores
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(setor => {
                return (
                  <React.Fragment key={setor.id}>
                  <tr>
                    <td>{setor.nome}</td>
                    <td>{setor.sigla}</td>
                    <td>
                      <Button onClick={() => {this.setState({selected : setor}); this.toggleEdit()}}>Editar</Button>
                      {/*<Button className='ml-3' onClick={() => {this.setState({selected : setor}); this.toggleDel()}}>Excluir</Button>*/}
                    </td>
                  </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.state.setores.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar setor</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome do setor</Label>
                        <Input value={this.state.selected.nome} id="nome" onChange={this.changeNome}/>
                        <Label for="sigla">Sigla</Label>
                        <Input value={this.state.selected.sigla} id="sigla" className='w-50' onChange={this.changeSigla}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateSetor(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir setor</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o setor <span className='font-weight-bold'>{this.state.selected.nome} ({this.state.selected.sigla})</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deleteSetor(); this.toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
  )}
}

const mapStateToProps = state => ({
  setores: state.setores
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(setoresActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaSetor);
