import React, {useState} from 'react';
import Api from '../../services/Api'
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button, ButtonDropdown, DropdownToggle, DropdownMenu, Row, Col, DropdownItem } from 'reactstrap';
import * as toast from '../../utils/toasts'

const CadastroPessoa = (props) => {

    const [dropdownOpenCaixa, setOpenCaixa] = useState(false)
    const toggleCaixa = () => setOpenCaixa(!dropdownOpenCaixa)

    const [labelCaixa, setLabelCaixa] = useState({numero : 'Caixa', id : 0})
    const changeCaixa = (e) => setLabelCaixa({
        numero : e.target.textContent,
        id : e.target.value
    })

    const [nome, setNome] = useState('')
    const changeNome = (e) => setNome(e.target.value)
    
    const [matricula, setMatricula] = useState('')
    const changeMatricula = (e) => setMatricula(e.target.value)

    const cleanForm = () => {
        setNome('')
        setMatricula('')
        setLabelCaixa({numero : 'Caixa', id : 0})
    }

    const storeCaixa = () => {
        var dossieId = labelCaixa.id
        if (nome !== '') {
            if (matricula !== '') {
                Api.post('pessoa/', {nome, matricula, dossieId}).then( response => {
                    toast.sucesso("Pessoa cadastrada com sucesso")
                    cleanForm()
                }).catch( () => {
                    toast.erro("Erro ao cadastrar a pessoa")
                    cleanForm()
                })
            }else {
                toast.erro("Informe a matrícula da pessoa")
            }
        }else {
            toast.erro("Informe a nome da pessoa")
        }
    }

    return (
        <Card className="p-3 mt-3">
            <CardTitle><h3>Cadastro de pessoas</h3></CardTitle>
            <CardBody>
                <Form>
                    <FormGroup>
                    <Row form>
                        <Col>
                            <Label for="nome">Nome</Label>
                            <Input value={nome} id="nome" onChange={changeNome}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="matricula">Matrícula</Label>
                            <Input value={matricula} id="matricula" className='w-75' onChange={changeMatricula}/>
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={dropdownOpenCaixa} toggle={toggleCaixa}  className="pt-4">
                                <DropdownToggle caret>
                                    {labelCaixa.numero}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {props.dossies.map(dossie => {
                                        return(
                                            <DropdownItem key={dossie.id} disabled={dossie.id === 0 ? true : false} onClick={changeCaixa} value={dossie.id}>{dossie.numero}</DropdownItem>
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
    dossies: state.dossies
  });

export default connect(mapStateToProps)(CadastroPessoa);
