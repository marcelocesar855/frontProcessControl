import React, {useState} from 'react';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';

const CadastroSetor = () => {

    const [nomeSetor, setNomeSetor] = useState('')
    const changeNomeSetor = (e) => setNomeSetor(e.target.value)

    const [siglaSetor, setSiglaSetor] = useState('')
    const changeSiglaSetor = (e) => setSiglaSetor(e.target.value)

    const cleanForm = () => {
        setNomeSetor('')
        setSiglaSetor('')
    }

    const storeSetor = () => {
        
    }

    return (
        <Card className="p-3">
            <CardTitle><h3>Cadastro de setores</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome do setor</Label>
                        <Input value={nomeSetor} id="nome" onChange={changeNomeSetor}/>
                        <Label for="sigle">Sigla do setor</Label>
                        <Input value={siglaSetor} className="w-50" id="sigla" onChange={changeSiglaSetor}/>
                    </FormGroup>
                    <Button outline onClick={storeSetor}>Salvar</Button>
                    <Button className='ml-3' outline onClick={cleanForm}>Cancelar</Button>
                </Form>
            </CardBody>
       </Card>
    )
}

export default CadastroSetor;
