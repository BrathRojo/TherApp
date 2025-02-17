import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent implements OnInit {
  publicacionForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private snackBar: MatSnackBar
  ) {
    this.publicacionForm = this.fb.group({
      texto: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files).slice(0, 10) as File[]; // Limitar a 10 archivos y asegurar el tipo
    }
  }

  onSubmit(): void {
    if (this.publicacionForm.valid || this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('texto', this.publicacionForm.get('texto')?.value);

      const usuarioId = localStorage.getItem('usuarioId');
      if (usuarioId) {
        formData.append('usuarioId', usuarioId);
      }

      this.selectedFiles.forEach((file) => {
        formData.append('archivos', file);
      });

      this.publicacionService.crearPublicacion(formData).subscribe({
        next: (response) => {
          this.snackBar.open('Publicación creada con éxito', 'Cerrar', { duration: 3000 });
          this.publicacionForm.reset();
          this.selectedFiles = [];
        },
        error: (error) => {
          console.error('Error al crear la publicación:', error);
          this.snackBar.open('Error al crear la publicación', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Debe ingresar texto o adjuntar contenido multimedia', 'Cerrar', { duration: 3000 });
    }
  }
}
