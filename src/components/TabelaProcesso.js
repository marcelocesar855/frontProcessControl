import React, {useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import PropTypes from "prop-types";
import Paginacao from './Paginacao';

const TabelaProcesso = ({
  processos,
  hidden,
  currentPage,
  pageSize,
  pagesCount,
  handlePageClick,
  handlePreviousClick,
  handleNextClick
}) => {
  const [selected, setSelected] = useState({})

  const [showModal, setShowModal] = useState()
  const toggle = () => setShowModal(!showModal)

  const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [dropdownOpenCaixa, setOpenCaixa] = useState(false)
    const toggleCaixa = () => setOpenCaixa(!dropdownOpenCaixa)

    const [labelSetor, setLabelSetor] = useState(selected.setor)
    const changeSetor = (e) => setLabelSetor(e.target.textContent)
    
    const [labelAssunto, setLabelAssunto] = useState(selected.assunto)
    const changeAssunto = (e) => setLabelAssunto(e.target.textContent)

    const changeNumeroProcesso = (e) => selected.numero = e.target.value

    const [labelCaixa, setLabelCaixa] = useState(selected.caixa)
    const changeCaixa = (e) => setLabelCaixa(e.target.textContent)

    const changeData = (e) => selected.data = e.target.value

    const storeProcesso = () => {
        
    }

    return (
      <div>
        <Table striped bordered dark hover hidden={hidden}>
            <thead>
                <tr>
                  <th>Número</th>
                  <th>Data Autuação</th>
                  <th>Setor</th>
                  <th>Assunto</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {processos
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map(processo => {
                return (
                  <tr>
                    <td>{processo.numero}</td>
                    <td>{processo.data}</td>
                    <td>{processo.setor}</td>
                    <td>{processo.assunto}</td>
                    <td>
                      <Button onClick={(processo) => {setSelected(processo); toggle()}}>Editar</Button>
                      <Button className='ml-3'>Excluir</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </Table>
        <Paginacao hidden={hidden}
          pagesCount={pagesCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
          handlePreviousClick={handlePreviousClick}
          handleNextClick={handleNextClick}
        />
        <Modal isOpen={showModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Editar processo</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="processo">Número do processo</Label>
                        <Input value={selected.numero} id="processo" onChange={changeNumeroProcesso}/>
                        <Label for="data">Data autuação</Label>
                        <Input value={selected.data} id="data" type="date" className='w-75' onChange={changeData}/>
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
      </div>
  )
}

TabelaProcesso.propTypes = {
  registrations: PropTypes.array.isRequired,
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TabelaProcesso;
