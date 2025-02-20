import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicacionService } from '../../services/publicacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent implements OnInit {
  publicacionForm: FormGroup;
  selectedFiles: File[] = [];
  filePreviews: { url: string, type: string }[] = [];
  maxFiles: number = 10;

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
    const files = Array.from(event.target.files) as File[];
    if (files.length + this.selectedFiles.length > this.maxFiles) {
      this.snackBar.open(`No puedes seleccionar más de ${this.maxFiles} archivos`, 'Cerrar', { duration: 3000 });
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviews.push({ url: e.target.result, type: file.type });
      };
      reader.readAsDataURL(file);
    });

    this.selectedFiles = this.selectedFiles.concat(files).slice(0, this.maxFiles);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filePreviews.splice(index, 1);
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
          this.filePreviews = [];

          // Mostrar el modal de éxito
          const successModal = new bootstrap.Modal(document.getElementById('successModal')!);
          successModal.show();

          // Recargar la página al cerrar el modal
          document.getElementById('successModal')!.addEventListener('hidden.bs.modal', () => {
            window.location.reload();
          });
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
