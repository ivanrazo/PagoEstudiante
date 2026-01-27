package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Docente;
import com.example.pago_estudiante.entities.Materia;
import com.example.pago_estudiante.repository.IDocenteRepository;
import com.example.pago_estudiante.repository.IMateriaRepository;

@Service
public class DocenteService implements IDocenteService {

    @Autowired
    private IDocenteRepository docenteRepository;

    @Autowired
    private IMateriaRepository materiaRepository;

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

    @Override
    public Docente asignarMateria(Long idDocente, Long idMateria) {
        Docente docente = docenteRepository.findById(idDocente)
                .orElseThrow(() -> new RuntimeException("Docente no encontrado"));
        Materia materia = materiaRepository.findById(idMateria)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        // Añadir la materia a la lista si no está
        if (!docente.getMaterias().contains(materia)) {
            docente.getMaterias().add(materia);
        }

        // Añadir el docente a la materia para mantener bidireccionalidad
        if (!materia.getDocentes().contains(docente)) {
            materia.getDocentes().add(docente);
        }

        return docenteRepository.save(docente);
    }
}
