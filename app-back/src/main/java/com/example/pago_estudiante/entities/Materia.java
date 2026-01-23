package com.example.pago_estudiante.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMateria;

    private String nombreMateria;
    private Integer creditos;

    @ManyToMany(mappedBy = "materias")
    private List<Estudiante> estudiantes;

    @ManyToMany(mappedBy = "materias")
    private List<Docente> docentes;
}
