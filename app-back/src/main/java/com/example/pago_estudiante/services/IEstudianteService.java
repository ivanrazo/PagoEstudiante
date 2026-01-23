package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.Estudiante;

public interface IEstudianteService {
    public List<Estudiante> listarEstudiantes();

    public Estudiante agregarEstudiante(Estudiante estudiante);

    public Estudiante buscarEstudiantePorId(Long idEstudiante);

    public void eliminarEstudiante(Long idEstudiante);
}
