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
  const [selected, setSelected] = useState({numero : '', data : '', setor : '', assunto : '', caixa : ''})

  const [showModalEdit, setShowModalEdit] = useState()
  const toggleEdit = () => setShowModalEdit(!showModalEdit)

  const [showModalDel, setShowModalDel] = useState()
  const toggleDel = () => setShowModalDel(!showModalDel)

  const [dropdownOpenSetor, setOpenSetor] = useState(false)
    const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)
    
    const [dropdownOpenAssunto, setOpenAssunto] = useState(false)
    const toggleAssunto = () => setOpenAssunto(!dropdownOpenAssunto)

    const [dropdownOpenCaixa, setOpenCaixa] = useState(false)
    const toggleCaixa = () => setOpenCaixa(!dropdownOpenCaixa)

    const changeSetor = (e) => setSelected({...selected, setor : e.target.textContent})
    
    const changeAssunto = (e) => setSelected({...selected, assunto : e.target.textContent})

    const changeNumeroProcesso = (e) => setSelected({...selected, numero : e.target.value})

    const changeCaixa = (e) => setSelected({...selected, caixa : e.target.textContent})

    const changeData = (e) => setSelected({...selected, data : e.target.value})

    const updateProcesso = () => {
        
    }

    const deleteProcesso = () => {
        
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
                  <React.Fragment key={processo.key}>
                    <tr>
                      <td>{processo.numero}</td>
                      <td>{processo.data}</td>
                      <td>{processo.setor}</td>
                      <td>{processo.assunto}</td>
                      <td>
                        <Button onClick={() => {setSelected(processo); toggleEdit()}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {setSelected(processo); toggleDel()}}>Excluir</Button>
                      </td>
                    </tr>
                  </React.Fragment>
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
        <Modal isOpen={showModalEdit} toggle={toggleEdit}>
            <ModalHeader toggle={toggleEdit}>Editar processo</ModalHeader>
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
                                {selected.setor}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeSetor}>SUBLA</DropdownItem>
                                <DropdownItem>SUBLA</DropdownItem>
                                <DropdownItem>SUBLA</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown isOpen={dropdownOpenCaixa} toggle={toggleCaixa} className='ml-2'>
                            <DropdownToggle caret>
                                {selected.caixa}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeCaixa}>22</DropdownItem>
                                <DropdownItem>23</DropdownItem>
                                <DropdownItem>24</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                        <ButtonDropdown className='ml-2' isOpen={dropdownOpenAssunto} toggle={toggleAssunto}>
                            <DropdownToggle caret>
                                {selected.assunto}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={changeAssunto}>Teste 1</DropdownItem>
                                <DropdownItem>Teste 2</DropdownItem>
                                <DropdownItem>Teste 3</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {updateProcesso(); toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={showModalDel} toggle={toggleDel}>
            <ModalHeader toggle={toggleDel}>Excluir processo</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir o processo<br/>nº <span className='font-weight-bold'>{selected.numero}</span>,
            autuado em <span className='font-weight-bold'>{selected.data}</span><br/>pertencente ao setor <span className='font-weight-bold'>{selected.setor}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {deleteProcesso(); toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
  )
}

TabelaProcesso.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TabelaProcesso;
