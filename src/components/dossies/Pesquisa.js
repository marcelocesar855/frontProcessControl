import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as dossiesActions from '../../actions/dossies';
import * as pessoasActions from '../../actions/pessoas';
import Tabela from './Tabela'
import Api from '../../services/Api'
import * as toast from '../../utils/toasts'
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';

class Pesquisa extends Component {

    state = {
        dropdownOpenDossie : false,
        labelDossie : {numero : 'Caixa', id : null},
        nome : '',
        matricula: ''
    }

    componentDidMount = async () => {
        await Api.get('pessoas-dados/').then( response => {
           this.props.searchPessoa(response.data)
        }).catch(erro => {
            console.log(erro)
        })
        await Api.get('dossies/').then( response => {
            this.props.searchDossie(response.data)
        }).catch(erro => {
            console.log(erro)
        })
    }

    toggleDossie = () => this.setState({dropdownOpenDossie : !this.state.dropdownOpenDossie})

    changeDossie = (e) => this.setState({
        labelDossie : {
            numero : e.target.textContent,
            id : e.target.value
        } 
    })
    
    changeNome = (e) => this.setState({nome : e.target.value})
    
    changeMatricula = (e) => this.setState({matricula : e.target.value})

    cleanFilters = () => {
        this.setState({
            labelDossie : {numero : 'Caixa', id : null},
            nome : '',
            matricula: ''
        })
    }

    search = async () => {
        const {nome, matricula} = this.state
        const dossieId = this.state.labelDossie.id
        await Api.post('pessoas-params/', {nome, matricula,dossieId}).then( response => {
            this.props.searchPessoa(response.data)
            if (this.props.pessoas.length <= 0){
                toast.info("Nenhum dossiê encontrado com os filtros informados",{
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
                    <ButtonDropdown isOpen={this.state.dropdownOpenDossie} toggle={this.toggleDossie}>
                        <DropdownToggle caret>
                            {this.state.labelDossie.numero}
                        </DropdownToggle>
                        <DropdownMenu>
                            {this.props.dossies.map(dossie => {
                                return(
                                    <DropdownItem key={dossie.id} disabled={dossie.id === 0 ? true : false} onClick={this.changeDossie} value={dossie.id}>{dossie.numero}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </ButtonDropdown>
                    <Input className='ml-3 rounded' placeholder='Matrícula' value={this.state.matricula} onChange={this.changeMatricula}/>
                    <Input className='ml-3 rounded-left' placeholder='Nome' value={this.state.nome} onChange={this.changeNome}/>
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
    dossies: state.dossies
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(Object.assign({}, dossiesActions, pessoasActions), dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(Pesquisa);
