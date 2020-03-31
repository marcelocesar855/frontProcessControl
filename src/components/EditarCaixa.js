import React, {useState} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaCaixas from './TabelaCaixas'

const EditarCaixa = () => {

    const caixas = [{numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'},{numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'},
    {numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'},{numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'},
    {numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'},{numero : '12', estante : '2', prateleira : '5', setor : 'SUBLA'}];

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

    const [labelSetor, setLabelSetor] = useState('Setor')
    const changeSetor = (e) => setLabelSetor(e.target.textContent)

    const [numero, setNumero] = useState('')
    const changeNumero = (e) => setNumero(e.target.value)
    
    const [estante, setEstante] = useState('')
    const changeEstante = (e) => setEstante(e.target.value)
    
    const [prateleira, setPrateleira] = useState('')
    const changePrateleira = (e) => setPrateleira(e.target.value)

    const cleanFilters = () => {
        setLabelSetor('Setor')
        setNumero('')
        setEstante('')
        setPrateleira('')
    }

    const buscarCaixa = () => {
        if (caixas.length !== 0) {
            hiddenTabela()
        }
    }

    return (
        <div>
            <Card className="p-3 mt-3">
                <CardTitle><h3>Editar caixas</h3></CardTitle>
                <CardBody>
                <Row className="pb-3 w-75">
                    <InputGroup>
                        <Input className='rounded-left' type='number' placeholder='Número da caixa' value={numero} onChange={changeNumero}/>
                        <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={buscarCaixa}>Buscar</Button></InputGroupAddon>
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
                        <Input className='rounded-left ml-3' type='number' placeholder='Estante' value={estante} onChange={changeEstante}/>
                        <Input className='rounded-right' type='number' placeholder='Prateleira' value={prateleira} onChange={changePrateleira}/>
                        <Button className='ml-3' outline onClick={cleanFilters}>Limpar filtros</Button>
                    </InputGroup>
                </Row>
                </CardBody>
                <TabelaCaixas caixas={caixas} hidden={hidden}
                pageSize={10}
                pagesCount={Math.round((caixas.length / 10) + 0.5)}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}/>
            </Card>
        </div>
    )
}

export default EditarCaixa;
