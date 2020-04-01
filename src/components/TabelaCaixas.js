import React, {useState} from 'react';
import {Col, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Form, FormGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Label, Button } from 'reactstrap';
import PropTypes from "prop-types";
import Paginacao from './Paginacao';

const TabelaCaixas = ({
  caixas,
  hidden,
  currentPage,
  pageSize,
  pagesCount,
  handlePageClick,
  handlePreviousClick,
  handleNextClick
}) => {
  const [selected, setSelected] = useState({numero : '', estante : '', prateleira : '', setor : ''})

  const [showModalEdit, setShowModalEdit] = useState()
  const toggleEdit = () => setShowModalEdit(!showModalEdit)

  const [showModalDel, setShowModalDel] = useState()
  const toggleDel = () => setShowModalDel(!showModalDel)

  const [dropdownOpenSetor, setOpenSetor] = useState(false)
  const toggleSetor = () => setOpenSetor(!dropdownOpenSetor)

  const changeSetor = (e) => setSelected({...selected, setor : e.target.textContent})
  
  const changeNumero = (e) => setSelected({...selected, numero : e.target.value})

  const changeEstante = (e) => setSelected({...selected, estante : e.target.value})

  const changePrateleira = (e) => setSelected({...selected, prateleira : e.target.value})

  const updateCaixa = () => {
      
  }

  const deleteCaixa = () => {
      
  }

    return (
      <div>
        <Table striped bordered dark hover hidden={hidden}>
            <thead>
                <tr>
                  <th>Número</th>
                  <th>Setor</th>
                  <th>Estante</th>
                  <th>Prateleira</th>
                  <th>Ação</th>
                </tr>
            </thead>
            <tbody>
            {caixas
              .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
              .map(caixa => {
                return (
                  <React.Fragment key={caixa.id}>
                    <tr>
                      <td>{caixa.numero}</td>
                      <td>{caixa.setor}</td>
                      <td>{caixa.estante}</td>
                      <td>{caixa.prateleira}</td>
                      <td>
                        <Button onClick={() => {setSelected(caixa); toggleEdit()}}>Editar</Button>
                        <Button className='ml-3' onClick={() => {setSelected(caixa); toggleDel()}}>Excluir</Button>
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
            <ModalHeader toggle={toggleEdit}>Editar caixa</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Row form>
                        <Col>
                            <Label for="numero">Número da caixa</Label>
                            <Input value={selected.numero} id="numero" className='w-50' onChange={changeNumero}/>
                        </Col>
                        <Col>
                            <Label for="estante">Estante</Label>
                            <Input value={selected.estante} id="estante" className='w-50' onChange={changeEstante}/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <Label for="prateleira">Prateleira</Label>
                            <Input value={selected.prateleira} id="prateleira" className='w-50' onChange={changePrateleira}/>
                        </Col>
                        <Col>
                            <ButtonDropdown isOpen={dropdownOpenSetor} toggle={toggleSetor}  className="pt-4">
                                <DropdownToggle caret>
                                    {selected.setor}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={changeSetor}>SUBLA</DropdownItem>
                                    <DropdownItem>SUBLA</DropdownItem>
                                    <DropdownItem>SUBLA</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {updateCaixa(); toggleEdit()}}>Salvar</Button>
                <Button className='ml-3' color="secondary" onClick={toggleEdit}>Cancelar</Button>
            </ModalFooter>
        </Modal>
        <Modal isOpen={showModalDel} toggle={toggleDel}>
            <ModalHeader toggle={toggleDel}>Excluir caixa</ModalHeader>
            <ModalBody>
            <p className=" text-center">Você tem certeza que deseja excluir a caixa<br/>nº <span className='font-weight-bold'>{selected.numero}</span>
            , pertencente ao setor <span className='font-weight-bold'>{selected.setor}</span>?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {deleteCaixa(); toggleDel()}}>Sim, exclua</Button>
                <Button className='ml-3' color="secondary" onClick={toggleDel}>Cancelar</Button>
            </ModalFooter>
        </Modal>
      </div>
  )
}

TabelaCaixas.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default TabelaCaixas;
