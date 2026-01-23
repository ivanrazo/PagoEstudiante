package com.example.pago_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pago_estudiante.entities.Docente;

public interface IDocenteRepository extends JpaRepository <Docente, Long>{}

