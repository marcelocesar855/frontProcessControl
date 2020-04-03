import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaSetor from './TabelaSetor'
import * as toast from '../utils/toasts'
import Api from '../services/Api'
import * as setoresActions from '../actions/setores';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EditarSetor extends Component{

    state = {
        setores : [],
        hidden : true,
        nome : '',
        dropdownOpenSetor : false,
        dropdownOpenAssunto : false,
        labelSetor : {sigla : 'Setor', id : 0}
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})
    
    toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})
    
    changeNome = (e) => this.setState({nome : e.target.value})
   
    changeSetor = (e) => {
        this.setState({
            labelSetor : {
                sigla : e.target.textContent,
                id : e.target.value
            }  
        })
    }

    cleanFilters = () => {
        this.setState({
            labelSetor : {sigla : 'Setor', id : 0},
            nome : ''
        })
    }

    buscarSetor = async () => {
        const {nome} = this.state
        const setorId = this.state.labelSetor.id
        await Api.post('setor-params/', {nome,setorId}).then( response => {
            this.setState({setores : response.data})
            if (this.state.setores.length <= 0){
                toast.info("Nenhum setor encontrado com os filtros informados")
            }
        })
        if (this.state.setores.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.setores.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render() {
        return (
            <div>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Editar setores</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Nome do setor' value={this.state.nome} onChange={this.changeNome}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarSetor}>Buscar</Button></InputGroupAddon>
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
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaSetor setoresEdit={this.state.setores} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    setores: state.setores
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(setoresActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditarSetor);
