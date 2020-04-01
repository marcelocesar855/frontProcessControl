import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment'
import * as processosActions from '../actions/processos';
import Tabela from './Tabela'
import Api from '../services/Api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Table } from 'reactstrap';

class Pesquisa extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        setores : [],
        assuntos : [],
        currentPage : 0,
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
            this.setState({assuntos : response.data})
        }).catch(erro => {
            console.log(erro)
        })
        await Api.get('setores/').then( response => {
            this.setState({setores : response.data})
        }).catch(erro => {
            console.log(erro)
        })
    }

    handlePageClick = (e, index) => {
        e.preventDefault();
        this.setState({currentPage : index});
    };

    handlePreviousClick = (e) => {
        e.preventDefault();
        this.setState({currentPage : this.state.currentPage - 1});
    }

    handleNextClick = (e) => {
        e.preventDefault();
        this.setState({currentPage : this.state.currentPage + 1});
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
        toast.configure()
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
                            {this.state.setores.map(setor => {
                                return(
                                    <DropdownItem key={setor.id} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown className='ml-3' isOpen={this.state.dropdownOpenAssunto} toggle={this.toggleAssunto}>
                        <DropdownToggle caret>
                            {this.state.labelAssunto.descricao}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.state.assuntos.map(assunto => {
                                return(
                                    <DropdownItem key={assunto.id} onClick={this.changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </ButtonDropdown>
                    <Input className='ml-3 rounded-left' placeholder='Número do processo' value={this.state.numero} onChange={this.changeNumero}/>
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
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(processosActions, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pesquisa);
