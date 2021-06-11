import React, {Component} from 'react';
import {Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import Paginacao from './Paginacao';
import Api from '../../services/Api'
import * as assuntosActions from '../../actions/assuntos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as toast from '../../utils/toasts'

class TabelaCaixas extends Component {

  state = {
    currentPage : 0,
    selected : {numero : '', armario : '', prateleira : '', setor : {sigla: 'Setor', id : 0}},
    dropdownOpenSetor : false,
    showModalEdit: false,
    showModalDel: false,
    caixas : []
  }

  componentWillReceiveProps() {
    this.setState({caixas : this.props.caixas})
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

  changeNumero = (e) => this.setState({selected: {...this.state.selected, numero : e.target.value}})
    
  changeArmario = (e) => this.setState({selected: {...this.state.selected, armario : e.target.value}})

  changePrateleira = (e) => this.setState({selected: {...this.state.selected, prateleira : e.target.value}})

  changeSetor = (e) => this.setState({
    selected : {...this.state.selected,
      setor : {
          sigla : e.target.textContent,
          id : e.target.value
        }
      }  
    })

  updateCaixa = () => {
    const { numero, prateleira, armario, id } = this.state.selected;
    const setorId = this.state.selected.setor.id
    if (numero !== '') {
        if(prateleira !== ''){
            if (armario !== '') {
                if (setorId !== 0) {
                    Api.put(`caixa/${id}`, {numero, prateleira, armario, setorId}).then( () => {
                      const caixas = this.state.caixas.filter(c => this.state.selected.id !== c.id)
                      this.setState({caixas : [this.state.selected].concat(caixas)})
                      toast.sucesso("Caixa atualizada com sucesso")
                    }).catch( () => {
                        toast.erro("Erro ao atualizar a caixa")
                    })
                }else {
                    toast.erro("Informe o setor da caixa")
                }
            }else {
                toast.erro("Informe a armário da caixa")
            }
        }else {
            toast.erro("Informe a prateleira da caixa")
        }
    }else {
        toast.erro("Informe o número da caixa")
    }
  }

  deleteCaixa = () => {
      
  }

  render() {
    return (
      <div>
        <Table striped bordered dark hover hidden={this.props.hidden}>
            <thead>
                <tr>
                  <th>Número</th>
                  <th>Setor</th>
                  <th>Armário</th>
                  <th>Prateleira</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {this.state.caixas
              .slice(this.state.currentPage * 10, (this.state.currentPage + 1) * 10)
              .map(caixa => {
                return (
                  <React.Fragment key={caixa.id}>
                    <tr>
                      <td>{caixa.numero}</td>
                      <td>{caixa.setor.sigla}</td>
                      <td>{caixa.armario}</td>
                      <td>{caixa.prateleira}</td>
                      <td>
                        <Button onClick={() => {this.setState({selected : caixa}); this.toggleEdit()}}>Editar</Button>
                        {/*<Button className='ml-3' onClick={() => {this.setState({selected : caixa}); this.toggleDel()}}>Excluir</Button>*/}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={this.props.hidden}
          pagesCount={Math.round((this.state.caixas.length / 10) + 0.5)}
          currentPage={this.state.currentPage}
          handlePageClick={this.handlePageClick}
          handlePreviousClick={this.handlePreviousClick}
          handleNextClick={this.handleNextClick}
        />
        <Modal isOpen={this.state.showModalEdit} toggle={this.toggleEdit}>
            <ModalHeader toggle={this.toggleEdit}>Editar caixa</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={this.state.selected.numero} id="numero" className='w-50' onChange={this.changeNumero}/>
                        </Col>
                        <Col>
                            <Label for="armario">Armário</Label>
                            <Input value={this.state.selected.armario} id="armario" className='w-50' onChange={this.changearmario}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="prateleira">Prateleira</Label>
                            <Input value={this.state.selected.prateleira} id="prateleira" className='w-50' onChange={this.changePrateleira}/>
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}  className="pt-4">
                                <DropdownToggle caret>
                                    {this.state.selected.setor.sigla}
                                </DropdownToggle>
                                <DropdownMenu>
                                  {this.props.setores.map(setor => {
                                    return(
                                      <DropdownItem key={setor.id} disabled={setor.id === 0 ? true : false} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                    )
                                  })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.updateCaixa(); this.toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.showModalDel} toggle={this.toggleDel}>
            <ModalHeader toggle={this.toggleDel}>Excluir caixa</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir a caixa<br/>nº <span className='font-weight-bold'>{this.state.selected.numero}</span>
            , pertencente ao setor <span className='font-weight-bold'>{this.state.selected.setor.sigla}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {this.deleteCaixa(); this.toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={this.toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  setores: state.setores
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(assuntosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabelaCaixas);
