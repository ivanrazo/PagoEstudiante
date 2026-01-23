package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Docente;
import com.example.pago_estudiante.repository.IDocenteRepository;

@Service
public class DocenteService implements IDocenteService {

    @Autowired
    private IDocenteRepository docenteRepository;

    @Override
    public List<Docente> listarDocentes() {
        return docenteRepository.findAll();
    }

    @Override
    public Docente agregarDocente(Docente docente) {
        return docenteRepository.save(docente);
    }

    @Override
    public Docente buscarDocentePorId(Long idDocente) {
        return docenteRepository.findById(idDocente).orElse(null);
    }

    @Override
    public void eliminarDocente(Long idDocente) {
        docenteRepository.deleteById(idDocente);
    }
}
