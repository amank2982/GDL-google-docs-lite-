import { Component } from '@angular/core';
import { DocumentEditorComponent } from './document-editor/document-editor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentEditorComponent],
  template: `<app-document-editor></app-document-editor>`
})
export class AppComponent {}
