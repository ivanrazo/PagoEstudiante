package com.example.pago_estudiante.dtos;

import java.util.Set;

import lombok.Data;
@Data
public class DocenteDTO {
    private Long idDocente;
    private String nombreDocente;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String email;
    private String foto;

    private Set<Long> materiasIds;
}
