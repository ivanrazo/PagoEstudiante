package com.example.pago_estudiante.dtos;

import java.util.Set;

import lombok.Data;
@Data
public class CicloEscolarDTO {
    
    private Long idCicloEscolar;
    private String nombre;
    private boolean activo;

    private Set<Long> estudiantesIds;
}
