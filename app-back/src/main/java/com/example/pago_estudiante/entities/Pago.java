package com.example.pago_estudiante.entities;

import java.time.LocalDate;
import com.example.pago_estudiante.enums.PagoStatus;
import com.example.pago_estudiante.enums.TypePago;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPago;

    private LocalDate fecha;

    private double cantidad;

    @Enumerated(EnumType.STRING)
    private TypePago type;

    @Enumerated(EnumType.STRING)
    private PagoStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "estudiante_id")
    @JsonIgnoreProperties({ "pagos", "materias" })
    private Estudiante estudiante;
}
