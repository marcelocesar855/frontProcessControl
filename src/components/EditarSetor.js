import React, {useState} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import TabelaSetor from './TabelaSetor'

const EditarSetor = () => {

    const setores = [{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},
    {nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},
    {nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'},{nome : 'Setor de Bla Bla Bla', sigla : 'SUBLA'}];

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

    const [nomeSetor, setNomeSetor] = useState('')
    const changeNomeSetor = (e) => setNomeSetor(e.target.value)

    const cleanFilters = () => {
        setLabelSetor('Setor')
        setNomeSetor('')
    }

    const buscarSetor = () => {
        if (setores.length !== 0) {
            hiddenTabela()
        }
    }

    return (
        <div>
            <Card className="p-3 mt-3">
                <CardTitle><h3>Editar setores</h3></CardTitle>
                <CardBody>
                <Row className="pb-3">
                    <InputGroup>
                        <Input className='rounded-left' placeholder='Nome do setor' value={nomeSetor} onChange={changeNomeSetor}/>
                        <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={buscarSetor}>Buscar</Button></InputGroupAddon>
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
                        <Button className='ml-3' outline onClick={cleanFilters}>Limpar</Button>
                    </InputGroup>
                </Row>
                </CardBody>
                <TabelaSetor setores={setores} hidden={hidden}
                pageSize={10}
                pagesCount={Math.round((setores.length / 10) + 0.5)}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}/>
            </Card>
        </div>
    )
}

export default EditarSetor;
