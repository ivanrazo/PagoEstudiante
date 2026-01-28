package com.example.pago_estudiante.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idHorario;

    private String dia;          
    private String horaInicio;   
    private String horaFin;      
    private String aula;

    @ManyToOne
    @JoinColumn(name = "materia_id")
    private Materia materia;
}