
import React, {useState} from 'react';
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';

const CadastroDossie = () => {

    const [numero, setNumero] = useState('')
    const changeNumero = (e) => setNumero(e.target.value)

    const [prateleira, setPrateleira] = useState('')
    const changePrateleira = (e) => setPrateleira(e.target.value)
    
    const [armario, setArmario] = useState('')
    const changeArmario = (e) => setArmario(e.target.value)

    const cleanForm = () => {
        setNumero('')
        setPrateleira('')
        setArmario('')
    }

    const storeDossie = () => {
        if (numero !== '' ) {
            if (prateleira !== '') {
                if (armario !== '') {
                    Api.post('dossie/', {numero, armario, prateleira}).then( response => {
                        toast.sucesso("Caixa cadastrada com sucesso")
                        cleanForm()
                    }).catch( () => {
                        toast.erro("Erro ao cadastrar a caixa")
                        cleanForm()
                    })
                }else {
                    toast.erro("Informe a armário da caixa")
                }
            }else {
                toast.erro("Informe a prateleira da caixa")
            }
        }else {
            toast.erro("Informe o número da caixa")
        }
    }

    return (
        <Card className="p-3 mt-3">
            <CardTitle><h3>Cadastro de caixas de dossiês</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={numero} id="numero" className='w-50' onChange={changeNumero}/>
                        </Col>
                        <Col>
                            <Label for="armario">Armário</Label>
                            <Input value={armario} id="armario" type='number' className='w-50' onChange={changeArmario}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="prateleira">Prateleira</Label>
                            <Input value={prateleira} id="prateleira" type='number' className='w-25' onChange={changePrateleira}/>
                        </Col>
                    </Row>
                    </FormGroup>
                    <Button color="primary" onClick={storeDossie}>Salvar</Button>
                    <Button className='ml-3' outline color="secondary" onClick={cleanForm}>Cancelar</Button>
                    
                </Form>
            </CardBody>
       </Card>
    )
}

export default CadastroDossie;
