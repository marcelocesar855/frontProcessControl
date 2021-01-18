import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaPessoa from './TabelaPessoas'
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'
import { connect } from 'react-redux';

class EditarPessoa extends Component {

    state = {
        pessoas : [],
        hidden : true,
        nome : '',
        matricula : '',
        dropdownOpenDossies : false,
        labelDossie : {numero : 'Caixa', id : 0}
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    toggleDossie = () => this.setState({dropdownOpenDossies : !this.state.dropdownOpenDossies})
    
    changeDossie = (e) => {
        this.setState({
            labelDossie : {
                numero : e.target.textContent,
                id : e.target.value
            }  
        })
    }

    changeNome = (e) => this.setState({nome : e.target.value})

    changeMatricula = (e) => this.setState({matricula : e.target.value})


    cleanFilters = () => {
        this.setState({
            labelDossie : {numero : 'Caixa', id : 0},
            nome : '',
            matricula : ''
        })
    }

    buscarPessoa = async () => {
        const {nome,matricula} = this.state
        const dossieId = this.state.labelDossie.id
        await Api.post('pessoa-params/', {nome,matricula,dossieId}).then( response => {
            this.setState({pessoas : response.data})
            if (this.state.pessoas.length <= 0){
                toast.info("Nenhuma pessoa encontrada com os filtros informados")
            }
        })
        if (this.state.pessoas.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.pessoas.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render () {
        return (
            <div>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Editar pessoas</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3 w-75">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Nome' value={this.state.nome} onChange={this.changeNome}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarPessoa}>Buscar</Button></InputGroupAddon>
                            <Input className='rounded ml-3' type='number' placeholder='Matrícula' value={this.state.matricula} onChange={this.changeMatricula}/>
                            <ButtonDropdown className='ml-3' isOpen={this.state.dropdownOpenDossies} toggle={this.toggleDossie}>
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
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaPessoa pessoasEdit={this.state.pessoas} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    dossies: state.dossies
});

export default connect(mapStateToProps)(EditarPessoa);
