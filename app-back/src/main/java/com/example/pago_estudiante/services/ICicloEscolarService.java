package com.example.pago_estudiante.services;

import java.util.List;

import com.example.pago_estudiante.entities.CicloEscolar;

public interface ICicloEscolarService {
    List<CicloEscolar> listarCiclosEscolares();
    CicloEscolar agregarCicloEscolar(CicloEscolar cicloEscolar);
    CicloEscolar buscarCicloEscolarPorId(Long idCicloEscolar);
    void eliminarCicloEscolar(Long idCicloEscolar);
}
