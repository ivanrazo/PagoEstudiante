package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.Estudiante;
import com.example.pago_estudiante.entities.Pago;
import com.example.pago_estudiante.repository.IEstudianteRepository;
import com.example.pago_estudiante.repository.IPagoRepository;

@Service
public class PagoService implements IPagoService {
    @Autowired
    private IPagoRepository pagoRepository;

    @Autowired
    private IEstudianteRepository estudianteRepository;

    @Override
    public List<Pago> listarPagos() {
        return pagoRepository.findAll();
    }

    @Override
    public Pago agregarPago(Long idEstudiante, Pago pago) {

        Estudiante estudiante = estudianteRepository.findById(idEstudiante)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));

        pago.setEstudiante(estudiante);
        return pagoRepository.save(pago);
    }

    @Override
    public Pago buscarPagoPorId(Long idPago) {
        return pagoRepository.findById(idPago).orElse(null);
    }

    @Override
    public void eliminarPago(Long idPago) {
        pagoRepository.deleteById(idPago);
    }

    @Override
    public Pago actualizarPago(Pago pago) {
        return pagoRepository.save(pago);
    }
}
