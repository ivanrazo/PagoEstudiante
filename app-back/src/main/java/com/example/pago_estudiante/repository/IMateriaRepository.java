package com.example.pago_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pago_estudiante.entities.Materia;

public interface IMateriaRepository extends JpaRepository <Materia, Long>{
}
