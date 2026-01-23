package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.Pago;

public interface IPagoService {
    public List<Pago> listarPagos();

    public Pago agregarPago(Long idEstudiante, Pago pago);

    public Pago buscarPagoPorId(Long idPago);

    public void eliminarPago(Long idPago);

    Pago actualizarPago(Pago pago);

}
