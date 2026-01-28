package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.pago_estudiante.entities.Horario;
import com.example.pago_estudiante.repository.IHorarioRepository;

public class HorarioService implements IHorarioService {

    @Autowired
    private IHorarioRepository horarioRepository;

    @Override
    public List<Horario> listarhorarios() {
       return horarioRepository.findAll();
    }

    @Override
    public Horario agregarHorario(Horario horario) {
        return horarioRepository.save(horario);
    }

    @Override
    public Horario buscarHorarioPorId(Long idHorario) {
        return horarioRepository.findById(idHorario).orElse(null);
    }

    @Override
    public void eliminarHorario(Long idHorario) {
        horarioRepository.deleteById(idHorario);
    }

}
