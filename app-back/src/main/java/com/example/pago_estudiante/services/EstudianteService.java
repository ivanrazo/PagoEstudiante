package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Estudiante;
import com.example.pago_estudiante.entities.Materia;
import com.example.pago_estudiante.repository.IEstudianteRepository;
import com.example.pago_estudiante.repository.IMateriaRepository;

@Service
public class EstudianteService implements IEstudianteService {

    @Autowired
    private IEstudianteRepository estudianteRepository;

    @Autowired
    private IMateriaRepository materiaRepository;

    @Override
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    @Override
    public Estudiante agregarEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    @Override
    public Estudiante buscarEstudiantePorId(Long idEstudiante) {
        return estudianteRepository.findById(idEstudiante).orElse(null);
    }

    @Override
    public void eliminarEstudiante(Long idEstudiante) {
        estudianteRepository.deleteById(idEstudiante);
    }

    @Override
    public Estudiante asignarMateria(Long idEstudiante, Long idMateria) {
        Estudiante estudiante = estudianteRepository.findById(idEstudiante)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
        Materia materia = materiaRepository.findById(idMateria)
                .orElseThrow(() -> new RuntimeException("Materia no encontrada"));

        // Añadir materia si no existe
        if (!estudiante.getMaterias().contains(materia)) {
            estudiante.getMaterias().add(materia);
        }

        // Añadir estudiante a la materia para mantener bidireccionalidad
        if (!materia.getEstudiantes().contains(estudiante)) {
            materia.getEstudiantes().add(estudiante);
        }

        return estudianteRepository.save(estudiante);
    }

}
