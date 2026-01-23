package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Materia;
import com.example.pago_estudiante.repository.IMateriaRepository;

@Service

public class MateriaService implements IMateriaService{

    @Autowired
    private IMateriaRepository materiaRepository;

    @Override
    public List<Materia> listarMaterias() {
        return materiaRepository.findAll();
    }

    @Override
    public Materia agregarMateria(Materia materia) {
        return materiaRepository.save(materia);
    }

    @Override
    public Materia buscarMateriaPorId(Long idMateria) {
        return materiaRepository.findById(idMateria).orElse(null);
    }

    @Override
    public void eliminarMateria(Long idMateria) {
        materiaRepository.deleteById(idMateria);
    } 
}
