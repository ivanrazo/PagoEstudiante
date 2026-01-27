package com.example.pago_estudiante.web;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.pago_estudiante.entities.Docente;
import com.example.pago_estudiante.entities.Estudiante;
import com.example.pago_estudiante.entities.Materia;
import com.example.pago_estudiante.entities.Pago;
import com.example.pago_estudiante.services.IDocenteService;
import com.example.pago_estudiante.services.IEstudianteService;
import com.example.pago_estudiante.services.IMateriaService;
import com.example.pago_estudiante.services.IPagoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private IPagoService pagoService;
    @Autowired
    private IEstudianteService estudianteService;
    @Autowired
    private IDocenteService docenteService;
    @Autowired
    private IMateriaService materiaService;

    @GetMapping("/estudiantes")
    public List<Estudiante> listarEstudiantes() {
        return estudianteService.listarEstudiantes();
    }

    @PostMapping("/estudiantes")
    public ResponseEntity<Estudiante> agregarEstudiante(
            @RequestParam String nombre,
            @RequestParam String apellidoPaterno,
            @RequestParam String apellidoMaterno,
            @RequestParam String programaId,
            @RequestParam String domicilio,
            @RequestParam Date horario,
            @RequestParam(required = false) MultipartFile foto) throws IOException {

        Estudiante estudiante = new Estudiante();
        estudiante.setNombre(nombre);
        estudiante.setApellidoPaterno(apellidoPaterno);
        estudiante.setApellidoMaterno(apellidoMaterno);
        estudiante.setProgramaId(programaId);
        estudiante.setDomicilio(domicilio);

        if (foto != null && !foto.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
            Path path = Paths.get("uploads/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, foto.getBytes());
            estudiante.setFoto(filename);
        }

        Estudiante nuevo = estudianteService.agregarEstudiante(estudiante);
        return ResponseEntity.status(201).body(nuevo);
    }

    @GetMapping("/estudiantes/{idEstudiante}")
    public ResponseEntity<Estudiante> obtenerEstudiante(
            @PathVariable Long idEstudiante) {

        Estudiante estudiante = estudianteService.buscarEstudiantePorId(idEstudiante);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante);
    }

    @PutMapping("/estudiantes/{idEstudiante}")
    public ResponseEntity<Estudiante> editarEstudiante(
            @PathVariable Long idEstudiante,
            @RequestParam String nombre,
            @RequestParam String apellidoPaterno,
            @RequestParam String apellidoMaterno,
            @RequestParam String programaId,
            @RequestParam String domicilio,
            @RequestParam(required = false) MultipartFile foto) throws IOException {

        Estudiante estudianteExistente = estudianteService.buscarEstudiantePorId(idEstudiante);
        if (estudianteExistente == null) {
            return ResponseEntity.notFound().build();
        }
        estudianteExistente.setNombre(nombre);
        estudianteExistente.setApellidoPaterno(apellidoPaterno);
        estudianteExistente.setApellidoMaterno(apellidoMaterno);
        estudianteExistente.setProgramaId(programaId);
        estudianteExistente.setDomicilio(domicilio);

        if (foto != null && !foto.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
            Path path = Paths.get("/uploads/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, foto.getBytes());
            estudianteExistente.setFoto("/uploads/" + filename);
        }
        Estudiante estudianteModificado = estudianteService.agregarEstudiante(estudianteExistente);
        return ResponseEntity.ok(estudianteModificado);
    }

    @PostMapping("/estudiantes/{idEstudiante}/materias/{idMateria}")
    public ResponseEntity<Estudiante> asignarMateriaAEstudiante(
            @PathVariable Long idEstudiante,
            @PathVariable Long idMateria) {

        Estudiante estudiante = estudianteService.asignarMateria(idEstudiante, idMateria);
        return ResponseEntity.ok(estudiante);
    }

    @DeleteMapping("/estudiantes/{idEstudiante}")
    public ResponseEntity<?> eliminarEstudiante(@PathVariable Long idEstudiante) {
        Estudiante estudiante = estudianteService.buscarEstudiantePorId(idEstudiante);
        if (estudiante == null) {
            return ResponseEntity.badRequest().body("El estudiante no existe");
        }
        estudianteService.eliminarEstudiante(idEstudiante);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/pagos/{idPago}")
    public ResponseEntity<Pago> getPagoById(@PathVariable Long idPago) {
        Pago pago = pagoService.buscarPagoPorId(idPago);
        if (pago == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(pago);
    }

    @GetMapping("/estudiantes/{idEstudiante}/pagos")
    public ResponseEntity<List<Pago>> listarPagosPorEstudiante(@PathVariable Long idEstudiante) {
        Estudiante estudiante = estudianteService.buscarEstudiantePorId(idEstudiante);
        if (estudiante == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(estudiante.getPagos());
    }

    @GetMapping("/pagos")
    public List<Pago> listarPagos() {
        return pagoService.listarPagos();
    }

    @PostMapping("/estudiantes/{idEstudiante}/pagos")
    public ResponseEntity<Pago> agregarPago(
            @PathVariable Long idEstudiante,
            @RequestBody Pago pago) {

        if (pago.getIdPago() != null) {
            return ResponseEntity.badRequest().build();
        }

        Pago nuevoPago = pagoService.agregarPago(idEstudiante, pago);
        return ResponseEntity.status(201).body(nuevoPago);
    }

    @PutMapping("/pagos/{idPago}")
    public ResponseEntity<Pago> editarPago(
            @PathVariable Long idPago,
            @RequestBody Pago pagoActualizado) {

        Pago pagoExistente = pagoService.buscarPagoPorId(idPago);
        if (pagoExistente == null) {
            return ResponseEntity.notFound().build();
        }

        pagoExistente.setFecha(pagoActualizado.getFecha());
        pagoExistente.setCantidad(pagoActualizado.getCantidad());
        pagoExistente.setType(pagoActualizado.getType());
        pagoExistente.setStatus(pagoActualizado.getStatus());

        if (pagoActualizado.getEstudiante() != null && pagoActualizado.getEstudiante().getIdEstudiante() != null) {
            Estudiante nuevoEstudiante = estudianteService.buscarEstudiantePorId(
                    pagoActualizado.getEstudiante().getIdEstudiante());
            if (nuevoEstudiante != null) {
                pagoExistente.setEstudiante(nuevoEstudiante);
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        }
        Pago pagoModificado = pagoService.actualizarPago(pagoExistente);

        return ResponseEntity.ok(pagoModificado);
    }

    @DeleteMapping("/pagos/{idPago}")
    public ResponseEntity<?> eliminarPago(@PathVariable Long idPago) {
        if (pagoService.buscarPagoPorId(idPago) == null) {
            return ResponseEntity.badRequest().body("El pago no existe");
        }
        pagoService.eliminarPago(idPago);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path uploadDir = Paths.get("uploads").toAbsolutePath(); // ruta absoluta
            Path file = uploadDir.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                return ResponseEntity.notFound().build();
            }

            String contentType = "application/octet-stream"; // fallback
            try {
                contentType = Files.probeContentType(file);
            } catch (IOException e) {
                e.printStackTrace();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, contentType)
                    .body(resource);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/docentes")
    public List<Docente> listarDocentes() {
        return docenteService.listarDocentes();
    }

    @PostMapping("/docentes")
    public ResponseEntity<Docente> agregarDocente(
            @RequestParam String nombreDocente,
            @RequestParam String apellidoPaterno,
            @RequestParam String apellidoMaterno,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile foto) throws IOException {

        Docente docente = new Docente();
        docente.setNombreDocente(nombreDocente);
        docente.setApellidoPaterno(apellidoPaterno);
        docente.setApellidoMaterno(apellidoMaterno);
        docente.setEmail(email);

        if (foto != null && !foto.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
            Path path = Paths.get("uploads/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, foto.getBytes());
            docente.setFoto(filename);
        }

        Docente nuevo = docenteService.agregarDocente(docente);
        return ResponseEntity.status(201).body(nuevo);
    }

    @GetMapping("/docentes/{idDocente}")
    public ResponseEntity<Docente> obtenerDocente(
            @PathVariable Long idDocente) {

        Docente docente = docenteService.buscarDocentePorId(idDocente);
        if (docente == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(docente);
    }

    @PutMapping("/docentes/{idDocente}")
    public ResponseEntity<Docente> editarDocente(
            @PathVariable Long idDocente,
            @RequestParam String nombreDocente,
            @RequestParam String apellidoPaterno,
            @RequestParam String apellidoMaterno,
            @RequestParam String email,
            @RequestParam(required = false) MultipartFile foto) throws IOException {

        Docente docenteExistente = docenteService.buscarDocentePorId(idDocente);
        if (docenteExistente == null) {
            return ResponseEntity.notFound().build();
        }
        docenteExistente.setNombreDocente(nombreDocente);
        docenteExistente.setApellidoPaterno(apellidoPaterno);
        docenteExistente.setApellidoMaterno(apellidoMaterno);
        docenteExistente.setEmail(email);

        if (foto != null && !foto.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
            Path path = Paths.get("uploads/" + filename);
            Files.createDirectories(path.getParent());
            Files.write(path, foto.getBytes());
            docenteExistente.setFoto("/uploads/" + filename);
        }
        Docente docenteModificado = docenteService.agregarDocente(docenteExistente);
        return ResponseEntity.ok(docenteModificado);
    }

    @PostMapping("/docentes/{idDocente}/materias/{idMateria}")
    public ResponseEntity<Docente> asignarMateriaADocente(
            @PathVariable Long idDocente,
            @PathVariable Long idMateria) {

        Docente docente = docenteService.asignarMateria(idDocente, idMateria);
        return ResponseEntity.ok(docente);
    }

    @DeleteMapping("/docentes/{idDocente}")
    public ResponseEntity<?> eliminarDocente(@PathVariable Long idDocente) {
        Docente docente = docenteService.buscarDocentePorId(idDocente);
        if (docente == null) {
            return ResponseEntity.badRequest().body("El docente no existe");
        }
        docenteService.eliminarDocente(idDocente);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/materias")
    public List<Materia> listarMaterias() {
        return materiaService.listarMaterias();
    }

    @PostMapping("/materias")
    public ResponseEntity<Materia> agregarMateria(
            @RequestParam String nombreMateria,
            @RequestParam Integer creditos) {

        Materia materia = new Materia();
        materia.setNombreMateria(nombreMateria);
        materia.setCreditos(creditos);

        Materia materiaNueva = materiaService.agregarMateria(materia);
        return ResponseEntity.status(201).body(materiaNueva);
    }

    @PutMapping("/materias/{idMateria}")
    public ResponseEntity<Materia> editarMateria(
            @PathVariable Long idMateria,
            @RequestParam String nombreMateria,
            @RequestParam Integer creditos) {
        Materia materiaExistente = materiaService.buscarMateriaPorId(idMateria);
        if (materiaExistente == null) {
            return ResponseEntity.notFound().build();
        }
        materiaExistente.setNombreMateria(nombreMateria);
        materiaExistente.setCreditos(creditos);

        Materia materiaModificada = materiaService.agregarMateria(materiaExistente);
        return ResponseEntity.ok(materiaModificada);
    }

    @DeleteMapping("/materias/{idMateria}")
    public ResponseEntity<?> eliminarMateria(@PathVariable Long idMateria) {
        if (materiaService.buscarMateriaPorId(idMateria) == null) {
            return ResponseEntity.badRequest().body("La materia no existe");
        }
        materiaService.eliminarMateria(idMateria);
        return ResponseEntity.noContent().build();
    }

}
