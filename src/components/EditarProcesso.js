import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaProcesso from './TabelaProcesso'
import * as toast from '../utils/toasts'
import Api from '../services/Api'
import * as processosActions from '../actions/processos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EditarProcesso extends Component {

    state = {
        processos : [],
        hidden : true,
        numero : '',
        dropdownOpenSetor : false,
        dropdownOpenAssunto : false,
        labelSetor : {sigla : 'Setor', id : 0},
        labelAssunto : {descricao : 'Assunto', id : 0}
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})
    
    toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})

    changeSetor = (e) => {
        this.setState({
            labelSetor : {
                sigla : e.target.textContent,
                id : e.target.value
            }  
        })
    }
    
    changeAssunto = (e) => this.setState({
        labelAssunto : {
            descricao : e.target.textContent,
            id : e.target.value
        } 
    })
    
    changenumero = (e) => this.setState({numero : e.target.value})


    cleanFilters = () => {
        this.setState({
            labelSetor : {sigla : 'Setor', id : 0},
            labelAssunto : {descricao : 'Assunto', id : 0},
            numero : ''
        })
    }

    buscarProcessos = async () => {
        const {numero} = this.state
        const setorId = this.state.labelSetor.id
        const assuntoId = this.state.labelAssunto.id
        await Api.post('processos-params/', {numero,setorId,assuntoId}).then( response => {
            this.setState({processos : response.data})
            if (this.state.processos.length <= 0){
                toast.info("Nenhum processo encontrado com os filtros informados",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
            if (this.state.processos.length !== 0 && this.state.hidden) {
                this.hiddenTabela()
            }else if (this.state.processos.length === 0 && this.state.hidden === false){
                this.hiddenTabela()
            }
        }).catch(erro => {
            console.log(erro)
        })
    }

    render() {
        return (
            <div>
                <Card className="p-3">
                    <CardTitle><h3>Editar processos</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3 w-75">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Número do processo' value={this.state.numero} onChange={this.changenumero}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarProcessos}>Buscar</Button></InputGroupAddon>
                            <ButtonDropdown className='ml-3' isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                                <DropdownToggle caret>
                                    {this.state.labelSetor.sigla}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.setores.map(setor => {
                                        return(
                                            <DropdownItem key={setor.id} disabled={setor.id === 0 ? true : false} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <ButtonDropdown className='ml-3' isOpen={this.state.dropdownOpenAssunto} toggle={this.toggleAssunto}>
                                <DropdownToggle caret>
                                    {this.state.labelAssunto.descricao}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.assuntos.map(assunto => {
                                        return(
                                            <DropdownItem key={assunto.id} disabled={assunto.id === 0 ? true : false} onClick={this.changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaProcesso processosEdit={this.state.processos} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    setores: state.setores,
    assuntos: state.assuntos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(processosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditarProcesso);
