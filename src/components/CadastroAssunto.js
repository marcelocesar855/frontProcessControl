import React, {useState} from 'react';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';

const CadastroAssunto = () => {

    const [descAssunto, setDescAssunto] = useState('')
    const changeDescAssunto = (e) => setDescAssunto(e.target.value)

    const cleanForm = () => {
        setDescAssunto('')
    }

    const storeAssunto = () => {
        
    }

    return (
        <Card className="p-3 mt-3">
            <CardTitle><h3>Cadastro de assuntos</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Descrição</Label>
                        <Input value={descAssunto} id="nome" onChange={changeDescAssunto}/>
                    </FormGroup>
                    <Button color="primary" onClick={storeAssunto}>Salvar</Button>
                    <Button className='ml-3' outline color="secondary" onClick={cleanForm}>Cancelar</Button>
                </Form>
            </CardBody>
       </Card>
    )
}

export default CadastroAssunto;
