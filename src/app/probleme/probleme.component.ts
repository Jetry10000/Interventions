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
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  
  constructor(private fb: FormBuilder, private categories: ProblemeService) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom:['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      noTypeProbleme: ['', Validators.required], 
      courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}],
        }),
      telephone: [{value: '', disabled: true}],
      
    });
    this.categories.obtenirCategories()
  .subscribe(tp => this.typesProbleme = tp,
             error => this.errorMessage = <any>error);  

  }
  save(): void {}
  setNotification(typeNotification: string): void{
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const confimation = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const telephone = this.problemeForm.get('telephone');
    courriel.disable();
    confimation.disable();
    telephone.disable();
    telephone.reset();
    if(typeNotification === 'courriel'){
      courriel.enable();
      confimation.enable();
      telephone.disable();
    }
    courriel.updateValueAndValidity(); 
  }
}