package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Estudiante;
import com.example.pago_estudiante.repository.IEstudianteRepository;

@Service
public class EstudianteService implements IEstudianteService {

    @Autowired
    private IEstudianteRepository estudianteRepository;

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

}
