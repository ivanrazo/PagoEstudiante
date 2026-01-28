package com.example.pago_estudiante.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class CicloEscolar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCicloEscolar;

    private String nombre;

    private boolean activo;

    @ManyToMany
    @JoinTable(name = "ciclo_escolar_estudiante", joinColumns = @JoinColumn(name = "ciclo_id"), inverseJoinColumns = @JoinColumn(name = "estudiante_id"))
    @JsonIgnore
    private Set<Estudiante> estudiantes;
}
