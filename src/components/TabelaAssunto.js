import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../services/Api'
import * as assuntosActions from '../actions/assuntos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../utils/toasts'

class TabelaAssunto extends Component {

  state = {
    currentPage : 0,
    selected : {descricao : ''},
    showModalEdit: false,
    showModalDel: false,
    assuntos : []
  }

  componentWillReceiveProps() {
    this.setState({assuntos : this.props.assuntosEdit})
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

  changeDesc = (e) => this.setState({selected: {...this.state.selected, descricao : e.target.value}})

  updateAssunto = () => {
    const { descricao, id } = this.state.selected;
    if (descricao !== '') {
        Api.put(`assunto/${id}`, {descricao}).then( () => {
          this.props.updateAssunto(this.state.selected)
          const assuntos = this.state.assuntos.filter(a => this.state.selected.id !== a.id)
          this.setState({assuntos : [this.state.selected].concat(assuntos)})
            toast.sucesso("Assunto atualizado com sucesso")
        }).catch( () => {
            toast.erro("Erro ao atualizar o assunto")
        })
    }else {
        toast.erro("Informe descrição do assunto")
    }
  }

  deleteAssunto = () => {
    const { id } = this.state.selected;
    Api.delete(`assunto/${id}`).then( () => {
      this.props.removeAssunto(this.state.selected)
      const assuntos = this.state.assuntos.filter(a => this.state.selected.id !== a.id)
      this.setState(assuntos)
      toast.sucesso("Assunto excluído com sucesso")
    }).catch( () => {
        toast.erro("Erro ao excluir o assunto")
    })
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.state.assuntos
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(assunto => {
                return (
                  <tr>
                    <td>{assunto.descricao}</td>
                    <td>
                      <Button onClick={() => {this.setState({selected : assunto}); this.toggleEdit()}}>Editar</Button>
                      {/*<Button className='ml-3' onClick={() => {this.setState({selected : assunto}); this.toggleDel()}}>Excluir</Button>*/}
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.state.assuntos.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar assunto</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Descrição</Label>
                        <Input value={this.state.selected.descricao} id="nome" onChange={this.changeDesc}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateAssunto(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir assunto</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o assunto <span className='font-weight-bold'>{this.state.selected.descricao}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deleteAssunto(); this.toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  assuntos: state.assuntos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(assuntosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaAssunto);