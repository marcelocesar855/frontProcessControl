import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as processosActions from '../../actions/processos';
import * as setoresActions from '../../actions/setores';
import * as assuntosActions from '../../actions/assuntos';
import Tabela from './Tabela'
import Api from '../../services/Api'
import * as toast from '../../utils/toasts'
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';

class Pesquisa extends Component {

    state = {
        dropdownOpenSetor : false,
        dropdownOpenAssunto : false,
        labelSetor : {sigla : 'Setor', id : null},
        labelAssunto : {descricao : 'Assunto', id : null},
        numero : ''
    }

    componentDidMount = async () => {
        await Api.get('processos-dados/').then( response => {
           this.props.searchProcesso(response.data)
        }).catch(erro => {
            console.log(erro)
        })
        await Api.get('assuntos/').then( response => {
            this.props.searchAssunto(response.data)
        }).catch(erro => {
            console.log(erro)
        })
        await Api.get('setores/').then( response => {
           this.props.searchSetor(response.data)
        }).catch(erro => {
            console.log(erro)
        })
    }

    toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})

    toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})

    changeSetor = (e) => this.setState({
        labelSetor : {
            sigla : e.target.textContent,
            id : e.target.value
        } 
    })
    
    changeAssunto = (e) => this.setState({
        labelAssunto : {
            descricao : e.target.textContent,
            id : e.target.value
        } 
    })
    
    changeNumero = (e) => this.setState({numero : e.target.value})

    cleanFilters = () => {
        this.setState({
            labelSetor : {sigla : 'Setor', id : null},
            labelAssunto : {descricao : 'Assunto', id : null},
            numero : ''
        })
    }

    search = async () => {
        const {numero} = this.state
        const setorId = this.state.labelSetor.id
        const assuntoId = this.state.labelAssunto.id
        await Api.post('processos-params/', {numero,setorId,assuntoId}).then( response => {
            this.props.searchProcesso(response.data)
            if (this.props.processos.length <= 0){
                toast.info("Nenhum processo encontrado com os filtros informados",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
        }).catch(erro => {
            console.log(erro)
        })
    }

    render () {
        return (
            <div>
            <Row className="py-3 w-75">
                <InputGroup>
                    <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
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
                    <Input className='ml-3 rounded-left' placeholder='Número do processo ou interessado' value={this.state.numero} onChange={this.changeNumero}/>
                    <InputGroupAddon addonType="append" onClick={this.search}><Button className='rounded-right'>Pesquisar</Button></InputGroupAddon>
                    <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                </InputGroup>
            </Row>
            <Row>
                <Tabela/>
            </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    processos: state.processos,
    setores: state.setores,
    assuntos: state.assuntos
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(Object.assign({}, processosActions, setoresActions, assuntosActions), dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pesquisa);
