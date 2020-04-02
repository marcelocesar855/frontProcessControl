import React, {useState} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaProcesso from './TabelaProcesso'
import * as toast from '../utils/toasts'
import Api from '../services/Api'
import * as processosActions from '../actions/processos';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const EditarProcesso = (props) => {

    var processos = []

    const setProcessos = (processo) => {
        processos = processo
    }

    const [hidden, setHidden] = useState(true)
    const hiddenTabela = () => setHidden(!hidden)

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [labelSetor, setLabelSetor] = useState({sigla : 'Setor', id : 0})
    const changeSetor = (e) => setLabelSetor(e.target.textContent)
    
    const [labelAssunto, setLabelAssunto] = useState({descricao : 'Assunto', id : 0})
    const changeAssunto = (e) => setLabelAssunto(e.target.textContent)

    const [numero, setNumero] = useState('')
    const changenumero = (e) => setNumero(e.target.value)


    const cleanFilters = () => {
        setLabelSetor('Setor')
        setLabelAssunto('Assunto')
        setNumero('')
    }

    const buscarProcessos = async () => {
        const setorId = labelSetor.id
        const assuntoId = labelAssunto.id
        await Api.post('processos-params/', {numero,setorId,assuntoId}).then( response => {
            setProcessos(response.data)
            if (processos.length <= 0){
                toast.info("Nenhum processo encontrado com os filtros informados",{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
            if (processos.length !== 0 && hidden) {
                hiddenTabela()
            }else if (processos.length === 0 && hidden === false){
                hiddenTabela()
            }
        }).catch(erro => {
            console.log(erro)
        })
    }

    return (
        <div>
            <Card className="p-3">
                <CardTitle><h3>Editar processos</h3></CardTitle>
                <CardBody>
                <Row className="pb-3 w-75">
                    <InputGroup>
                        <Input className='rounded-left' placeholder='Número do processo' value={numero} onChange={changenumero}/>
                        <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={buscarProcessos}>Buscar</Button></InputGroupAddon>
                        <ButtonDropdown className='ml-3' isOpen={dropdownOpenSetor} toggle={toggleSetor}>
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
                        <ButtonDropdown className='ml-3' isOpen={dropdownOpenAssunto} toggle={toggleAssunto}>
                            <DropdownToggle caret>
                                {labelAssunto.descricao}
                            </DropdownToggle>
                            <DropdownMenu>
                                {props.assuntos.map(assunto => {
                                    return(
                                        <DropdownItem key={assunto.id} disabled={assunto.id === 0 ? true : false} onClick={changeAssunto} value={assunto.id}>{assunto.descricao}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Button className='ml-3' outline onClick={cleanFilters}>Limpar filtros</Button>
                    </InputGroup>
                </Row>
                </CardBody>
                <TabelaProcesso processosEdit={processos} hidden={hidden}/>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    setores: state.setores,
    assuntos: state.assuntos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(processosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditarProcesso);
