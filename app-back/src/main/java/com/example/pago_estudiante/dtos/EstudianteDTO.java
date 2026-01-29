package com.example.pago_estudiante.dtos;

import java.util.Set;

import lombok.Data;
@Data
public class EstudianteDTO {
    private Long idEstudiante;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String programaId;
    private String domicilio;
    private String foto;

    private Set<Long> materiasIds;
    private Set<Long> ciclosIds;
}
