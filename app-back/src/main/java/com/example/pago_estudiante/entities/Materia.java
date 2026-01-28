package com.example.pago_estudiante.entities;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ciclo_id")
    private CicloEscolar cicloEscolar;

    @ManyToMany(mappedBy = "materias")
    @JsonIgnore
    private Set<Estudiante> estudiantes;

    @ManyToMany(mappedBy = "materias")
    @JsonIgnore
    private Set<Docente> docentes;

    @OneToMany(mappedBy = "materia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Horario> horarios;
}
