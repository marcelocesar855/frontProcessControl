import React, {useState} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaProcesso from './TabelaProcesso'

const EditarProcesso = () => {

    const processos = [{numero : '111.111.111-1111/11', data : '11-11-2020', setor : 'SUBLA', assunto : 'TESTOU', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '333.111.111-1111/11', data : '11/11/1111', setor : 'SUTE', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '2020-02-20', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
    {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'}];

    const [hidden, setHidden] = useState(true)
    const hiddenTabela = () => setHidden(!hidden)

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
    };

    const handlePreviousClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
    }

    const handleNextClick = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
    }

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

    const cleanFilters = () => {
        setLabelSetor('Setor')
        setLabelAssunto('Assunto')
        setNumeroProcesso('')
    }

    const buscarProcessos = () => {
        if (processos.length !== 0) {
            hiddenTabela()
        }
    }

    return (
        <div>
            <Card className="p-3">
                <CardTitle><h3>Editar processos</h3></CardTitle>
                <CardBody>
                <Row className="pb-3 w-75">
                    <InputGroup>
                        <Input className='rounded-left' placeholder='Número do processo' value={numeroProcesso} onChange={changeNumeroProcesso}/>
                        <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={buscarProcessos}>Buscar</Button></InputGroupAddon>
                        <ButtonDropdown className='ml-3' isOpen={dropdownOpenSetor} toggle={toggleSetor}>
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
                        <Button className='ml-3' outline onClick={cleanFilters}>Limpar filtros</Button>
                    </InputGroup>
                </Row>
                </CardBody>
                <TabelaProcesso processos={processos} hidden={hidden}
                pageSize={10}
                pagesCount={Math.round((processos.length / 10) + 0.5)}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}/>
            </Card>
        </div>
    )
}

export default EditarProcesso;
