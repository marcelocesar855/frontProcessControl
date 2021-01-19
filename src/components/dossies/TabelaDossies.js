import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, Input, Label, Button, Row, Col } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../../services/Api'
import * as dossiesActions from '../../actions/dossies';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../../utils/toasts'

class TabelaDossies extends Component {

  state = {
    currentPage : 0,
    selected : {numero : '', armario : '', prateleira : ''},
    showModalEdit: false,
    showModalDel: false,
    dossies : []
  }

  componentWillReceiveProps() {
    this.setState({dossies : this.props.dossiesEdit})
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

  changeNumero = (e) => this.setState({selected: {...this.state.selected, numero : e.target.value}})

  changeArmario = (e) => this.setState({selected: {...this.state.selected, armario : e.target.value}})

  changePrateleira = (e) => this.setState({selected: {...this.state.selected, prateleira : e.target.value}})

  updateDossie = () => {
    const { numero, armario, prateleira, id } = this.state.selected;
    if (numero !== '') {
      if (armario !== '') {
        if (prateleira !== '') {
          Api.put(`dossie/${id}`, {numero,armario,prateleira}).then( () => {
            this.props.updateDossie(this.state.selected)
            const dossies = this.state.dossies.filter(d => this.state.selected.id !== d.id)
            this.setState({dossies : [this.state.selected].concat(dossies)})
              toast.sucesso("Caixa atualizada com sucesso")
          }).catch( () => {
              toast.erro("Erro ao atualizar a caixa")
          })
        }else {
          toast.erro("Informe a prateleira da caixa")
        }
      }else {
        toast.erro("Informe o armário da caixa")
      }
    }else {
        toast.erro("Informe o número da caixa")
    }
  }

  deleteDossie = () => {
    const { id } = this.state.selected;
    Api.delete(`dossie/${id}`).then( () => {
      this.props.removeDossie(this.state.selected)
      const dossies = this.state.dossies.filter(d => this.state.selected.id !== d.id)
      this.setState(dossies)
      toast.sucesso("Caixa excluída com sucesso")
    }).catch( () => {
        toast.erro("Erro ao excluir a caixa")
    })
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Número</th>
                  <th>Armário</th>
                  <th>Prateleira</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.state.dossies
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(dossie => {
                return (
                  <tr>
                    <td>{dossie.numero}</td>
                    <td>{dossie.armario}</td>
                    <td>{dossie.prateleira}</td>
                    <td>
                      <Button onClick={() => {this.setState({selected : dossie}); this.toggleEdit()}}>Editar</Button>
                      {/*<Button className='ml-3' onClick={() => {this.setState({selected : assunto}); this.toggleDel()}}>Excluir</Button>*/}
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.state.dossies.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar caixa de dossiês</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={this.state.selected.numero} id="numero" onChange={this.changeNumero}/>
                        </Col>
                        <Col>
                            <Label for="armario">Armário</Label>
                            <Input value={this.state.selected.armario} id="armario" type='number' onChange={this.changeArmario}/>
                        </Col>
                        <Col>
                            <Label for="prateleira">Prateleira</Label>
                            <Input value={this.state.selected.prateleira} id="prateleira" type='number' onChange={this.changePrateleira}/>
                        </Col>
                    </Row>
                    </FormGroup>                    
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateDossie(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir caixa</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir a caixa de dossiês <span className='font-weight-bold'>{this.state.selected.numero}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deleteDossie(); this.toggleDel()}}>Sim, exclua</Button>
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
    bindActionCreators(dossiesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaDossies);