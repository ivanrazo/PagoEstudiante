package com.example.pago_estudiante.dtos;

import lombok.Data;

@Data
public class HorarioDTO {
    private Long idHorario;
    private String dia;
    private String horaInicio;
    private String horaFin;
    private String aula;
}
