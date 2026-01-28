package com.example.pago_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pago_estudiante.entities.CicloEscolar;

public interface ICicloEscolarRepository extends JpaRepository <CicloEscolar, Long>{
    
}
