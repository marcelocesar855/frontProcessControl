import React, {useState} from 'react';
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Pesquisa = () => {

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
        <div className='p-3'>
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
        </div>
    )
}

export default Pesquisa;
