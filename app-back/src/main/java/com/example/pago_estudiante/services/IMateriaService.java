package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.Materia;

public interface IMateriaService {
    public List <Materia> listarMaterias();
    public Materia agregarMateria(Materia materia);
    public Materia buscarMateriaPorId(Long idMateria);
    public void eliminarMateria(Long idMateria);
}
