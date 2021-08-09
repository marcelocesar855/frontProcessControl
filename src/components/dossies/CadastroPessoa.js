import React, {Component} from 'react';
import Api from '../../services/Api'
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button, ButtonDropdown, DropdownToggle, DropdownMenu, Row, Col, DropdownItem } from 'reactstrap';
import * as toast from '../../utils/toasts'

class CadastroPessoa extends Component {

    state = {
        dropdownOpenCaixa : false,
        labelCaixa : {numero : 'Caixa', id : 0},
        rows : '',
        nome : '',
        matricula : '',
        observacao : ''
    }

    toggleCaixa = () => this.setState({dropdownOpenCaixa : !this.state.dropdownOpenCaixa})

    changeCaixa = (e) => this.setState({
        labelCaixa : {
            numero : e.target.textContent,
            id : e.target.value
        } 
    })

    componentDidMount = async () => {
        await Api.get("pessoa-rows").then(response =>{
            this.setState({rows : response.data})
        })
    }

    changeNome = (e) => this.setState({nome : e.target.value})

    changeMatricula = (e) => this.setState({matricula : e.target.value})

    changeObservacao = (e) => this.setState({observacao : e.target.value})

    cleanForm = () => {
        this.setState({
            labelCaixa : {numero : 'Caixa', id : 0},
            nome : '',
            matricula : '',
            observacao : ''
        })
    }

    storeCaixa = () => {
        const {nome, matricula, observacao} = this.state;
        const dossieId = this.state.labelCaixa.id;
        if (nome !== '') {
            if (matricula !== '') {
                Api.post('pessoa/', {nome, matricula, observacao, dossieId}).then( response => {
                    toast.sucesso("Pessoa cadastrada com sucesso")
                    this.cleanForm()
                }).catch( () => {
                    toast.erro("Erro ao cadastrar a pessoa")
                    this.cleanForm()
                })
            }else {
                toast.erro("Informe a matrícula da pessoa")
            }
        }else {
            toast.erro("Informe a nome da pessoa")
        }
    }
    render() {
        return (
            <Card className="p-3 mt-3">
                <CardTitle><h3>Cadastro de pessoas</h3></CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                        <Row form>
                            <Col>
                                <Label for="nome">Nome</Label>
                                <Input value={this.state.nome} id="nome" onChange={this.changeNome}/>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <Label for="matricula">Matrícula</Label>
                                <Input value={this.state.matricula} id="matricula" className='w-75' onChange={this.changeMatricula}/>
                            </Col>
                            <Col>
                                <ButtonDropdown isOpen={this.state.dropdownOpenCaixa} toggle={this.toggleCaixa}  className="pt-4">
                                    <DropdownToggle caret>
                                        {this.state.labelCaixa.numero}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.props.dossies.map(dossie => {
                                            return(
                                                <DropdownItem key={dossie.id} disabled={dossie.id === 0 ? true : false} onClick={this.changeCaixa} value={dossie.id}>{dossie.numero}</DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <Label for="observacao">Observações</Label>
                                <textarea Style='resize:none' className='form-control' value={this.state.observacao} rows="2" id="observacao" onChange={this.changeObservacao}/>
                            </Col>
                        </Row>
                        </FormGroup>
                        <Button color="primary" onClick={this.storeCaixa}>Salvar</Button>
                        <Button className='ml-3' outline color="secondary" onClick={this.cleanForm}>Cancelar</Button><br/>
                        <Label className='mt-4'>Número de dossiês cadastrados: {this.state.rows}</Label>
                    </Form>
                </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state => ({
    dossies: state.dossies
  });

export default connect(mapStateToProps)(CadastroPessoa);
