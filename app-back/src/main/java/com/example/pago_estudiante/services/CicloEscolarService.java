package com.example.pago_estudiante.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pago_estudiante.entities.CicloEscolar;
import com.example.pago_estudiante.repository.ICicloEscolarRepository;

@Service
public class CicloEscolarService implements ICicloEscolarService{

@Autowired
private ICicloEscolarRepository cicloEscolarRepository;

    @Override
    public List<CicloEscolar> listarCiclosEscolares() {
        return cicloEscolarRepository.findAll();
    }

    @Override
    public CicloEscolar agregarCicloEscolar(CicloEscolar cicloEscolar) {
        return cicloEscolarRepository.save(cicloEscolar);
    }

    @Override
    public CicloEscolar buscarCicloEscolarPorId(Long idCicloEscolar) {
        return cicloEscolarRepository.findById(idCicloEscolar).orElse(null);
    }

    @Override
    public void eliminarCicloEscolar(Long idCicloEscolar) {
        cicloEscolarRepository.deleteById(idCicloEscolar);
    }
    
}
