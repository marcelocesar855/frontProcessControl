import React, {useState} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';

const ModalProcesso = ({
    processo,
    show
}) => {

    const [showModal, setShowModal] = useState(show)
    const toggle = () => setShowModal(!showModal)

    const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [dropdownOpenCaixa, setOpenCaixa] = useState(false)
    const toggleCaixa = () => setOpenCaixa(!dropdownOpenCaixa)

    const [labelSetor, setLabelSetor] = useState(processo.setor)
    const changeSetor = (e) => setLabelSetor(e.target.textContent)
    
    const [labelAssunto, setLabelAssunto] = useState(processo.assunto)
    const changeAssunto = (e) => setLabelAssunto(e.target.textContent)

    const changeNumeroProcesso = (e) => processo.numero = e.target.value

    const [labelCaixa, setLabelCaixa] = useState(processo.caixa)
    const changeCaixa = (e) => setLabelCaixa(e.target.textContent)

    const changeData = (e) => processo.data = e.target.value

    const storeProcesso = () => {
        
    }

    return (
        <Modal isOpen={showModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Editar processo</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="processo">Número do processo</Label>
                        <Input value={processo.numero} id="processo" onChange={changeNumeroProcesso}/>
                        <Label for="data">Data autuação</Label>
                        <Input value={processo.data} id="data" type="date" className='w-75' onChange={changeData}/>
                    </FormGroup>
                    <FormGroup>
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
                        <ButtonDropdown isOpen={dropdownOpenCaixa} toggle={toggleCaixa} className='ml-2'>
                            <DropdownToggle caret>
                                {labelCaixa}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeCaixa}>22</DropdownItem>
                                <DropdownItem>23</DropdownItem>
                                <DropdownItem>24</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown className='ml-2' isOpen={dropdownOpenAssunto} toggle={toggleAssunto}>
                            <DropdownToggle caret>
                                {labelAssunto}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeAssunto}>Teste 1</DropdownItem>
                                <DropdownItem>Teste 2</DropdownItem>
                                <DropdownItem>Teste 3</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                    <Button outline onClick={storeProcesso}>Salvar</Button>
                    <Button className='ml-3' outline onClick={toggle}>Cancelar</Button>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalProcesso;
