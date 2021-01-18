
import { connect } from 'react-redux';
import React, {useState} from 'react';
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'
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
    
    const [armario, setArmario] = useState('')
    const changeArmario = (e) => setArmario(e.target.value)

    const cleanForm = () => {
        setLabelSetor({sigla : 'Setor', id : 0})
        setNumero('')
        setPrateleira('')
        setArmario('')
    }

    const storeCaixa = () => {
        var setorId = labelSetor.id
        if (numero !== '' ) {
            if (prateleira !== '') {
                if (armario !== '') {
                    Api.post('caixa/', {numero, armario, prateleira, setorId}).then( response => {
                        toast.sucesso("Caixa cadastrada com sucesso")
                        cleanForm()
                    }).catch( () => {
                        toast.erro("Erro ao cadastrar a caixa")
                        cleanForm()
                    })
                }else {
                    toast.erro("Informe a Armário da caixa")
                }
            }else {
                toast.erro("Informe a prateleira da caixa")
            }
        }else {
            toast.erro("Informe o número da caixa")
        }
    }

    return (
        <Card className="p-3">
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
                            <Label for="armario">Armário</Label>
                            <Input value={armario} id="armario" type='number' className='w-50' onChange={changeArmario}/>
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
