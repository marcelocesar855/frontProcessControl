import React, {useState} from 'react';
import Api from '../services/Api'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as assuntosActions from '../actions/assuntos';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';
import * as toast from '../utils/toasts'

const CadastroAssunto = (props) => {

    const [descricao, setDescricao] = useState('')
    const changeDescricao = (e) => setDescricao(e.target.value)

    const cleanForm = () => {
        setDescricao('')
    }

    const storeAssunto = () => {
        if (descricao !== '' ) {
            Api.post('assunto/', {descricao}).then( response => {
                toast.sucesso("Assunto cadastrado com sucesso")
                props.addAssunto(response.data)
                cleanForm()
            }).catch( () => {
                toast.erro("Erro ao cadastrar o assunto")
                cleanForm()
            })
        }else {
            toast.erro("Informe a descrição do assunto")
        }
    }

    return (
        <Card className="p-3 mt-3">
            <CardTitle><h3>Cadastro de assuntos</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="descricao">Descrição</Label>
                        <Input value={descricao} id="descricao" onChange={changeDescricao}/>
                    </FormGroup>
                    <Button color="primary" onClick={storeAssunto}>Salvar</Button>
                    <Button className='ml-3' outline color="secondary" onClick={cleanForm}>Cancelar</Button>
                </Form>
            </CardBody>
       </Card>
    )
}

const mapStateToProps = state => ({
    assuntos: state.assunstos
});
  
const mapDispatchToProps = dispatch =>
    bindActionCreators(assuntosActions, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(CadastroAssunto);
