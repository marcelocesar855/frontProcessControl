
import { connect } from 'react-redux';
import React, {useState} from 'react';
import * as toast from '../utils/toasts'
import Api from '../services/Api'
import { Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';

const CadastroCaixa = (props) => {

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)

    const [labelSetor, setLabelSetor] = useState({sigla : 'Setor', id : 0})
    const changeSetor = (e) => setLabelSetor({
        sigla : e.target.textContent,
        id : e.target.value
    })

    const [numero, setNumero] = useState('')
    const changeNumero = (e) => setNumero(e.target.value)

    const [prateleira, setPrateleira] = useState('')
    const changePrateleira = (e) => setPrateleira(e.target.value)
    
    const [estante, setEstante] = useState('')
    const changeEstante = (e) => setEstante(e.target.value)

    const cleanForm = () => {
        setLabelSetor({sigla : 'Setor', id : 0})
        setNumero('')
        setPrateleira('')
        setEstante('')
    }

    const storeCaixa = () => {
        var setorId = labelSetor.id
        if (numero !== '' ) {
            if (prateleira !== '') {
                if (estante !== '') {
                    Api.post('caixa/', {numero, estante, prateleira, setorId}).then( response => {
                        toast.sucesso("Caixa cadastrada com sucesso")
                        cleanForm()
                    }).catch( () => {
                        toast.erro("Erro ao cadastrar a caixa")
                        cleanForm()
                    })
                }else {
                    toast.erro("Informe a estante da caixa")
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
            <CardTitle><h3>Cadastro de caixas</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={numero} type='number' id="numero" className='w-50' onChange={changeNumero}/>
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
                                    {labelSetor.sigla}
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
