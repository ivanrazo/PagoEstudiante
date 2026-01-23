package com.example.pago_estudiante.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pago_estudiante.entities.Pago;

public interface IPagoRepository extends JpaRepository <Pago, Long>{

}
