import React, {useState} from 'react';
import Api from '../services/Api'
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        toast.configure()
        var nome = nomeSetor
        var sigla = siglaSetor
        if (nome !== '' ) {
            if (sigla !== '') {
                Api.post('setor/', {nome, sigla}).then( response => {
                    toast.success("Setor cadastrado com sucesso",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                    cleanForm()
                }).catch( erro => {
                    toast.error("Erro ao cadastrar o setor",{
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                    cleanForm()
                })
            }else {
                toast.error("Informe a sigla do setor",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
        }else {
            toast.error("Informe o nome do setor",{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }

    return (
        <Card className="p-3">
            <CardTitle><h3>Cadastro de setores</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="nomeSetor">Nome do setor</Label>
                        <Input value={nomeSetor} id="nomeSetor" onChange={changeNomeSetor}/>
                        <Label for="sigle">Sigla do setor</Label>
                        <Input value={siglaSetor} className="w-50" id="siglaSetor" onChange={changeSiglaSetor}/>
                    </FormGroup>
                    <Button color="primary" onClick={storeSetor}>Salvar</Button>
                    <Button className='ml-3' outline color="secondary" onClick={cleanForm}>Cancelar</Button>
                </Form>
            </CardBody>
       </Card>
    )
}

export default CadastroSetor;
