import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './probleme';
import { ProblemeService } from './probleme.service';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProduits: ITypeProbleme[];
  errorMessage: string;
  
  constructor(private fb: FormBuilder, private categories: ProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      noProbleme:['']
    });
    this.categories.obtenirCategories()
  .subscribe(cat => this.categoriesProduits = cat,
             error => this.errorMessage = <any>error);  

  }
  save(): void {}
  
}