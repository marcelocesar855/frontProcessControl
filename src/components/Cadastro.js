import React, {useState} from 'react';
import { Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';

const Cadastro = () => {

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [labelSetor, setLabelSetor] = useState('Setor')
    const changeSetor = (e) => setLabelSetor(e.target.textContent)
    
    const [labelAssunto, setLabelAssunto] = useState('Assunto')
    const changeAssunto = (e) => setLabelAssunto(e.target.textContent)

    const [numeroProcesso, setNumeroProcesso] = useState('')
    const changeNumeroProcesso = (e) => setNumeroProcesso(e.target.value)

    const [caixa, setCaixa] = useState('')
    const changeCaixa = (e) => setCaixa(e.target.value)

    const [data, setData] = useState('')
    const changeData = (e) => setData(e.target.value)

    const cleanForm = () => {
        setLabelSetor('Setor')
        setLabelAssunto('Assunto')
        setCaixa('')
        setNumeroProcesso('')
        setData('')
    }

    const storeProcesso = () => {
        
    }

    return (
        <Card className="p-3">
            <CardTitle><h3>Cadastro de processos</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="processo">Número do processo</Label>
                        <Input value={numeroProcesso} id="processo" onChange={changeNumeroProcesso}/>
                        <Label for="data">Data autuação</Label>
                        <Input value={data} id="data" type="date" className='w-75' onChange={changeData}/>
                        <Label for="caixa">Caixa</Label>
                        <Input value={caixa} id="caixa" className='w-25' onChange={changeCaixa}/>
                    </FormGroup>
                    <FormGroup>
                        <ButtonDropdown isOpen={dropdownOpenSetor} toggle={toggleSetor}>
                            <DropdownToggle caret>
                                {labelSetor}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeSetor}>SUBLA</DropdownItem>
                                <DropdownItem>SUBLA</DropdownItem>
                                <DropdownItem>SUBLA</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown className='ml-3' isOpen={dropdownOpenAssunto} toggle={toggleAssunto}>
                            <DropdownToggle caret>
                                {labelAssunto}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeAssunto}>Teste 1</DropdownItem>
                                <DropdownItem>Teste 2</DropdownItem>
                                <DropdownItem>Teste 3</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                    <Button outline onClick={storeProcesso}>Salvar</Button>
                    <Button className='ml-3' outline onClick={cleanForm}>Cancelar</Button>
                </Form>
            </CardBody>
       </Card>
    )
}

export default Cadastro;
