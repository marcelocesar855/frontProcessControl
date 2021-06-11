import React, {Component} from 'react';
import Api from '../../services/Api'
import * as processosActions from '../../actions/processos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Card, CardTitle, CardBody, Button, Row, Col } from 'reactstrap';
import * as toast from '../../utils/toasts'

class CadastroProcesso extends Component {

    state = {
        caixas : [{numero : 'Escolha um setor', id : 0}],
        dropdownOpenSetor : false,
        dropdownOpenAssunto : false,
        dropdownOpenCaixa : false,
        labelSetor : {sigla : 'Setor', id : 0},
        labelAssunto : {descricao : 'Assunto', id : 0},
        labelCaixa : {numero : 'Caixa', id : 0},
        numero : '',
        data : '',
        volumes: '',
        interessado : '',
        observacao : '',
        rows : ''
    }

    componentDidMount(){
        Api.get("processo-rows").then(response =>{
            this.setState({rows : response.data})
        })
    }

    toggleSetor = () => this.setState({dropdownOpenSetor : !this.state.dropdownOpenSetor})

    toggleAssunto = () => this.setState({dropdownOpenAssunto : !this.state.dropdownOpenAssunto})
    
    toggleCaixa = () => this.setState({dropdownOpenCaixa : !this.state.dropdownOpenCaixa})

    changeSetor = async (e) => {
        this.setState({
            labelSetor : {
                sigla : e.target.textContent,
                id : e.target.value
            }  
        })
        const setorId = e.target.value;
        await Api.post('caixas-setor/', {setorId}).then( response => {
            if (response.data.length > 0){
                this.setState({caixas : response.data})
            }else{
                this.setState({caixas : [{numero : 'Setor sem caixas', id : 0}]})
            }
        }).catch(erro => {
            console.log(erro)
        })
    }
    
    changeAssunto = (e) => this.setState({
        labelAssunto : {
            descricao : e.target.textContent,
            id : e.target.value
        } 
    })

    changeNumero = (e) => this.setState({numero : e.target.value})

    changeInteressado = (e) => this.setState({interessado : e.target.value})

    changeObservacao = (e) => this.setState({observacao : e.target.value})

    changeVolumes = (e) => this.setState({volumes : e.target.value})

    changeCaixa = (e) => this.setState({
        labelCaixa : {
            numero : e.target.textContent,
            id : e.target.value
        } 
    })

    changeData = (e) => this.setState({data : e.target.value})

    cleanForm = () => {
        this.setState({
            labelSetor : {sigla : 'Setor', id : 0},
            labelAssunto : {descricao : 'Assunto', id : 0},
            labelCaixa : {numero : 'Caixa', id : 0},
            caixas : [],
            numero : '',
            data : '',
            volumes : '',
            interessado : '',
            observacao : ''
        })
    }

    storeProcesso = () => {
        const { numero, data, volumes, interessado, observacao } = this.state;
        const caixaId = this.state.labelCaixa.id
        const assuntoId = this.state.labelAssunto.id
        if (numero !== '') {
            if(data !== ''){
                if(volumes !== ''){
                    if(interessado !== ''){
                        if (caixaId !== 0 ) {
                            if (assuntoId !== 0) {
                                Api.post('processo/', {numero, data, volumes, interessado, observacao, caixaId, assuntoId}).then( response => {
                                    toast.sucesso("Processo cadastrado com sucesso")
                                    Api.get("processo-rows").then(response =>{
                                        this.setState({rows : response.data})
                                    })
                                    this.cleanForm()
                                }).catch( () => {
                                    toast.erro("Erro ao cadastrar o processo")
                                    this.cleanForm()
                                })
                            }else {
                                toast.erro("Informe o assunto do processo")
                            }
                        }else {
                            toast.erro("Informe a caixa do processo")
                        }
                    }else {
                        toast.erro("Informe o interessado do processo")
                    }
                }else {
                    toast.erro("Informe o número de volumes do processo")
                }
            }else {
                toast.erro("Informe a data de autuação do processo")
            }
        }else {
            toast.erro("Informe o número do processo")
        }
    }

    render () {
        return (
            <Card className="p-3">
                <CardTitle><h3>Cadastro de processos</h3></CardTitle>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="processo">Número do processo</Label>
                            <Input value={this.state.numero} id="processo" onChange={this.changeNumero}/>
                            <Row form>
                                <Col>
                                    <Label for="data">Data autuação</Label>
                                    <Input value={this.state.data} id="data" type="date" onChange={this.changeData}/>
                                </Col>
                                <Col>
                                    <Label for="volumes">Volumes</Label>
                                    <Input value={this.state.volumes} id="volumes" className='w-50' onChange={this.changeVolumes}/>                                
                                </Col>
                            </Row>
                            <Label for="interessado">Interessado</Label>
                            <Input value={this.state.interessado} id="interessado" onChange={this.changeInteressado}/>
                        </FormGroup>
                        <FormGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                                <DropdownToggle caret>
                                    {this.state.labelSetor.sigla}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.setores.map(setor => {
                                        return(
                                            <DropdownItem key={setor.id} disabled={setor.id === 0 ? true : false} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <ButtonDropdown isOpen={this.state.dropdownOpenCaixa} toggle={this.toggleCaixa} className='ml-2'>
                                <DropdownToggle caret>
                                    {this.state.labelCaixa.numero}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.caixas.map(caixa => {
                                        return(
                                            <DropdownItem key={caixa.id} onClick={this.changeCaixa} disabled={caixa.id === 0 ? true : false} value={caixa.id}>{caixa.numero}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                            <ButtonDropdown className='ml-2' isOpen={this.state.dropdownOpenAssunto} toggle={this.toggleAssunto}>
                                <DropdownToggle caret>
                                    {this.state.labelAssunto.descricao}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.props.assuntos.map(assunto => {
                                        return(
                                            <DropdownItem key={assunto.id} disabled={assunto.id === 0 ? true : false} onClick={this.changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown><br/>
                            <Label for="observacao">Observações</Label>
                            <textarea Style='resize:none' className='form-control' value={this.state.observacao} rows="2" id="observacao" onChange={this.changeObservacao}/>
                        </FormGroup>
                        <Button color="primary" onClick={this.storeProcesso}>Salvar</Button>
                        <Button className='ml-3' outline color="secondary" onClick={this.cleanForm}>Cancelar</Button><br/>
                    <Label className='mt-4'>Número de processos cadastrados: {this.state.rows}</Label>
                    </Form>
                </CardBody>
        </Card>
        )
    }
}

const mapStateToProps = state => ({
    setores: state.setores,
    assuntos: state.assuntos
  });

  const mapDispatchToProps = dispatch =>
    bindActionCreators(Object.assign({}, processosActions), dispatch);

  export default connect(mapStateToProps, mapDispatchToProps)(CadastroProcesso);