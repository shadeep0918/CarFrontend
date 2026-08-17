import { RenderMode, ServerRoute } from '@angular/ssr';
import { Component } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }

];
