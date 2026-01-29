package com.example.pago_estudiante.dtos;

import com.example.pago_estudiante.entities.Materia;

import lombok.Data;
@Data
public class MateriaDTO {

    private Long idMateria;
    private String nombre;
    private int creditos;
    private String cicloEscolarNombre;

    public MateriaDTO(Materia materia) {
        this.idMateria = materia.getIdMateria();
        this.nombre = materia.getNombreMateria();
        this.creditos = materia.getCreditos();
        if (materia.getCicloEscolar() != null) {
            this.cicloEscolarNombre = materia.getCicloEscolar().getNombre();
        }
    }

}
