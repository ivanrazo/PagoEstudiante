package com.example.pago_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pago_estudiante.entities.Estudiante;

public interface IEstudianteRepository extends JpaRepository <Estudiante, Long>{
    
}
