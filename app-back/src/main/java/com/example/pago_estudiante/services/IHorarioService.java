package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.Horario;

public interface IHorarioService {
    List <Horario> listarhorarios();
    Horario agregarHorario(Horario horario);
    Horario buscarHorarioPorId(Long idHorario);
    void eliminarHorario(Long idHorario);
}
