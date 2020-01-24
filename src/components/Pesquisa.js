import React, {useState} from 'react';
import { InputGroup, Input, InputGroupAddon, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Pesquisa = (props) => {

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [labelSetor, setLabelSetor] = useState('Setor')
    const changeSetor = (e) => setLabelSetor(e.currentTarget.textContent)

    return (
        <div className='p-3'>
            <InputGroup>
                <Input placeholder='Número do processo'/>
                <InputGroupAddon addonType="append"><Button className='rounded-right'>Pesquisar</Button></InputGroupAddon>
                <ButtonDropdown className='ml-3' isOpen={dropdownOpenSetor} toggle={toggleSetor}>
                    <DropdownToggle caret>
                        {labelSetor}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={changeSetor}>SUBLA</DropdownItem>
                        <DropdownItem>SUBLA</DropdownItem>
                        <DropdownItem>SUBLA</DropdownItem>
                        <DropdownItem>SUBLA</DropdownItem>
                        <DropdownItem>SUBLA</DropdownItem>
                        <DropdownItem>SUBLA</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown className='ml-3' isOpen={dropdownOpenAssunto} toggle={toggleAssunto}>
                    <DropdownToggle caret>
                        Assunto
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Teste 1</DropdownItem>
                        <DropdownItem>Teste 2</DropdownItem>
                        <DropdownItem>Teste 3</DropdownItem>
                        <DropdownItem>Teste 4</DropdownItem>
                        <DropdownItem>Teste 5</DropdownItem>
                        <DropdownItem>Teste 6</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </InputGroup>
        </div>
    )
}

export default Pesquisa;
