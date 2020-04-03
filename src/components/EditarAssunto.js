import React, {Component} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, Row } from 'reactstrap';
import TabelaAssunto from './TabelaAssunto'
import * as toast from '../utils/toasts'
import Api from '../services/Api'

class EditarAssunto extends Component {

    state = {
        assuntos : [],
        hidden : true,
        descricao: ''
    }

    hiddenTabela = () => this.setState({hidden : !this.state.hidden})

    changeDescricao = (e) => this.setState({descricao : e.target.value})

    cleanFilters = () => {
        this.setState({nome :  ''})
    }

    buscarAssunto = async () => {
        const {descricao} = this.state
        await Api.post('assunto-params/', {descricao}).then( response => {
            this.setState({assuntos : response.data})
            if (this.state.assuntos.length <= 0){
                toast.info("Nenhum assunto encontrado com a descrição informada")
            }
        })
        if (this.state.assuntos.length !== 0 && this.state.hidden) {
            this.hiddenTabela()
        }else if (this.state.assuntos.length === 0 && this.state.hidden === false){
            this.hiddenTabela()
        }
    }

    render () {
        return (
            <div>
                <Card className="p-3 mt-3">
                    <CardTitle><h3>Editar assuntos</h3></CardTitle>
                    <CardBody>
                    <Row className="pb-3">
                        <InputGroup>
                            <Input className='rounded-left' placeholder='Assunto' value={this.state.descricao} onChange={this.changeDescricao}/>
                            <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={this.buscarAssunto}>Buscar</Button></InputGroupAddon>
                            <Button className='ml-3' outline onClick={this.cleanFilters}>Limpar</Button>
                        </InputGroup>
                    </Row>
                    </CardBody>
                    <TabelaAssunto assuntosEdit={this.state.assuntos} hidden={this.state.hidden}/>
                </Card>
            </div>
        )
    }
}

export default EditarAssunto;
