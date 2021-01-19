import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, Row } from 'reactstrap';
import TabelaDossie from './TabelaDossies'
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'

class EditarDossie extends Component {

    state = {
        dossies : [],
        hidden : true,
        numero: '',
        armario: '',
        prateleira: ''
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    changeNumero = (e) => this.setState({numero : e.target.value})

    changeArmario = (e) => this.setState({armario : e.target.value})

    changePrateleira = (e) => this.setState({prateleira : e.target.value})

    cleanFilters = () => {
        this.setState({numero: '', armario: '', prateleira: ''})
    }

    buscarDossie = async () => {
        const {numero, armario, prateleira} = this.state
        await Api.post('dossie-params/', {numero, armario, prateleira}).then( response => {
            this.setState({dossies : response.data})
            if (this.state.dossies.length <= 0){
                toast.info("Nenhum dossie encontrado com a descrição informada")
            }
        })
        if (this.state.dossies.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.dossies.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render () {
        return (
            <div>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Editar caixas de dossiês</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3 w-75">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Número da caixa' value={this.state.numero} onChange={this.changeNumero}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarDossie}>Buscar</Button></InputGroupAddon>
                            <Input className='rounded-left ml-3' type='number' placeholder='Armário' value={this.state.armario} onChange={this.changeArmario}/>
                            <Input className='rounded-right' type='number' placeholder='Prateleira' value={this.state.prateleira} onChange={this.changePrateleira}/>
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar filtros</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaDossie dossiesEdit={this.state.dossies} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

export default EditarDossie;
