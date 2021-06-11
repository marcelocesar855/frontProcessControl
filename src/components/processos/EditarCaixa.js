import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaCaixas from './TabelaCaixas'
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'
import * as assuntosActions from '../../actions/assuntos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class EditarCaixa extends Component {

    state = {
        caixas : [],
        hidden : true,
        numero : '',
        prateleira : '',
        armario : '',
        dropdownOpenSetor : false,
        labelSetor : {sigla : 'Setor', id : 0}
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})
    
    changeSetor = (e) => {
        this.setState({
            labelSetor : {
                sigla : e.target.textContent,
                id : e.target.value
            }  
        })
    }

    changeNumero = (e) => this.setState({numero : e.target.value})

    changeArmario = (e) => this.setState({armario : e.target.value})

    changePrateleira = (e) => this.setState({prateleira : e.target.value})


    cleanFilters = () => {
        this.setState({
            labelSetor : {sigla : 'Setor', id : 0},
            numero : '',
            prateleira : '',
            armario : ''
        })
    }

    buscarCaixa = async () => {
        const {numero,armario,prateleira} = this.state
        const setorId = this.state.labelSetor.id
        await Api.post('caixa-params/', {numero,armario,prateleira,setorId}).then( response => {
            this.setState({caixas : response.data})
            if (this.state.caixas.length <= 0){
                toast.info("Nenhuma caixa encontrada com os filtros informados")
            }
        })
        if (this.state.caixas.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.caixas.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render () {
        return (
            <div>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Editar caixas</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3 w-75">
                        <InputGroup>
                            <Input className='rounded-left' type='number' placeholder='Número da caixa' value={this.state.numero} onChange={this.changeNumero}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarCaixa}>Buscar</Button></InputGroupAddon>
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
                            <Input className='rounded-left ml-3' type='number' placeholder='Armário' value={this.state.armario} onChange={this.changeArmario}/>
                            <Input className='rounded-right' type='number' placeholder='Prateleira' value={this.state.prateleira} onChange={this.changePrateleira}/>
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaCaixas caixas={this.state.caixas} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    setores: state.setores
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(assuntosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditarCaixa);
