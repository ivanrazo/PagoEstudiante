package com.example.pago_estudiante.dtos;

import java.time.LocalDate;

import com.example.pago_estudiante.entities.Pago;

import lombok.Data;

@Data
public class PagoDTO {
    private Long idPago;
    private LocalDate fecha;
    private double cantidad;
    private String type;
    private String status;
    private Long estudianteId;
    private String nombreEstudiante;
    private String apellidoPaterno;
    private String apellidoMaterno;

    public PagoDTO(Pago pago) {
        this.idPago = pago.getIdPago();
        this.fecha = pago.getFecha();
        this.cantidad = pago.getCantidad();
        this.type = pago.getType().name();
        this.status = pago.getStatus().name();

        if (pago.getEstudiante() != null) {
            this.estudianteId = pago.getEstudiante().getIdEstudiante();
            this.nombreEstudiante = pago.getEstudiante().getNombre();
            this.apellidoPaterno = pago.getEstudiante().getApellidoPaterno();
            this.apellidoMaterno = pago.getEstudiante().getApellidoMaterno();
        }
    }

    public String getNombreCompleto() {
        return nombreEstudiante + " " + apellidoPaterno + " " + apellidoMaterno;
    }
}
