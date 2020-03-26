import React, {useState} from 'react';
import { Card, CardBody, CardTitle, InputGroup, Input, InputGroupAddon, Button, Row } from 'reactstrap';
import TabelaAssunto from './TabelaAssunto'

const EditarAssunto = () => {

    const assuntos = [{descricao : 'Obra de bla bla bla'},{descricao : 'Obra de bla bla bla'},{descricao : 'Obra de bla bla bla'},
    {descricao : 'Obra de bla bla bla'},{descricao : 'Obra de bla bla bla'},{descricao : 'Obra de bla bla bla'}];

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

    const [descricao, setDescricao] = useState('')
    const changeDescricao = (e) => setDescricao(e.target.value)

    const cleanFilters = () => {
        setDescricao('')
    }

    const buscarAssunto = () => {
        if (assuntos.length !== 0) {
            hiddenTabela()
        }
    }

    return (
        <div>
            <Card className="p-3 mt-3">
                <CardTitle><h3>Editar assuntos</h3></CardTitle>
                <CardBody>
                <Row className="pb-3">
                    <InputGroup>
                        <Input className='rounded-left' placeholder='Assunto ' value={descricao} onChange={changeDescricao}/>
                        <InputGroupAddon addonType="append"><Button className='rounded-right' onClick={buscarAssunto}>Buscar</Button></InputGroupAddon>
                        <Button className='ml-3' outline onClick={cleanFilters}>Limpar</Button>
                    </InputGroup>
                </Row>
                </CardBody>
                <TabelaAssunto assuntos={assuntos} hidden={hidden}
                pageSize={10}
                pagesCount={Math.round((assuntos.length / 10) + 0.5)}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                handlePreviousClick={handlePreviousClick}
                handleNextClick={handleNextClick}/>
            </Card>
        </div>
    )
}

export default EditarAssunto;
