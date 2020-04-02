
import { connect } from 'react-redux';
import React, {useState} from 'react';
import { Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';

const CadastroCaixa = (props) => {

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)

    const [labelSetor, setLabelSetor] = useState('Setor')
    const changeSetor = (e) => setLabelSetor(e.target.textContent)

    const [numeroCaixa, setNumeroCaixa] = useState('')
    const changeNumeroCaixa = (e) => setNumeroCaixa(e.target.value)

    const [prateleira, setPrateleira] = useState('')
    const changePrateleira = (e) => setPrateleira(e.target.value)
    
    const [estante, setEstante] = useState('')
    const changeEstante = (e) => setEstante(e.target.value)

    const cleanForm = () => {
        setLabelSetor('Setor')
        setNumeroCaixa('')
        setPrateleira('')
        setEstante('')
    }

    const storeCaixa = () => {
        
    }

    return (
        <Card className="p-3 mt-3">
            <CardTitle><h3>Cadastro de caixas</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={numeroCaixa} type='number' id="numero" className='w-50' onChange={changeNumeroCaixa}/>
                        </Col>
                        <Col>
                            <Label for="estante">Estante</Label>
                            <Input value={estante} id="estante" type='number' className='w-50' onChange={changeEstante}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="prateleira">Prateleira</Label>
                            <Input value={prateleira} id="prateleira" type='number' className='w-50' onChange={changePrateleira}/>
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={dropdownOpenSetor} toggle={toggleSetor}  className="pt-4">
                                <DropdownToggle caret>
                                    {labelSetor}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {props.setores.map(setor => {
                                        return(
                                            <DropdownItem key={setor.id} disabled={setor.id === 0 ? true : false} onClick={changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    </FormGroup>
                    <Button color="primary" onClick={storeCaixa}>Salvar</Button>
                    <Button className='ml-3' outline color="secondary" onClick={cleanForm}>Cancelar</Button>
                    
                </Form>
            </CardBody>
       </Card>
    )
}

const mapStateToProps = state => ({
    setores: state.setores
  });

export default connect(mapStateToProps)(CadastroCaixa);
