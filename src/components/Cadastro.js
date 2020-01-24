import React, {useState} from 'react';
import { Form } from 'reactstrap';

const Cadastro = () => {

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
        </div>
    )
}

export default Cadastro;
