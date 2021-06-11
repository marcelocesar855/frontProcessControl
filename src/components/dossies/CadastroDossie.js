
import React, {Component} from 'react';
import * as toast from '../../utils/toasts'
import Api from '../../services/Api'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dossiesActions from '../../actions/dossies';
import { Form, FormGroup, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';

class CadastroDossie extends Component {
    state = {
        numero : '',
        prateleira : '',
        armario : '',
        rows: ''
    }

    componentDidMount = async () => {
        await Api.get("dossie-rows").then(response =>{
             this.setState({rows : response.data})
        })
    }
    
    changeNumero = (e) => this.setState({numero : e.target.value})
    
    changePrateleira = (e) => this.setState({prateleira : e.target.value})

    changeArmario = (e) => this.setState({armario : e.target.value})

    cleanForm = () => {
        this.setState({
            numero : '',
            prateleira : '',
            armario : '',
            rows: ''})
    }

    storeDossie = () => {
        const {numero, armario, prateleira} = this.state
        if (numero !== '' ) {
            if (prateleira !== '') {
                if (armario !== '') {
                    Api.post('dossie/', {numero, armario, prateleira}).then( response => {
                        Api.get('dossies/').then( response => {
                            this.props.searchDossie(response.data)
                        }).catch(erro => {
                            console.log(erro)
                        })
                        toast.sucesso("Caixa cadastrada com sucesso")
                        Api.get("dossie-rows").then(response =>{
                            this.setState({rows : response.data})
                        })
                        this.cleanForm()
                    }).catch( () => {
                        toast.erro("Erro ao cadastrar a caixa")
                        this.cleanForm()
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

    render () {
        return (
            <Card className="p-3 mt-3">
                <CardTitle><h3>Cadastro de caixas de dossiês</h3></CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                        <Row form>
                            <Col>
                                <Label for="numero">Número da caixa</Label>
                                <Input value={this.state.numero} id="numero" className='w-50' onChange={this.changeNumero}/>
                            </Col>
                            <Col>
                                <Label for="armario">Armário</Label>
                                <Input value={this.state.armario} id="armario" className='w-50' onChange={this.changeArmario}/>
                            </Col>
                        </Row>
                        <Row form>
                            <Col>
                                <Label for="prateleira">Prateleira</Label>
                                <Input value={this.state.prateleira} id="prateleira" className='w-25' onChange={this.changePrateleira}/>
                            </Col>
                        </Row>
                        </FormGroup>
                        <Button color="primary" onClick={this.storeDossie}>Salvar</Button>
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

const mapDispatchToProps = dispatch =>
bindActionCreators(Object.assign({}, dossiesActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CadastroDossie);