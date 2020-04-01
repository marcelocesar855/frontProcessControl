import React, {Component} from 'react';
import Api from '../services/Api'
import { Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Card, CardTitle, CardBody, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CadastroProcesso extends Component {

    state = {
        setores : [],
        assuntos : [],
        caixas : [{numero : 'Escolha um setor', id : 0}],
        dropdownOpenSetor : false,
        dropdownOpenAssunto : false,
        dropdownOpenCaixa : false,
        labelSetor : {sigla : 'Setor', id : 0},
        labelAssunto : {descricao : 'Assunto', id : 0},
        labelCaixa : {numero : 'Caixa', id : 0},
        numero : '',
        data : ''
    }

    componentDidMount = async () => {
        await Api.get('assuntos/').then( response => {
            this.setState({assuntos : response.data})
        }).catch(erro => {
            console.log(erro)
        })
        await Api.get('setores/').then( response => {
            this.setState({setores : response.data})
        }).catch(erro => {
            console.log(erro)
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
            data : ''
        })
    }

    toastError (mnsg) {
        toast.configure()
        toast.error(mnsg,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true
        })
    }

    storeProcesso = () => {
        const { numero, data } = this.state;
        const caixaId = this.state.labelCaixa.id
        const assuntoId = this.state.labelAssunto.id
        if (numero !== '') {
            if(data !== ''){
                if (caixaId !== 0 ) {
                    if (assuntoId !== 0) {
                        Api.post('processo/', {numero, data ,caixaId, assuntoId}).then( response => {
                            toast.configure()
                            toast.success("Processo cadastrado com sucesso",{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true
                            })
                            this.cleanForm()
                        }).catch( erro => {
                            this.toastError("Erro ao cadastrar o processo")
                            this.cleanForm()
                        })
                    }else {
                        this.toastError("Informe o assunto do processo")
                    }
                }else {
                    this.toastError("Informe a caixa do processo")
                }
            }else {
                this.toastError("Informe a data de autuação do processo")
            }
        }else {
            this.toastError("Informe o número do processo")
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
                            <Label for="data">Data autuação</Label>
                            <Input value={this.state.data} id="data" type="date" className='w-75' onChange={this.changeData}/>
                        </FormGroup>
                        <FormGroup>
                            <ButtonDropdown isOpen={this.state.dropdownOpenSetor} toggle={this.toggleSetor}>
                                <DropdownToggle caret>
                                    {this.state.labelSetor.sigla}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.setores.map(setor => {
                                        return(
                                            <DropdownItem key={setor.id} onClick={this.changeSetor} value={setor.id}>{setor.sigla}</DropdownItem>
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
                                    {this.state.assuntos.map(assunto => {
                                        return(
                                            <DropdownItem key={assunto.id} onClick={this.changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </FormGroup>
                        <Button color="primary" onClick={this.storeProcesso}>Salvar</Button>
                        <Button className='ml-3' outline color="secondary" onClick={this.cleanForm}>Cancelar</Button>
                    </Form>
                </CardBody>
        </Card>
        )
    }
}

export default CadastroProcesso;
