package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.Docente;

public interface IDocenteService {
    public List <Docente> listarDocentes();
    public Docente agregarDocente(Docente docente);
    public Docente buscarDocentePorId(Long idDocente);
    public void eliminarDocente(Long idDocente);
}
