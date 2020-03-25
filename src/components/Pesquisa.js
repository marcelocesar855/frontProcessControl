import React, {useState} from 'react';
import Tabela from './Tabela'
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';

const Pesquisa = () => {
    const processos = [
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'},
        {numero : '111.111.111-1111/11', data : '11/11/1111', setor : 'SUBLA', assunto : 'TESTE', caixa : '1', estante : '2', prateleira : '3'}]

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

    return (
        <div>
        <Row className="py-3 w-75">
            <InputGroup>
                <ButtonDropdown isOpen={dropdownOpenSetor} toggle={toggleSetor}>
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
                <Input className='ml-3 rounded-left' placeholder='Número do processo' value={numeroProcesso} onChange={changeNumeroProcesso}/>
                <InputGroupAddon addonType="append"><Button className='rounded-right'>Pesquisar</Button></InputGroupAddon>
                <Button className='ml-3' outline onClick={cleanFilters}>Limpar filtros</Button>
            </InputGroup>
          </Row>
          <Row>
            <Tabela processos={processos}
              pageSize={10}
              pagesCount={Math.round((processos.length / 10) + 0.5)}
              currentPage={currentPage}
              handlePageClick={handlePageClick}
              handlePreviousClick={handlePreviousClick}
              handleNextClick={handleNextClick}
            />
            </Row>
        </div>
    )
}

export default Pesquisa;
