import React, { Component} from 'react';
import Api from '../../services/Api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as setoresActions from '../../actions/setores';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';
import * as toast from '../../utils/toasts'

class CadastroSetor extends Component {

    state = {
        nome : '',
        sigla : ''
    }

    changeNome = (e) => this.setState({nome : e.target.value})

    changeSigla = (e) => this.setState({sigla : e.target.value})

    cleanForm = () => {
        this.setState({nome : ''})
        this.setState({sigla : ''})
    }

    storeSetor = () => {
        var {nome, sigla} = this.state
        if (nome !== '' ) {
            if (sigla !== '') {
                Api.post('setor/', {nome, sigla}).then( response => {
                    toast.sucesso("Setor cadastrado com sucesso")
                    this.props.addSetor(response.data)
                    this.cleanForm()
                }).catch( () => {
                    toast.erro("Erro ao cadastrar o setor")
                    this.cleanForm()
                })
            }else {
                toast.erro("Informe a sigla do setor")
            }
        }else {
            toast.erro("Informe o nome do setor")
        }
    }
    render () {
        return (
            <Card className="p-3 mt-3">
                <CardTitle><h3>Cadastro de setores</h3></CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="nome">Nome do setor</Label>
                            <Input value={this.state.nome} id="nome" onChange={this.changeNome}/>
                            <Label for="sigle">Sigla do setor</Label>
                            <Input value={this.state.sigla} className="w-50" id="sigla" onChange={this.changeSigla}/>
                        </FormGroup>
                        <Button color="primary" onClick={this.storeSetor}>Salvar</Button>
                        <Button className='ml-3' outline color="secondary" onClick={this.cleanForm}>Cancelar</Button>
                    </Form>
                </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state => ({
    setores: state.setores
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(setoresActions, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(CadastroSetor);
